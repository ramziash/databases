'use strict'

const util = require('util');
const mysql = require('mysql');
const authors = require("./listOfAuthors");
const publications = require ('./listOfPublications')
const authors_publications= require('./authorsAndPublications')


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
        paper_id INT primary key,
        paper_title VARCHAR (50),
        publish_date DATE
      );`;

      const create_authors_and_publications=`
      CREATE TABLE IF NOT EXISTS authors_and_publications (
        line_id INT primary key,
        author INT, 
        CONSTRAINT FK_AUTHOR FOREIGN KEY (author) REFERENCES authors(author_no),
        paper INT, 
        CONSTRAINT FK_RESEARCH_PAPERS FOREIGN KEY (paper) REFERENCES research_papers(paper_id), 
        contributor VARCHAR (50)
      );`;


    connection.connect();


    try {
        // call the function that returns promise
        await execQuery(create_research_papars);
        await execQuery(create_authors_and_publications);

        await Promise.all(authors.map(async item => {
          const entry = `insert into authors set ?`;
          await execQuery(entry, item);
        }))

        await Promise.all(publications.map(async item => {
          const entry = `insert into research_papers set ?`;
          await execQuery(entry, item);
        }))

        await Promise.all(authors_publications.map(async item => {
          const entry = `insert into authors_and_publications set ?`;
          await execQuery(entry, item);
        }))


    } catch (error) {
        console.error(error);
    }
    
    connection.end();
}

seedDatabase()

