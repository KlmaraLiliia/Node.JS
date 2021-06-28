const db = require('../dataBase/users')

module.exports ={
    regUsers: (req, res) => {
        if (loginUser) {
            return res.render('users', { registeredUsers, loginUser });
        }
        res.redirect('/error');
    }
};


const { userService } = require('../services');

module.exports = {

    createUser: async (req, res) => {
        try {
            await userService.addUser(req.body);

            res.status(201).json('User has been created');
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    },

    getUsers: async (req, res) => {
        try {
            const users = await userService.findUsers();

            res.status(200).json(users);
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    },

    getUserById: async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await userService.findUserById(userId);

            res.status(200).json(user);
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    },

    updateUser: async(req, res) => {
        try {
            const { userId } = req.params;

            await userService.changeUser(userId, req.body);

            res.status(200).json('User details have been changed');
        }
        catch(e) {
            res.status(400).json(e.message);
        }
    },

    deleteUser:  async (req, res) => {
        try {
            await userService.destroyUser(req.params.userId);

            res.status(200).json('User has been deleted');
        }
        catch(e) {
            res.status(400).json(e.message);
        }
    }
};