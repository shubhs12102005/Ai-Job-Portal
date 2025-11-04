import mongoose from "mongoose";

export const MongoConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDb Successfully connected");
    } catch (error) {
        console.log(error);
    }
}