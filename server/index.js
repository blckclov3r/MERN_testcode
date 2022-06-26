const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users')
const cors = require('cors');



// we need to use express.json in order have a post request
app.use(express.json())
app.use(cors())

// testdb is the name of database, users- is a collection name
mongoose.connect('mongodb+srv://admin:admin@nodejstut.2b5tk.mongodb.net/testdb?retryWrites=true&w=majority');

app.get("/getUsers",(req,res)=>{
    UserModel.find({},(err,result)=>{
        if(!err){
            res.json(result)
        }else{
            res.json(err)
        }
    })
});

app.post("/createUser",async (req,res)=>{
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save()

    res.json(user);
});

app.listen(3001,()=>{
    console.log("Server runs perfectly");
})