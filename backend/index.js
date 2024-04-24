import express from  'express';
import cors from  'cors';

const app = express();
app.use(cors(
    {
        origin : ["https://ridebro.vercel.app"],
        methods :["GET", "POST"] ,
        credentials : true
    }
));

app.get("/", (req, res)=>{
    res.json("Hello World! from backend");
})

app.listen(5000, ()=> console.log("App is running"));