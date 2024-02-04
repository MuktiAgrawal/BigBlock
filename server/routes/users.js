import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post('/register', async(req,res) => {
  const {name, email, password} = req.body;

  if(!name || !email || !password) { 
    return res.json({message: 'Enter all fields'})
  }
  
  const user=await UserModel.findOne({email});

  if(user){
    return res.json({message:"User already exists"});
  }

  const hashedPassword=await bcrypt.hash(password,10)
  const newUser=new UserModel({name,email,password:hashedPassword});
  await newUser.save();

  const token = jwt.sign({id: user._id }, process.env.SECRET, {expiresIn: '1h' });
  res.cookie('jwtcookie', token, {httpOnly: true, secure: true});
  res.json({message:"User Registered Successfully"});
});


router.post("/login", async(req,res) => {
  const {email, password} = req.body;

  if(!email || !password) {
      return res.json({message: "Enter all fields"})
  }

  const user = await UserModel.findOne({email});

  if (!user) {
      return res.json({message: "User Doesn't Exist"});
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
      return res.json({message: "Username or Password is incorrect"});
  }

  const token = jwt.sign({id: user._id }, process.env.SECRET, {expiresIn: '1h' });
  res.cookie('jwtcookie', token, {httpOnly: true, secure: true});
  res.json({message: "Login Successful"});

})

// Middleware function to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.jwtcookie;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        req.userId = decodedToken.id;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'Missing token' });
  }
};

// Protected route that requires authentication
router.get('/user-data', authenticateJWT, async (req, res) => {
  const user = await UserModel.findOne({ _id: req.userId });
  res.json(user);
});

router.post("/logout", (req, res) => {
  res.cookie("jwtcookie", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: true,
  });
  res.json({ message: "Logged out successfully" });
});

export {router as userRouter};