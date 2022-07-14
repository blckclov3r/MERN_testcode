require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workout');

const app = express();

//middleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next();
});

// routes
app.use("/api/workouts",workoutRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("Listening port 4000!!!")
        })
    })
    .catch((error)=>{
        console.log(error);
    })

