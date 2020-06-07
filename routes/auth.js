const router = require('express').Router();

const controller = require('../controllers/auth');
const validationMiddle = require('../utils/validationMiddle');
const validationSchemas = require('../utils/validationSchemas');

router.post('/signin', validationMiddle(validationSchemas.signIn), controller.signin);
router.post('/signup', validationMiddle(validationSchemas.signUp), controller.signup);

module.exports = router;
