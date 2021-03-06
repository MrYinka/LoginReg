const router =  require('express').Router();
const { userSignUpValidator, userSignInValidator } = require('../middlewares/validations');
const  { signUp, signIn, signOut }  = require('../controllers/authentications');

router.post('/signup', userSignUpValidator,  signUp);
router.post('/signin', userSignInValidator, signIn);
router.get('/signout', signOut);


module.exports = router;