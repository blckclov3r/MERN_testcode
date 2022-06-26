const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const HealthRouter = require('./routes/HealthRoutes')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb connection
const URI = process.env.ATLAS_URI;
mongoose.connect(URI);

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB connection is established.');
});


//endpoint ex: localhost:5000/health
app.use('/health',HealthRouter)

app.listen(port,()=>{
    console.log("server is runnning...");

});
