const mongoose = require('mongoose');
const connectDB = async()=> {
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("DataBase Connected Successfully");
    }
    
    catch(error){
        console.log("DB connection failed :");
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectDB