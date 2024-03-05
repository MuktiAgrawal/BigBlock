import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config({ path: "./config.env" });
const connectDb=async()=>{
  try{
    console.log('here')
    await mongoose.connect(process.env.ATLAS_URI,{
    }).then(() => {

      console.log("Connected to mongoose");
    })
  }
  catch(err){
    console.error("Failed to connect to mongoose");
    console.error(err.message);
    process.exit(1);
  }
}
export default connectDb;

