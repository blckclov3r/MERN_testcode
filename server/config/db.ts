import mongoose from "mongoose";
import colors from 'colors'

export const connectDB = async () =>{
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(colors.bgGreen(`MongoDB Connected: ${conn.connection.host}`))
    return conn
}

