const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminModel } = require("../models/adminModel");
const { UserModel } = require("../models/userModel");
const { sendEmail } = require("../nodemailer/sendingEmails");

const SECRET_KEY = process.env.ADMIN_JWT_KEY;

const createAdmin = async (req, res) => {
  try {
    const { username, email, password, profileImage } = req.body;

    const user = await adminModel.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await adminModel.create({
      username,
      email,
      password: hashedPassword,
      profileImage
    });

    // Send registration success email
    const emailData = {
      email: newUser.email,
      subject: "Welcome to Blogify Admin Section - Registration Successful!",
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
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await adminModel.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, ADMIN_JWT_KEY, {
      expiresIn: "24h",
    });

    // Send login success email
    const emailData = {
      email: user.email,
      subject: "Login Successful - Welcome Admin in Blogify!",
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




// ------------>>>> User Section <<<<----------------

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const [updatedRows] = await UserModel.update(req.body, {
      where: { id: userId },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Error updating user" });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedRows = await UserModel.destroy({
      where: { id: userId },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

module.exports = {
  createAdmin,
  loginAdmin,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
