const UserModel = require('../models/user-models');

class UserService{
    async findUser(filter) {
        const user = await UserModel.findOne(filter);
        return user;
    }

    async createUser(data) {
        const user = await UserModel.create(data);
        return user;
    }
}

module.exports = new UserService();