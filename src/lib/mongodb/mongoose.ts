import mongoose from "mongoose"

let initialized = false

export const connect = async ()=>{
    mongoose.set('strictQuery', true)
    if (initialized) { 
        console.log("Already connected to Mongodb");
        return
    }
    try {
        await mongoose.connect(process.env.NEXT_MONGODB_URI || "",{
            dbName: "uni-blogs",
        });
        console.log("Connected to MongoDB");
        
        initialized = true
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        
    }
}