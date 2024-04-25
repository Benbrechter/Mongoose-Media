const express = require('express');
const db = require('./config/connections');

const PORT = process.env.PORT || 3001
const app = express();

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//.once method listens for the event open exatly once. When it is emmited it is removed until the server is reset
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server is running on ${PORT} meow!`)
    })
})