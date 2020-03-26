'use strict'

const { MongoClient } = require('mongodb');

async function main() {

    const url = "mongodb+srv://ramzi:turion12@cluster0-jmgbu.azure.mongodb.net/test?retryWrites=true&w=majority";

    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {
        await client.connect();

        await deleteCityById(client, 4500);
  
    } finally {
        await client.close();
    }
}

main().catch(console.error);


async function deleteCityById(client, cityId) {
    const result = await client.db("world").collection("city").deleteOne({ ID: cityId });
    console.log(`${result.deletedCount} document(s) was deleted.`);
}

