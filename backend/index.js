const express = require('express');
const cors =  require('cors');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

require('./model/userschema.js');
require('./model/rideschema.js');
require('./db/conn')

const app = express();

app.use(express.json());

app.use(cors());

app.use(require('./router/auth'));

const PORT = process.env.PORT;

app.listen(PORT, ()=> console.log('App is running', PORT));
