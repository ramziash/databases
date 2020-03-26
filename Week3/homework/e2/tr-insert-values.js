'use strict'

const util = require ('util');
const mysql = require ('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'hyfuser',
    password : 'hyfpassword',
    database : 'Week3_1'
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase () {

    const insert_to_account = `
    INSERT into account VALUES 
    (101, 500), (102, 700)
    ;`;

    const insert_to_account_changes = `
    INSERT into account_changes VALUES (
        1001,
        102,
        50,
        '2020-03-22',
        'Transportation'
    );`;

    connection.connect();

    try {
        await execQuery(insert_to_account);
        await execQuery(insert_to_account_changes);
    } catch (error) {
        console.log(error);
    }

    connection.end();

}

seedDatabase();