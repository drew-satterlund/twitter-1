const express = require('express');

// Create an instance of the Express application
const app = express();

// Define a logger that chronicles incoming requests with a timestamp
const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // if you don't use this function, the subsequent request handlers won't be routed to.
}

app.use(logger) // Register, or apply to all routes and requests in "app"

// Define a route: When a request is made, the response should .send('Whatever is here!')
app.get('/', (req, res) => {
    res.send('<h1>Hello, World!</h1>'); // SEND is the END of a request. 
});

// GET request handler for retrieving all tweets
app.get('/tweets', (req, res) => {
    // return all tweets from database or other data source
    const tweets = [
        {id: 1, author : 'drewmummy', content : 'first!'},
        {id: 2, author : 'drewmummy', content : 'I\'m so alone...'}
    ];
    res.json(tweets); // return tweets as JSON response
});

// POST req handler for creating a new tweet

app.post('/tweets', (req, res) => {
    // assume req body contains tweet data formatted in JSON already
    const newTweet = req.body;
    // Save new tweet to database
    // ...
    res.status(201).json(newTweet); //return new tweet as JSON
});

// PUT req handler for updating a tweet 
app.put('/tweets/:id', (req,res) => { // the :id portion is what's being pointed to by tweetId.
    const tweetId = req.params.id; // "Get the tweet ID from the request URL parameter"
    // assume req body contains tweet data formatted in JSON already
    const updatedTweet = req.body;
      // Update the tweet in the database or any other data store based on the tweetId
      // ...
      res.json(updatedTweet);
})

app.delete('/tweets/:id', (req, res) => {
    const tweetId = req.params.id; // Get the tweet ID from the request URL parameter
    // Delete the tweet from the database or any other data store based on the tweetId
    // ...
    res.sendStatus(204); // Return a status code 204 (No Content) to indicate successful deletion
  });



const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
