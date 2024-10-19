import mongoose from "mongoose";


export const connectdb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully.',conn.connection.host);
       
     }
     catch(error){
        console.log(error);
        process.exit(1);
    
     }  
}