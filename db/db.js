import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.mongo_uri)
    } catch(err) {
        console.error("error connecting to DB", err)
    }
}