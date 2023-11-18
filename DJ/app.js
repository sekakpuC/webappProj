// app.js

const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();
const port = 4000;

// Connection URI to your MongoDB database
const uri = 'mongodb+srv://testuser:testpassword@cluster0.oburu6d.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri);

app.set('view engine', 'ejs');
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Render the index.ejs file
app.get('/', (req, res) => {
    res.render('index');
});

// Render the home.ejs file
app.get('/home', (req, res) => {
    res.render('home');
});

// Render the about.ejs file
app.get('/about', (req, res) => {
    res.render('about');
});

// Render the home.ejs file
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Render the home.ejs file
app.get('/user', (req, res) => {
    res.render('user');
});

// Connect to MongoDB and handle button press to retrieve song data
app.get('/retrieveSongData', async (req, res) => {
    try {
        console.log('\nAttempting to retrieve song data');
        await client.connect();
        console.log('Connected to MongoDB');

        // Find documents
        const data = await findDocuments('test', 'coll_songs', {});
        console.log('MongoDB accessed');

        // Send response to the client
        res.json({ success: true, message: 'Data retrieved from MongoDB', data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    } finally {
        await client.close();
        console.log('Closed MongoDB connection');
    }
});

// Connect to MongoDB and handle button press to retrieve playlist data
app.get('/retrievePlaylistData', async (req, res) => {
    try {
        console.log('\nAttempting to retrieve playlist data');
        await client.connect();
        console.log('Connected to MongoDB');

        // Find documents
        const data = await findDocuments('test', 'coll_playlists', {});
        console.log('MongoDB accessed');

        // Send a response to the client
        res.json({ success: true, message: 'Data retrieved from MongoDB', data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    } finally {
        await client.close();
        console.log('Closed MongoDB connection');
    }
});

// Start the server and listen to port #
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Inserts a document into MongoDB
async function insertDocument(dbname, collname, document) {
    const database = client.db(dbname);
    const collection = database.collection(collname);

    const result = await collection.insertOne(document);
    console.log(`Inserted document with _id: ${result.insertedId}`);
}

// Finds documents from MongoDB given a filter
async function findDocuments(dbName, collName, filter) {
    const database = client.db(dbName);
    const collection = database.collection(collName);

    const cursor = collection.find(filter);
    return cursor.toArray();
}

/*
// Connect to MongoDB and handle button press to send data
app.post('/sendSongData', async (req, res) => {
    try {
        console.log('\nAttempting to send data');
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        // Get data from the request body
        const { name, artist, cover, path } = req.body;

        // Perform MongoDB operations here
        await insertDocument('test', 'coll_songs', { name, artist, cover, path });

        // Log to the console that MongoDB was accessed
        console.log('MongoDB accessed');

        // Send a response to the client
        res.json({ success: true, message: 'Data sent to MongoDB' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    } finally {
        // Close the MongoDB connection
        await client.close();
        console.log('Closed MongoDB connection');
    }
});
*/
