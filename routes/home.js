const express =  require('express');
const { userHome } = require('../controllers/home');

const router = express.Router();

router.get('/', userHome);

module.exports = router;