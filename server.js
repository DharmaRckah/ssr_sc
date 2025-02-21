import dotenv from "dotenv"
import connectDB from "./config/db.js"
import express from "express"
import morgan from "morgan"
import cors from "cors"
import productRoute from "./routes/productRoute.js"
dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(morgan("combined"))
app.use(express.json())

app.use("/api/v1/product",productRoute)


const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on Port ${port}`)
})
