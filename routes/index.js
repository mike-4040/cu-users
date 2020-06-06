const router = require('express').Router();

const groupRoures = require('./group');
const authRotes = require('./auth');
const { authMiddle } = require('../utils');

/** unprotected */
router.use('/api/auth', authRotes);

/** protected */
router.use('/api/group', authMiddle, groupRoures);

module.exports = router;
