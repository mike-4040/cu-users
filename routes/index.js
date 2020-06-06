const router = require('express').Router();

const groupRoures = require('./group');
const authRotes = require('./auth');

//const { auth } = require('../utils/auth');

/** unprotected */
router.use('/api/auth', authRotes);

/** protected */
//router.use('/api/group', auth, groupRoures);
router.use('/api/group', groupRoures);

module.exports = router;
