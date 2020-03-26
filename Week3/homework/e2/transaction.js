'use strict'

const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'hyfuser',
    password : 'hyfpassword',
    database : 'week3_1'
})

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase (dep_acc1, cre_acc2, amount, remark) {

    const create_transaction=`START transaction;`
    const find_account = `SELECT account_number from account where account_number =?;`;
    const change_account = `UPDATE account SET balance =? WHERE account_number =?;`;
    const log_changes = `INSERT into account_changes VALUES (
        1002,
        ?,
        ?,
        '2020-03-25',
        ?
    );`;
    const end_transaction = `Commit;`

    try{
        await execQuery (create_transaction)
    
        await execQuery (find_account, dep_acc1);
        await execQuery (find_account, cre_acc2);

    //    await execQuery (change_account, [[-amount], [dep_acc1]]); // can i get some help here pls. how to reduce the amount transfered. 
        await execQuery (change_account, [[amount], [cre_acc2]]);
       
        await execQuery (log_changes, [[cre_acc2], [amount], [remark]] )

        await execQuery (end_transaction);

    } catch (error) {
        connection.rollback()
        console.log(error)
    }


    connection.end();
}

seedDatabase(101,102,100,'Gift');