const db = require('./databaseQuery.js').databaseQuery;

function getUserStatistics(params, callback) {
	var accountId = params['account_id'];
	
	var queryString = "SELECT * FROM statistics WHERE account_id = ?;";
	var args = [accountId];
	
	db.select(queryString, args)
	.then(result => {
		callback(200, JSON.stringify(result[0]));
	})
	.catch(err => {
		callback(500, err);
	});
}

function updateUserStatistics(params, callback) {
	var accountId = params['account_id'];
	
	// console.log(params);
	
	var queryString = "UPDATE statistics SET";
	var args = [];
	
	var isFirst = true;
	Object.entries(params).forEach(([key, val]) => {
    if(key !== 'account_id') {
    	if(!isFirst) queryString += ",";
    	queryString += " " + key + "=?";
    	args.push(val);
    	
    	isFirst = false;
    }
	});
	
	queryString += " WHERE account_id = ?;";
	args.push(accountId);
	
	db.update(queryString, args)
	.then(result => {
		callback(200, "OK");
	})
	.catch(err => {
		callback(500, err);
	});
}

function addUser(params, callback) {
	var accountId = params['account_id'];
	
	var queryString = "INSERT INTO statistics VALUES (?, 0, 0, 0);";
	var args = [accountId];
	
	db.insert(queryString, args)
	.then(result => {
		callback(200, "OK");
	})
	.catch(err => {
		callback(500, err);
	});
}

module.exports = {
	getUserStatistics,
	updateUserStatistics,
	addUser
}