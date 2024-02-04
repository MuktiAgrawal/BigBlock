import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config({ path: "./config.env" });
const connectDb=async()=>{
  try{
    await mongoose.connect(process.env.ATLAS_URI,{
      useNewUrlParser:true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoose");
  }
  catch(err){
    console.error("Failed to connect to mongoose");
    console.error(err.message);
    process.exit(1);
  }
}
export default connectDb;

