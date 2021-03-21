const router =  require('express').Router();
const { userSignUpValidator, userSignInValidator } = require('../middlewares/validations');
const  { signUp, signIn }  = require('../controllers/authentications');

router.post('/signup', userSignUpValidator,  signUp);
router.post('/signin', userSignInValidator, signIn);


module.exports = router;