import React from 'react'
import axios from 'axios';

import {useDispatch} from 'react-redux';
import { setUserAction } from '../feature/workoutSlice';


export default function WorkoutDetails({workout}) {
    const dispatch = useDispatch();
    const deleteWorkoutBtn = async () => {
        await axios.delete('/api/workouts/'+workout._id);
        dispatch(setUserAction('delete'));
    }

  return (
    <div className="workout-details my-3 p-3 shadow-sm bg-white">
        <h3>{workout.title}</h3>
        <p className='mb-1'><strong>Load (kg): </strong>{workout.load}</p>
        <p className='mb-1'><strong>Reps: </strong>{workout.reps}</p>
        <p className='mb-3'><strong>Date Created: </strong>{workout.createdAt}</p>
        <div className='d-flex justify-content-end'>
        <button className='btn btn-danger' onClick={deleteWorkoutBtn}>Delete</button>
        </div>
    </div>
  )
}
