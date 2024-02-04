// dependencies

import express from "express"
import dotenv from "dotenv"
import connectDb from "./db/conn.js"
import {userRouter} from "./routes/users.js"
// const cors = require("cors");

const app = express();
dotenv.config({ path: "./config.env" });

// get driver connection
connectDb();

const port = process.env.PORT || 5000;
// app.use(cors());
app.use(express.json());
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send("Something broke!");
})
app.use("/user",userRouter);

app.get("/",(req,res)=>{
    return res.status(200).send("Hello World");
})

app.listen(port, () => {
  // perform a database connection when server starts
    console.log(`Server is running on port: ${port}`);
});

