import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import { UserModel } from "../models/Users.js";

const router = express.Router();
let refresh=[];
router.post('/signUp', async(req,res) => {
  const {name, email, password} = req.body;

  if(!name || !email || !password) { 
    return res.json({message: 'Enter all fields',successful:false})
  }
  
  const user=await UserModel.findOne({email});

  if(user){
    return res.json({message:"User already exists",successful:false});
  }

  const hashedPassword=await bcrypt.hash(password,10)
  const newUser=new UserModel({name,email,password:hashedPassword});
  await newUser.save();

  const token = jwt.sign({id: newUser._id }, process.env.SECRET, {expiresIn: '1h' });
  res.cookie('jwtcookie', token, {httpOnly: true, secure: true});
  res.json({message:"User Registered Successfully",successful:true});
});


router.post("/login", async(req,res) => {
  const {email, password} = req.body;

  if(!email || !password) {
      return res.json({message: "Enter all fields",successful:false})
  }

  const user = await UserModel.findOne({email});

  if (!user) {
      return res.json({message: "User Doesn't Exist",successful:false});
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
      return res.json({message: "Username or Password is incorrect",successful:false});
  }

  const accessToken = generateAcessToken(user);
  console.log(accessToken);
  const refreshToken=jwt.sign({id:user._id},process.env.REFRESH_TOKEN_SECRET)
  console.log("Refresh Token",refreshToken);
  refresh.push(refreshToken);
  // user.updateOne({...,refreshToken});
  // res.cookie('jwtcookie', token, {httpOnly: true, secure: true});
  res.json({message: "Login Successful",successful:true,accessToken,refreshToken});
  
})

router.post("/token",async (req,res)=>{
  const refreshToken=req.body.refreshToken;
  if(refreshToken==null) return res.sendStatus(401)
  const user=await UserModel.findOne({refreshToken});
  if(user==null) return res.sendStatus(403)
  jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
    if(err) return res.sendStatus(403)
    const accessToken=generateAcessToken(user);
    res.json({accessToken})
  })
})

const generateAcessToken=(user)=>{
  return jwt.sign({id: user._id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s' });
}
// Middleware function to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const authHeader=req.headers['authorization']
  // Bearer TOKEN
  const token=authHeader && authHeader.split(' ')[1];
  console.log("Token in authenticate",token);
  // console.log(req);
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
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

router.delete("/logout", (req, res) => {
  // Set jwtcookie to an empty string
  // res.cookie("jwtcookie", "", {
  //   httpOnly: true,
  //   expires: new Date(0),
  //   secure: true,
  // });
  console.log("Logout router");
  refresh=refresh.filter(token=>token!==req.body.token)
  console.log(refresh);
  res.json({ message: "Logged out successfully",successful:false });
});

export {router as userRouter};