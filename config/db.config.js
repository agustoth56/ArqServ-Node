const mongoose = require('mongoose');

const MongoServer = require('mongodb-memory-server').MongoMemoryServer;

MongoServer.create()
    .then(mongoServer => mongoose.connect(mongoServer.getUri(), {
        dbName: 'recuperacion-agustintoth'
    }))
    .then(() => console.log('Connected to database'))
    .catch(err => console.error(`Error connecting to database: ${err}`))

process.on('SIGINT', () => mongoose.disconnect())