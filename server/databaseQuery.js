sql = require('./sqlconnect.js');

class DatabaseQuery {
  constructor() {
    this.conn = sql.conn;
  }
  
  select(queryString, args) {
    return new Promise((resolve, reject) => {
      this.conn.query(queryString, args, function (err, result, fields) {
        if(err) {
          return reject(err);
        }
        
        resolve(result);
      });
    });
  }
  
  insert(queryString, args) {
    return new Promise((resolve, reject) => {
      this.conn.query(queryString, args, function (err, result) {
        if(err) {
          return reject(err);
        }
        
        resolve(result);
      });
    });
  }
  
  update(queryString, args) {
    return new Promise((resolve, reject) => {
      this.conn.query(queryString, args, function (err, result) {
        // console.log(queryString);
        // console.log(err);
        if(err) {
          return reject(err);
        }
        
        resolve(result);
      });
    });
  }
  
  delete(queryString, args) {
    return new Promise((resolve, reject) => {
      this.conn.query(queryString, args, function (err, result) {
        if(err) {
          return reject(err);
        }
        
        resolve(result);
      });
    });
  }
}

databaseQuery = new DatabaseQuery();

module.exports = {
  databaseQuery
}