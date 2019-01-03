const userController = require('./userController.js');

const routes = [
    {
        path: '/statistics',
        method: 'GET',
        handler: userController.getUserStatistics
    },
    {
        path: '/update',
        method: 'POST',
        handler: userController.updateUserStatistics
    },
    {
        path: '/add',
        method: 'POST',
        handler: userController.addUser
    }
];

module.exports = {
    routes
}