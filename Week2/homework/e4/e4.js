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
    
    const numOfAuthors = `select count(AP.author),R.paper_title from authors_and_publications as AP,research_papers as R where AP.paper = R.paper_id GROUP BY AP.paper;`;
    const femaleAuthors = `select count(AP.paper),A.gender from authors_and_publications as AP,authors as A where AP.author = A.author_no AND A.gender='f';`
    const avgHindex= `select AVG(A.h_index),A.author_name,A.university from authors as A GROUP BY A.author_name;`
    const numOfResPapersPerUniversity=`select COUNT(AP.paper),A.university from authors_and_publications as AP, authors as A WHERE AP.author=A.author_no GROUP BY A.university;`
    const minMaxHindex=`select MIN(A.h_index),MAX(A.h_index),A.university from authors as A GROUP BY A.university;`

    connection.connect();

    try {
        console.log(await execQuery(numOfAuthors));
        console.log(await execQuery(femaleAuthors));
        console.log(await execQuery(avgHindex));
        console.log(await execQuery(numOfResPapersPerUniversity));
        console.log(await execQuery(minMaxHindex));

    } catch (error) {
        console.error(error);
    }
    
    connection.end();
}

seedDatabase()

