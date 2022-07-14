const express = require('express');

const router = express.Router();


// get all workouts
router.get("/",(req,res)=>{
    res.json({msg: "Get all workouts"})
});

//get a single workout
router.get("/:id",(req,res)=>{
    res.json({msg: "get a single workouts"});
});

router.post("/",(req,res)=>{
    res.json({msg: "post a workouts"});
});

router.delete("/:id",(req,res)=>{
    res.json({msg: "delete a workouts"});
});

router.patch("/:id",(req,res)=>{
    res.json({msg: "update a workoutes"});
})


module.exports =router;