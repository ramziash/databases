'use strict'


const { MongoClient } = require('mongodb');

async function main() {

    const url = "mongodb+srv://ramzi:turion12@cluster0-jmgbu.azure.mongodb.net/test?retryWrites=true&w=majority";

    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {

        await client.connect();

        await findOneCityByName(client, "Utrecht");
        await findOneCityById(client, 4500);


    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function findOneCityByName(client, nameOfCity) {
    const cursor = await client.db("world").collection("city").find({name: nameOfCity}).sort({ID :-1}).limit(1);
    const results = await cursor.toArray();

    if (results) {
        console.log(`Found a listing in the collection with the name '${nameOfCity}':`);
        console.log(results)

    } else {
        console.log(`No listings found with the name '${nameOfCity}'`);
    }
}

async function findOneCityById(client, cityId) {
    const result = await client.db("world").collection("city").findOne({ ID: cityId });

    if (result) {
        console.log(`Found a listing in the collection with the ID '${cityId}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the ID '${cityId}'`);
    }
}
