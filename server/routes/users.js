import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import { UserModel } from "../models/Users.js";
import { RefreshModel } from "../models/RefreshToken.js";

const router = express.Router();

router.post('/signUp', async(req,res) => {
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

  const accessToken = generateAcessToken(newUser);
  // console.log(accessToken);
  const refreshToken=jwt.sign({id:newUser._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'30d'});
  // console.log("Refresh Token",refreshToken);
  const newRefresh=new RefreshModel({refreshToken});
  await newRefresh.save();
  // res.cookie('jwtcookie', token, {httpOnly: true, secure: true});
  res.json({message:"User Registered Successfully",accessToken,refreshToken});
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

  const accessToken = generateAcessToken(user);
  // console.log(accessToken);
  const refreshToken=jwt.sign({id:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'30d'});
  // console.log("Refresh Token",refreshToken);
  const newRefresh=new RefreshModel({refreshToken});
  await newRefresh.save();
  res.json({message: "Login Successful",accessToken,refreshToken});
})

router.post("/token",async (req,res)=>{
  const refreshToken=req.body.refreshToken;
  if(refreshToken==null) 
    return res.sendStatus(401)

  const refresh=await RefreshModel.findOne({refreshToken});

  if(refresh==null) 
    return res.status(403).json({message:"Missing refresh token"})

  jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,decodedToken)=>{
    if(err) 
      return res.status(403).json({message:"Invalid refresh token"})
    // console.log(decodedToken);
    const accessToken=generateAcessToken(decodedToken);
    res.json({accessToken})
  })
})

const generateAcessToken=(user)=>{
  return jwt.sign({id: user._id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m' });
}
// Middleware function to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const authHeader=req.headers['authorization']
  // Bearer TOKEN
  const token=authHeader && authHeader.split(' ')[1];
  // console.log("Token in authenticate",token);
  // console.log(req);
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err);
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
  if(req.userId!=null){
    const user = await UserModel.findOne({ _id: req.userId });
    // console.log("User data sent to client by /user-data",user);
    res.json(user);
  }
});

router.delete("/logout/:refreshToken", async (req, res) => {
  // console.log("Logout router");
  // console.log(req.params);
  const result=await RefreshModel.deleteOne({refreshToken:req.params.refreshToken});
  // console.log(result);
  res.json({ message: "Logged out successfully" });
});

export {router as userRouter,authenticateJWT};