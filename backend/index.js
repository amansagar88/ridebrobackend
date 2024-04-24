import express from  'express';
import cors from  'cors';

const app = express();
app.use(cors());

app.get("/getData", (req, res)=>{
    res.send("Hello World! from backend");
})

app.listen(5000, ()=> console.log("App is running"));