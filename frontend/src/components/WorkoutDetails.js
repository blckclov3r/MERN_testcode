import React from 'react'
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkout, getStatus, setStatus } from '../feature/workoutSlice';

import { formatDistanceToNow } from 'date-fns'

export default function WorkoutDetails({ workout,updateWorkoutBtn }) {

  const dispatch = useDispatch();
  const status = useSelector(getStatus);

  const deleteWorkoutBtn = async () => {

    dispatch(setStatus('loading'));

    await axios.delete('/api/workouts/' + workout._id)
      .then(() => {
        dispatch(deleteWorkout(workout._id));
        dispatch(setStatus('success'));
      }).finally(() => {
        dispatch(setStatus('idle'));
      })

  }

  return (
    <div className="workout-details my-3 p-3 shadow-sm bg-white">
      <h3>{workout.title}</h3>
      <p className='mb-1'><strong>Load (kg): </strong>{workout.load}</p>
      <p className='mb-1'><strong>Reps: </strong>{workout.reps}</p>

      <div className='d-flex justify-content-between align-items-end'>
        <p className='mb-0'>
          {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
        </p>
        <div>
        <button className='btn btn-warning mx-2' onClick={()=>{updateWorkoutBtn(workout._id)}}>Update</button>
        <button className='btn btn-danger' onClick={deleteWorkoutBtn} disabled={status === 'loading'}>Delete</button>
        </div>
      </div>

    </div>
  )
}
