const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/allModels");
const { sendEmail } = require("../helpers/sendingEmails");
const { generateOTP } = require("../helpers/otpHelper");
const { sendSms } = require("../helpers/sendingOtpPhone");

const SECRET_KEY = process.env.SECRET_KEY;
var mainOtp;

const createUser = async (req, res) => {
  try {
    const { username, email, password, profileImage, phoneNumber } = req.body;

    const user = await UserModel.findOne({ where: { email } });
    if (user) {
      return res.status(401).json({ error: "Already Registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP(); // Generate OTP
    mainOtp=otp;

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      profileImage,
    });

    // Send OTP through email
    const emailData = {
      email: newUser.email,
      subject: "Welcome to Blogify - Registration OTP",
      body: `
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <h2>Welcome to Blogify!</h2>
            <p>Thank you for registering with Blogify. Please use the following OTP to complete your registration:</p>
            <h3>${otp}</h3>
            <p>Do not share this OTP with anyone.</p>
            <p>Happy blogging!</p>
            <p>Best regards,</p>
            <p>The Blogify Team</p>
            <a href="https://blogapp-gilt.vercel.app/login">Now Proceed for OTP Verification</a>
          </body>
        </html>
      `,
    };
    sendEmail(emailData);

    // Send OTP through SMS
    const smsData = {
      toPhoneNumber: phoneNumber,
      message: `Welcome to Blogify ${username}! Please use the following OTP to complete your registration: ${otp} . Do not share this OTP with anyone.`,
    };
    sendSms(smsData);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, otp } = req.body;

    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Validate OTP here (compare it with the OTP sent to the user during registration)
    if (otp !== mainOtp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error during login" });
  }
};

module.exports = {
  createUser,
  loginUser,
};
