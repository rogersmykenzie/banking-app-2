require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const app = express();

app.use(express.json()); //middleware

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('Database Connected');
})

app.listen(5050, () => console.log(`Listening on Port 5050`));