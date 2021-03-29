exports.userSignUpValidator = (req, res, next) => {
    //Firstname Validation
    req.check('first_name', 'First Name is required').notEmpty();
    req.check('first_name')
        .isLength({
            min:5,
            max:30
        })
        .withMessage('Firstname must be between 5 to 30 characters');

    //Lastname Validation
    req.check('last_name', 'Last Name is required').notEmpty();
    req.check('last_name')
        .isLength({
            min:5,
            max:30
        })
        .withMessage('Lastname must be between 5 to 30 characters');

    //Email Validation
    req.check('email', 'Email must be between 3 to 32 Characters')
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 5,
            max: 50
        });

    //Password Validation
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({min:8})
        .withMessage("Password must contain at least 8 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");

    req.check('confirm_password', 'Password Confirm is required').notEmpty();
    req.check('confirm_password')
        .isLength({min:8})
        .withMessage("Password Confirm must contain at least 8 characters")
        .matches(/\d/)
        .withMessage("Password Confirm must contain a number");

    const errors = req.validationErrors();
    //Show errors as they appear
    if(errors){
        const firstError = errors.map((error) => error.msg)[0];
        return  res.status(400).json({error: firstError});
    }
    //Proceed to next middleware
    next();
};


exports.userSignInValidator = (req, res, next) => {
    //Email Validation
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'Email must be between 5 to 50 Characters')
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 5,
            max: 50
        });

    req.check('password', 'Password is required').notEmpty();

    const errors = req.validationErrors();
    //Show errors as they appear
    if(errors){
        const firstError = errors.map((error) => error.msg)[0];
        return  res.status(400).json({error: firstError});
    }
    //Proceed to next middleware
    next();
};