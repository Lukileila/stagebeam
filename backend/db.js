const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://sullysarahi:securepassword555444@cluster0.pgudo3d.mongodb.net/Stage-Beam?retryWrites=true&w=majority'

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}


connectToMongo();





