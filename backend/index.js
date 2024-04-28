const express = require('express');
const cors =  require('cors');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

require('./model/userschema.js');
require('./db/conn')

const app = express();

app.use(express.json());
// uncomment before deploment
app.use(cors(
    {
        origin : ["https://ridebro.vercel.app/"],
        methods :["GET", "POST"] ,
        credentials : true
    }
));

// app.use(cors());

app.use(require('./router/auth'));

const PORT = process.env.PORT;

app.listen(PORT, ()=> console.log('App is running', PORT));
