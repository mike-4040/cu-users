const router = require('express').Router();

const controller = require('../controllers/group');
const validationMiddle = require('../utils/validationMiddle');
const validationSchemas = require('../utils/validationSchemas');

/**
 *  All routes are protected, user.id from JWT
 */

/** get a list of all groups of a user */
router.get('/', controller.userGroups);

/** create a group of a user */
router.post('/', controller.createGroup);


/** add a user to a group */
router.post('/:id', validationMiddle(validationSchemas.addUser), controller.addToGroup);

/** get a list of all users in a group */
router.get('/:id/user', controller.userList);

module.exports = router;
