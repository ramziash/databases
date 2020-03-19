'use strict'

const util = require('util');
const mysql = require('mysql');


// creating the tables. 

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database : `Week2_1`
  });

// Promisify the bind function of query function of connection object
// Pass connection object (because bind expects "this")
// Afterwards execQuery will work as a function that returns a promise but
// we don't have to call "then" over that promise
const execQuery = util.promisify(connection.query.bind(connection));

// const create_database = `create database if not exists Week2_1`;
// execQuery(create_database);

async function seedDatabase() {

    
    const CREATE_AUTHOR_TABLE = `
      CREATE TABLE IF NOT EXISTS authors (
        author_no INT Primary key,
        author_name VARCHAR(50),
        university VARCHAR (50),
        date_of_birth DATE,
        h_index int,
        gender ENUM('m', 'f')
      );`;

    const add_friend_column= `alter table authors add friend int;`

    const add_foreign_key= `alter table authors add constraint fk_authors FOREIGN KEY (friend) REFERENCES authors(author_no);`

    connection.connect();

    try {
        // call the function that returns promise
        await execQuery(CREATE_AUTHOR_TABLE);
        await execQuery(add_friend_column);
        await execQuery(add_foreign_key);
    } catch (error) {
        console.error(error);
    }
    
    connection.end();
}

seedDatabase()

