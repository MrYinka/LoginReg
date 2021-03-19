const pool  = require('../dbconfig');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jsonwebtoken');
// const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signUp = async (req, res) => {
    try {
        //Destructing the req.body
        const {first_name, last_name, email, password} = req.body;

        //Check if user exist
        const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if(user.rows.length > 0){
            res.status(401).json({
                Message: 'User Already Exist!'
            })
        }else{

            //Else, Encrypt user password
            const salt = await bcrypt.genSalt(10);
            const hashed_password = await bcrypt.hash(password, salt);

            //Save User
            const newUser = await pool.query(`INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`, [first_name, last_name, email, hashed_password]);

            // res.json(newUser.rows[0].id);

            //Generate jwt token
            const token = jwt(newUser.rows[0].id);

            // const {first_name, last_name, email, password } = newUser.rows[0];

            res.json({token});


        }


    } catch (e) {
        console.error(e.message);
        res.status(500).json({
            error: 'Internal Server Error'
        });

    }
};


exports.signIn = async (req, res) => {
    try{

        const { email, password } = req.body;

        const user  = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if(user.rows.length === 0){
            return res.status(401).json({
                Message: "Invalid Credentials"
            })
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if(!validPassword){
            return res.status(401).json({
                "Message": "Incorrect Email and Password Combination"
            })
        }

        //Generate jwt token
        const token = jwt(user.rows[0].id);

        // const {first_name, last_name, email, password } = newUser.rows[0];

        res.json({token});

    }catch (e) {
        console.error(e.message);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

