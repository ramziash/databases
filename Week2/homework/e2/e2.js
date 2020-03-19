'use strict'

const util = require('util');
const mysql = require('mysql');
const authors = require("./listOfAuthors");
const publications = require ('./listOfPublications')


// creating the tables. 

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database : `Week2_1`
  });


const execQuery = util.promisify(connection.query.bind(connection));


async function seedDatabase() {

    
    const create_research_papars = `
      CREATE TABLE IF NOT EXISTS research_papers (
        paper_id INT,
        paper_title VARCHAR (50),
        publish_date DATE,
        author int,
        CONSTRAINT FK_AUTHOR FOREIGN KEY (author) REFERENCES authors(author_no),
        contributor VARCHAR (50)
      );`;


    connection.connect();


    try {
        // call the function that returns promise
        await execQuery(create_research_papars);

        await Promise.all(authors.map(async item => {
            const entry = `insert into authors set ?`;
            await execQuery(entry, item)
        }))

        await Promise.all(publications.map(async item => {
            const entry = `insert into research_papers set ?`;
            await execQuery(entry, item)
        }))


    } catch (error) {
        console.error(error);
    }
    
    connection.end();
}

seedDatabase()

