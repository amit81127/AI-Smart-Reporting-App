const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(`Registration attempt for: ${email}`);
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log(`Registration failed: User ${email} already exists`);
        return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    console.log(`✅ User ${email} registered successfully`);
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    console.error(`❌ Registration Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Login attempt for: ${email}`);
    
    const user = await User.findOne({ email });
    if (!user) {
        console.log(`Login failed: User ${email} not found`);
        return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log(`Login failed: Incorrect password for ${email}`);
        return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    console.log(`✅ User ${email} logged in successfully`);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error(`❌ Login Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
