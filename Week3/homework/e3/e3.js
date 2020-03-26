'use strict'

// 1- utrecht or 1=1. ## here you get all the info if inserted into name. 
// 2- 5555 or 1=1;  drop table Account; ## here you can delete the table. 


//to prevent injection make use of ?
function getPopulation(cityOrCountry, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    const query = `SELECT Population FROM ? WHERE Name = ? AND code = ?;`;
    const inserts = [[cityOrCountry], [name], [code]]
    conn.query(
      query, 
      inserts,
      function(err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  }