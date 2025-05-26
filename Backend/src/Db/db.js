import mongoose from "mongoose";
import config from "../config/config.js";



function connectDB(){

    mongoose.connect(config.MONGO_URI)
    .then(()=>{
        console.log("connected to MONGO DB");
    })
    .catch((err)=>{
        console.error("Error connecting to MONGO DB", err);
    });
}

export default connectDB;