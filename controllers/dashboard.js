const pool  = require('../dbconfig');
const { authorize } = require('../middlewares/authorization')

exports.dashboard = async (req, res) => {
    try{
        const user = await pool.query(`SELECT first_name, last_name FROM users WHERE id = $1`, [req.user.id]);
        res.json(user.rows[0]);
    }catch (e) {
        console.error(e.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};