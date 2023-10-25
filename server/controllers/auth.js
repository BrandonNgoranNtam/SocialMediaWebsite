import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    const salt = await bcrypt.genSalt(); //Creates a random salt to help encrypt our password
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000), //Dummy value but could be interesting to make it real (TODO)
      impresssions: Math.floor(Math.random() * 10000), //Dummy value but could be interesting to make it real (TODO)
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message }); // Can customize the error messages
  }
};

/* LOGGING IN (Basic authentication but production level projects usually have a 3rd party authentication provider of some sorts) */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password); //bcrypt.compare() uses the salt that is stored in the hashed password to hash the plaintext password and compare the two hashes.
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    
    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
    delete user.password; // To make sure the password doesn't get sent to the front-end
    res.status(200).json({ token, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
