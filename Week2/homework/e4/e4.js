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
    
    const numOfAuthors = `select count(author) from research_papers as R group by r.paper_title;`;
    const femaleAuthors = `select count(paper_title) from research_papers as r inner join authors as A on a.author_no=r.author where a.gender='f';`
    const avgHindex= `select avg(h_index) from authors as a inner join research_papers as r on a.author_no=r.author;`
    const avgHindexUniversity=`select avg(h_index),university from authors as a inner join research_papers as r on a.author_no=r.author group by a.university;`
    const numOfResPapersPerUniversity=`select count(r.paper_id),a.university from research_papers as r inner join authors as A on a.author_no=r.author group by a.university;`
    const minMaxHindex=`select min(a.h_index),max(a.h_index),a.university from authors as a left join research_papers as r on a.author_no=r.author group by a.university;`

    connection.connect();

    try {
        console.log(await execQuery(numOfAuthors));
        console.log(await execQuery(femaleAuthors));
        console.log(await execQuery(avgHindex));
        console.log(await execQuery(avgHindexUniversity));
        console.log(await execQuery(numOfResPapersPerUniversity));
        console.log(await execQuery(minMaxHindex));

    } catch (error) {
        console.error(error);
    }
    
    connection.end();
}

seedDatabase()

