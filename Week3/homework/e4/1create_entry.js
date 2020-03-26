'use strict'

const {MongoClient} = require('mongodb');

async function main(){

    const url = "mongodb+srv://ramzi:turion12@cluster0-jmgbu.azure.mongodb.net/test?retryWrites=true&w=majority";

    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {
        await client.connect();

        await createCity(client,
            {
                ID : 4500,
                name : "Utrecht",
                countrycode : "NLD",
                district : 'utrecht',
                population : 500000
            }
        );

    } finally {
        await client.close();
    }
}

main().catch(console.error);


async function createCity(client, newCity){
    const result = await client.db("world").collection("city").insertOne(newCity);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

