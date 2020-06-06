const router = require('express').Router();

const controller = require('../controllers/auth');

router.post('/signin', controller.signin);
router.post('/signup', controller.signup);
router.get('/user/:id', controller.getUser);

module.exports = router;
