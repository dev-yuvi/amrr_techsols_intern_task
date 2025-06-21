const express=require("express");
const path=require("path");
const dotenv=require("dotenv");
const cors=require("cors");
dotenv.config({path:path.join(__dirname,'config','config.env')})


const app=express();

const connectDB=require("./config/connectDB");
const itemRoutes=require("./routes/itemRoutes")
connectDB();
app.use(cors());~
app.use(express.json())

app.use('/api/items', itemRoutes);



app.listen(process.env.PORT,()=>{
    console.log('Server Running');
})