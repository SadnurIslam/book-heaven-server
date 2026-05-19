const { MongoClient, ServerApiVersion } = require("mongodb");
const env = require("./env");

const buildMongoUri = () => {
  if (env.mongoUri) {
    return env.mongoUri;
  }

  return `mongodb+srv://${encodeURIComponent(
    env.dbUser
  )}:${encodeURIComponent(env.dbPassword)}@${env.dbHost}/?appName=${encodeURIComponent(
    env.dbAppName
  )}`;
};

const uri = buildMongoUri();

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let clientPromise;

const connectToDatabase = async () => {
  if (!clientPromise) {
    clientPromise = client.connect();
  }
  await clientPromise;
  return client;
};

const getCollections = async () => {
  const connectedClient = await connectToDatabase();
  const database = connectedClient.db(env.dbName);
  return {
    booksCollection: database.collection("books"),
    commentsCollection: database.collection("comments"),
    savedCollection: database.collection("savedBooks"),
  };
};

module.exports = { connectToDatabase, getCollections };
