const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log("DB connection sucessfull.");
}).catch((err) => {
    console.log(err);
})