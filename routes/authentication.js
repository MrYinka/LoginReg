const router =  require('express').Router();
const  { signUp, signIn }   = require('../controllers/authentications');

router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;