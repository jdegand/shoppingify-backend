require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const registerRouter = require('./routes/register');
const authRouter = require('./routes/auth');
const refreshRouter = require('./routes/refresh');
const logoutRouter = require('./routes/logout');

const categoriesRouter = require('./routes/categories')
const itemsRouter = require('./routes/items')
const listsRouter = require('./routes/lists')

// need statistics router as well ?

const app = express();

// need to move this to separate file for seeding / testing purposes?
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use(logger('dev'));

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/register', registerRouter);
app.use('/auth', authRouter); // login
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);
app.use('/categories', categoriesRouter)
app.use('/items', itemsRouter);
app.use('/lists', listsRouter);

// app.use('/users', usersRouter); // profile

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

module.exports = app;