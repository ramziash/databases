'use strict'

const util = require('util');
const mysql = require('mysql');



var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database : `Week2_1`
  });

const execQuery = util.promisify(connection.query.bind(connection));


async function seedDatabase() {
    
    const authors_collaborators = `select a.author_name, r.contributor from authors as A, research_papers as R where A.author_no=R.author;`;
    const left_join = `select * from authors as A left join research_papers as r on r.author=a.author_no;`

    connection.connect();

    try {
        console.log(await execQuery(authors_collaborators));
        console.log(await execQuery(left_join));
    } catch (error) {
        console.error(error);
    }
    
    connection.end();
}

seedDatabase()

