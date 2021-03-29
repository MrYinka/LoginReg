const express = require('express');
const app = express();
const morgan = require('morgan');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const cors = require('cors');


//Routes Imports
const userDashboard = require('./routes/dashboard');
const authUser = require('./routes/authentication');


//MiddleWares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(cors());

//Routes
app.use('/api', userDashboard);
app.use('/api', authUser);


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`NodeJS API is listening on PORT: ${8080}`);
});