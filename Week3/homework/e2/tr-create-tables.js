'use strict'

const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection ({
    host : 'localhost',
    user : 'hyfuser',
    password : 'hyfpassword',
    database : 'week3_1'
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase () {

    const create_table_account = `
    CREATE TABLE IF NOT EXISTS account (
        account_number INT PRIMARY KEY,
        balance INT
    );`;

    const create_table_account_changes = `
    CREATE TABLE IF NOT EXISTS account_changes (
        change_number INT PRIMARY KEY,
        account_number INT,
        CONSTRAINT FK_account FOREIGN KEY (account_number) REFERENCES account(account_number),
        amount INT,
        changed_date DATE,
        remark VARCHAR(50)
    );`;

    connection.connect();

    try {
        await execQuery(create_table_account);
        await execQuery(create_table_account_changes)
    } catch (error){
        console.log(error)
    }
    connection.end()
}
seedDatabase()
