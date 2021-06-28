const db = require ('../dataBase/users');

module.exports = {
    getUserByEmail: (email) => {
        db.find((user) => user.email.toLowerCase() === email.toLowerCase());
    },

    getUsers: () => db,
    createdUser: (user) => {
        db.push(user);
    },

    deletedUser: (email) => {
        const userIndex = db.findIndex((user) => user.email.toLowerCase() === email.toLowerCase());

        db.splice(userIndex, 1);
    },
    lengthUsersArr: () => {
        if (db.length < 1) {
            return true;
        }
    }
};