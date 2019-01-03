const db = require('./databaseQuery.js').databaseQuery;

function getUserStatistics(params, callback) {
	console.log("getUserStatistics");
	callback(200, "BY");
}

function updateUserStatistics(params, callback) {
	callback(200, "BYE");
}

module.exports = {
	getUserStatistics,
	updateUserStatistics
}