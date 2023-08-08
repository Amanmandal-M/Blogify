const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/allModels");
const { sendEmail } = require("../nodemailer/sendingEmails");

const SECRET_KEY = process.env.SECRET_KEY;

const createUser = async (req, res) => {
  try {
    const { username, email, password, profileImage } = req.body;

    const user = await UserModel.findOne({ where: { email } });
    if (user) {
      return res.status(401).json({ error: "Already Registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      profileImage
    });

// Send registration success email
const emailData = {
  email: newUser.email,
  subject: "Welcome to Blogify - Registration Successful!",
  body: `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <h2>Welcome to Blogify!</h2>
        <p>Thank you for registering with Blogify. You're now part of our community.</p>
        <p>Feel free to explore and start sharing your thoughts through blog posts.</p>
        <p>Happy blogging!</p>
        <p>Best regards,</p>
        <p>The Blogify Team</p>
        <a href="">Now Proceed for Login</a>
      </body>
    </html>
  `,
};
sendEmail(emailData);

    
    res.status(201).json(newUser);
    console.log(8)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "10h",
    });

    // Send login success email
    const emailData = {
      email: user.email,
      subject: "Login Successful - Welcome back to Blogify!",
      body: `
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <h2>Welcome back to Blogify!</h2>
            <p>You have successfully logged in to your Blogify account.</p>
            <p>Feel free to explore and continue your journey in our blogging community.</p>
            <p>Happy blogging!</p>
            <p>Best regards,</p>
            <p>The Blogify Team</p>
          </body>
        </html>
      `,
    };
    sendEmail(emailData);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error during login" });
  }
};

module.exports = {
  createUser,
  loginUser
};
