const mongoose = require('mongoose');


mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true ,useUnifiedTopology: true },
    console.log("Connected to Database..."))

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));