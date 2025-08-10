import mongoose from "mongoose";



export const connectDB = async () => {
    try{
       console.log();
       
        
        mongoose.connect(process.env.MONGO_URL);

        console.log("MONGODB CONNECTED SUCCESSFULLY!");
    }catch(error){
        console.log("Error connecting to mongoDB: ",error);
        process.exit(1);
    }
}
