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
    
    const authors_collaborators = `select a.author_name, ar.contributor from authors as A, authors_and_publications as AR where A.author_no=AR.author;`;
    const left_join = `select * from authors as A left join authors_and_publications as AR on AR.author=A.author_no LEFT JOIN research_papers as R on R.paper_id=AR.paper;`

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

