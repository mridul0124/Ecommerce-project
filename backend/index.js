import express from "express";
import dotenv from "dotenv"
import path from "path"
import { connectdb } from "./config/db.js";
import productroutes from "./routes/Product.routes.js"


dotenv.config();

const app = express();

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products",productroutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    });
}

const port = process.env.PORT || 8000;
app.listen(port, ()=> {
    connectdb()
    console.log('Server listening at port',port);
})

