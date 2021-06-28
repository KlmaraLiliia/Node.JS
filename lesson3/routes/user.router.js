const router = require('express').Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.regUsers );
router.post('/', userMiddlewares.checkIsAdminMiddleware, userMiddlewares.checkEmailValidity, userMiddlewares.checkPasswordValidity,userController.getUsers);
router.get('/:userId', userMiddlewares.checkIdValidity, userController.getUserById);
router.put('/:userId', userMiddlewares.checkIdValidity, userController.updateUser);
router.delete('/:userId', userMiddlewares.checkIdValidity, userController.deleteUser);

module.exports = router;

