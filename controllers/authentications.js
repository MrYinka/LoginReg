const pool  = require('../dbconfig');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jsonwebtoken');
const jwtr = require('jsonwebtoken');
require('dotenv').config();

//Register Users
exports.signUp = async (req, res) => {
    try {
        const {first_name, last_name, email, password, confirm_password} = req.body;
        const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if(user.rows.length > 0){
            res.status(401).json({ error: 'User Already Exist!' })
        }else if(password != confirm_password){
            res.status(401).json({ error: 'Password do not match' });
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashed_password = await bcrypt.hash(password, salt);
            const newUser = await pool.query(`INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`, [first_name, last_name, email, hashed_password]);
            const token = jwt(newUser.rows[0].id);
            res.status(200).json({ Message: 'Registered Successfully!' });
        }
    } catch (e) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
//Register Users Ends


//User Login
exports.signIn = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user  = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if(user.rows.length === 0){
            return res.status(401).json({ Message: "Invalid Credentials" })
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if(!validPassword){
            return res.status(401).json({ "Message": "Incorrect Email and Password Combination" })
        }
        const token = jwt(user.rows[0].id);
        res.cookie('t', token);
        const {id, first_name, last_name} = user.rows[0];
        res.json({token, user: {id, first_name, last_name}});
    }catch (e) {
        console.error(e.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
//User Login Ends

//Signout Method
exports.signOut = (req, res) => {
    res.clearCookie('t');
    return res.json({
        message: "Sign out successful!"
    });
};
//Signout Method Ends