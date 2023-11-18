// app.js

const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();
const port = 4000;

// Connection URI to your MongoDB database
const uri = 'mongodb+srv://testuser:testpassword@cluster0.oburu6d.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri);

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files from the "public" directory
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
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        // Perform MongoDB operations here
        const data = await findDocuments('test', 'coll_songs', {});

        // Log to the console that MongoDB was accessed
        console.log('MongoDB accessed');

        // Send a response to the client
        res.json({ success: true, message: 'Data retrieved from MongoDB', data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    } finally {
        // Close the MongoDB connection
        await client.close();
        console.log('Closed MongoDB connection');
    }
});

// Connect to MongoDB and handle button press to retrieve song data
app.get('/retrievePlaylistData', async (req, res) => {
    try {
        console.log('\nAttempting to retrieve playlist data');
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        // Perform MongoDB operations here
        const data = await findDocuments('test', 'coll_playlists', {});

        // Log to the console that MongoDB was accessed
        console.log('MongoDB accessed');

        // Send a response to the client
        res.json({ success: true, message: 'Data retrieved from MongoDB', data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    } finally {
        // Close the MongoDB connection
        await client.close();
        console.log('Closed MongoDB connection');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// MongoDB functions
async function insertDocument(dbname, collname, document) {
    const database = client.db(dbname);
    const collection = database.collection(collname);

    const result = await collection.insertOne(document);
    console.log(`Inserted document with _id: ${result.insertedId}`);
}

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