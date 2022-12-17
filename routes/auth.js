const {Router} = require('express');
const {check} = require('express-validator');
const { createUser, validateToke, loginUser } = require('../controllers/auth');
const { validateField } = require('../middlewares/validate-field');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router()

router.post('/new',
[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be more than 6 characters').isLength({min:6}),
    validateField
],
createUser)

router.post('/',
[
    check('email','Emial is required').isEmail(),
    check('password','Password is required').not().isEmpty(),
    validateField
],
loginUser)

router.get('/renew', validateJWT , validateToke)

module.exports = router


//route user / Auth
//host + /api/auth