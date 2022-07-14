const express = require('express');
const {
    createNewWorkout,
    getSingleWorkouts,
    getWorkouts,  
    deleteWorkout,
    updateWorkout
} = require('./../controllers/workController')

const router = express.Router();


// get all workouts
router.get("/",getWorkouts)

//get a single workout
router.get("/:id",getSingleWorkouts);
// POST a new workout

router.post('/', createNewWorkout);

router.delete("/:id",deleteWorkout);

router.patch("/:id",updateWorkout);

module.exports = router;