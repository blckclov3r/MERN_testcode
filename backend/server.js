require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workout');
var cors = require('cors');

const app = express();
app.use(cors());

//middleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next();
});




// routes
app.use("/api/workouts",workoutRoutes);


// dotenv example
// PORT=4000
// MONGO_URI = mongodb+srv://username:password@admin.2b5tk.mongodb.net/?retryWrites=true&w=majority

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("Listening port 4000!!!")
        })
    })
    .catch((error)=>{
        console.log(error);
    })

