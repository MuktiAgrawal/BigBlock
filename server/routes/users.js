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
  const refreshToken=jwt.sign({id:newUser._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'30d'});

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

  const accessToken = generateAccessToken(user);
  const refreshToken=jwt.sign({id:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'30d'});
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
    const accessToken=generateAccessToken(decodedToken);
    res.json({accessToken})
  })
})

const generateAccessToken = (decodedRefreshToken) => {
  return jwt.sign({ id: decodedRefreshToken.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};


// Middleware function to authenticate tokens
const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const refreshToken = req.headers['refresh-token'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token || !refreshToken) {
    return res.status(401).json({ message: 'Missing token' });
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        try {
          jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decodedRefreshToken) => {
            if (err) {
              console.log(err);
              return res.json({ message: 'Invalid refresh token' });
            } else {
              req.userId = decodedRefreshToken.id;
              // console.log("Refresh token verified");
              const newAccessToken = generateAccessToken(decodedRefreshToken);
              // console.log("New access token generated:", newAccessToken);
              req.accessToken=newAccessToken;
              next();
            }
          });
        } catch (error) {
          console.log(error);
          return res.status(401).json({ message: 'Invalid token' });
        }
        // return res.status(401).json({ message: 'Invalid access token' });
      } else {
        req.userId = decodedToken.id;
        // console.log("Access token verified");
        req.accessToken=token;
        // res.json({message:"Access token verified"});
        next();
      }
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Invalid token' });
  }
};

// Protected route that requires authentication
router.get('/user-data', authenticateJWT, async (req, res) => {
  if(req.userId!=null){
    const user = await UserModel.findOne({ _id: req.userId });
    const accessToken=req.accessToken;
    // console.log(accessToken);
    res.json({user,accessToken});
  }
  else{
    res.json({message:"Invalid token or user not logged in"})
  }
});

router.delete("/logout/:refreshToken", async (req, res) => {
  const result=await RefreshModel.deleteOne({refreshToken:req.params.refreshToken});
  // console.log(result);
  res.json({ message: "Logged out successfully" });
});

export {router as userRouter,authenticateJWT};