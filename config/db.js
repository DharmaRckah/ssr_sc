import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected Successfully on ${conn.connection.host}`)
    } catch (error) {
        console.log(`Mongodb Connection Error ${error.message}`)
        
    }
}


export default connectDB