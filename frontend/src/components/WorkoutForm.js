import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus, setStatus, setWorkout } from '../feature/workoutSlice';
export default function WorkoutForm() {

  const [title,setTitle] = useState('');
  const [load,setLoad] = useState('');
  const [reps,setReps] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const status = useSelector(getStatus);

  const handleWorkoutSubmit = async (evt) =>{
    evt.preventDefault();

    const workout = {title, load, reps}
   
        dispatch(setStatus('loading'));
        await axios.post('/api/workouts/',workout).then((res)=>{
            dispatch(setWorkout(
                res.data
            ));
            dispatch(setStatus('success'));
            setTitle('')
            setLoad('')
            setReps('')
            setError(null);
        }).catch((err)=>{
            dispatch(setStatus('error'));
            setError(err);
        }).finally(()=>{
            dispatch(setStatus('idle'));
        })
  }
  const validate = [title,load,reps].every(Boolean);

  return (
    <>
        <form onSubmit={handleWorkoutSubmit}>
            <div className='form-group mb-3'>
                <label className='form-label'>Title</label>
                <input type='text' className='form-control' value={title}  onChange={(e)=>{setTitle(e.target.value)}} placeholder=''  />
            </div>
            <div className='form-group mb-3'>
                <label className='form-label'>Load</label>
                <input type='number' className='form-control' value={load}   onChange={(e)=>setLoad(e.target.value)} placeholder=''  />
            </div>
            <div className='form-group mb-4'>
                <label className='form-label'>Reps</label>
                <input type='number' className='form-control' value={reps}   onChange={(e)=>setReps(e.target.value)} placeholder=''  />
            </div>
            <div className='d-flex justify-content-end'>
            <button className='btn btn-primary' disabled={!validate || status === 'loading'} >Add +</button>
            </div>
        </form>
        <br/>
        {<div className='error'>{error}</div>}
    </>
  )
}
