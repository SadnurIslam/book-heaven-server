const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = 3000

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.leame9e.mongodb.net/?appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });


app.get('/', (req, res) => {
  res.send('Hello World!')
})


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("booksDB");
    const booksCollection = database.collection("books");
    const usersCollection = database.collection("users");

    // app.post('/users', async (req, res) => {
    //   const user = req.body;
    //   console.log(user);
    //   const result = await usersCollection.insertOne(user);
    //   res.send(result);
    // })

    app.get('/books', async(req, res) => {
      const {limit, sort, email} = req.query;
      let query = booksCollection.find();
      if(sort === 'latest'){
        query = query.sort({createdAt: -1});
      }
      else if(sort === 'rating_asc'){
        query = query.sort({rating: 1});
      }
      else if(sort === 'rating_desc'){
        query = query.sort({rating: -1});
      }
      if(limit){
        query = query.limit(parseInt(limit));
      }
      if(email){
        query = query.filter({userEmail: email});
      }
      const books = await query.toArray();
      res.send(books);
    })

    app.post('/books', async (req, res) => {
        const book = req.body;
        console.log(book);
        book.createdAt = new Date();
        const result = await booksCollection.insertOne(book);

        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        res.send(result);
    })


    app.patch('/books/:id', async (req, res) => {
      const id = req.params.id;
      const updatedBook = req.body;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set : updatedBook
      }
      const result = await booksCollection.updateOne(filter, updatedDoc);
      res.send(result);
    })


    app.get('/books/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const book = await booksCollection.findOne(query);
      res.send(book);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })