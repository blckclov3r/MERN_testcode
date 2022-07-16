const Workout = require('../models/WorkoutModel');
const mongoose = require('mongoose')

// get all workout
const getWorkouts = async (req,res)=>{
    const workouts = await Workout.find({}).sort({createdAt: -1}); //the newest one is on the top
    res.status(200).json(workouts)
}

// get a single workout
const getSingleWorkouts = async (req,res) =>{
    const {id} = req.params;

    
    if(!mongoose.Types.ObjectId.isValid (id)){
        return res.status(404).json({err: 'No such workout'})
    }

    const workout = await Workout.findById(id);

    if(!workout) {
        return res.status(400).json({err: 'No such workout'})
    }

    return res.status(200).json(workout);
}


// create a new workout
const createNewWorkout = async (req,res) => {
    const {title, load, reps} = req.body;
    const workout = await Workout.create({title, load, reps});
    res.status(200).json(workout);
}

// delete a workout
const deleteWorkout = async (req,res)=>{
    const {id} = req.params;

    try{
        if(!mongoose.Types.ObjectId.isValid (id)){
            return res.status(404).json({err: 'No such workout to delete'})
        }
        const workout = await Workout.findOneAndDelete({_id: id});
        // const workout = await Workout.findByIdAndDelete(req.params.id);
        if(!workout) {
            return res.status(400).json({err: 'No such workout'})
        }
        return res.status(200).json(workout);
    }catch(err){
        res.status(400).json({error: err})
    }
}

// update a workout
const updateWorkout = async (req,res)=>{
    const {id} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({err: 'No such workout to update'})
        }
     
        const workout = await Workout.findOneAndUpdate({_id: id},{
            // second argument === ...req.body
            ...req.body
            // title: req.body.title,
            // preps: req.body.preps,
            // load: req.body.load
            
        });
        if(!workout){
            return res.status(400).json({err: 'No such workout'});
        }
        return res.status(200).json(workout);
    }catch(err){
        res.status(400).json({error: err.message})
    }
}


module.exports = {
    getWorkouts,
    createNewWorkout,
    getSingleWorkouts,
    deleteWorkout,
    updateWorkout
}