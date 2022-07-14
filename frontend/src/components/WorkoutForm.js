import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserAction } from '../feature/workoutSlice';
export default function WorkoutForm() {

  const [title,setTitle] = useState('');
  const [load,setLoad] = useState('');
  const [reps,setReps] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleWorkoutSubmit = async (evt) =>{
    evt.preventDefault();
    
    const workout = {title, load, reps}

    try{
 

        await axios.post('/api/workouts/',workout)
        .then(res => {
            dispatch(setUserAction('create'));
            return res?.data
        });

  

        setTitle('')
        setLoad('')
        setReps('')
        setError(null);

    }catch(err){
        setError(err.message)
        return;
    }

   
  }

  return (
    <>
        <form onSubmit={handleWorkoutSubmit}>
            <div className='form-group mb-3'>
                <label className='form-label'>Title</label>
                <input type='text' className='form-control' value={title}  onChange={(e)=>{setTitle(e.target.value)}} placeholder='Title'  />
            </div>
            <div className='form-group mb-3'>
                <label className='form-label'>Load</label>
                <input type='number' className='form-control' value={load}  onChange={(e)=>setLoad(e.target.value)} placeholder='Load'  />
            </div>
            <div className='form-group mb-4'>
                <label className='form-label'>Reps</label>
                <input type='number' className='form-control' value={reps}  onChange={(e)=>setReps(e.target.value)} placeholder='Reps'  />
            </div>
            <div className='d-flex justify-content-end'>
            <button className='btn btn-primary'>Submit</button>
            </div>
        </form>
        <br/>
        {<div className='error'>{error}</div>}
    </>
  )
}
