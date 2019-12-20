const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session);
const db = require('../database/dbConfig.js')

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

const sessionConfig = {
    name: 'chocolatechip',
    secret: 'this is a secret',
    cookie: {
        maxAge: 1000 * 60 * 20,
        secure: false,
        httpOnly: true
    },
    resave:false,
    saveUninitialized:false,

    store: new KnexSessionStore({
        
        knex: db,
        createtable: true,
        clearInterval: 1000 * 60 * 10,
        sidfieldname: "sid",
        tablename: "sessions",
      })
}

server.use(session(sessionConfig));
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
