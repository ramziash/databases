'use strict'

const { MongoClient } = require('mongodb');

async function main() {

    const url = "mongodb+srv://ramzi:turion12@cluster0-jmgbu.azure.mongodb.net/test?retryWrites=true&w=majority";

    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {

        await client.connect();

        await updateCityByName (client, 4500, 450000);


    } finally {
        await client.close();
    }
}

main().catch(console.error);


async function updateCityByName(client, cityId, updatedPopulation) {

    const result = await client.db("world").collection("city").updateOne({ ID: cityId }, { $set: {population : updatedPopulation} });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was updated.`);
}
