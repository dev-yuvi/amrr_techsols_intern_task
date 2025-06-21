const mongoose=require("mongoose");


const connectDB=()=>{
    mongoose.connect(process.env.DB_URL).then((con)=>{
        console.log("DB Connected "+con.connection.host);
    })
}

module.exports=connectDB;