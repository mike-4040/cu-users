const router = require('express').Router();

const controller = require('../controllers/group');

/**
 *  All routes are protected, user_id from JWT
 */

/** get a list of all groups of a user */
router.get('/', controller.userGroups);

/** create a group of a user */
router.post('/', controller.createGroup);


/** add a user to a group */
router.post('/:id', controller.addToGroup);

/** get a list of all users in a group */
router.get('/:id/user', controller.userList);

module.exports = router;
