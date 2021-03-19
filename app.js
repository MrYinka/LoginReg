const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const expressValidator = require('express-validator');


//Routes Imports
const userDashboard = require('./routes/dashboard');
const authUser = require('./routes/authentication');

//MiddleWares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.json());
app.use(expressValidator());

//Routes
app.use('/api', userDashboard);
app.use('/api', authUser);


const PORT = 8080;
app.listen(PORT, ()=>{
    console.log(`NodeJS API is listening on PORT: ${8080}`);
});