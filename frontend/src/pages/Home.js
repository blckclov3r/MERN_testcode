import React, { useRef } from 'react'
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import {useDispatch, useSelector} from 'react-redux';
import { getFetchWorkout, getStatus, getWorkoutId, setWorkoutId, updateWorkout } from '../feature/workoutSlice';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
export default function Home() {

  const dispatch = useDispatch();
  const workoutId = useSelector(getWorkoutId)

  const [workout, setWorkout] = React.useState(null);
  
  const titleRef = useRef();
  const loadRef = useRef();
  const repsRef = useRef();

  const workouts = useSelector(getFetchWorkout);
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);

    const status = useSelector(getStatus);

    const updateWorkoutBtn = async (id) =>{
        await axios.get('/api/workouts/' + id)
        .then((res) => {
            setWorkout(res?.data)
            setShow(true)
            dispatch(setWorkoutId(id))
        });
    }

    const updateFormWorkoutBtnSubmit = async (e) =>{
        e.preventDefault();

        const title = titleRef.current.value;
        const load = loadRef.current.value;
        const reps = repsRef.current.value;
        const workout = {title, load, reps}
     
        await axios.patch('/api/workouts/' + workoutId,workout)
        .then(() => {
            setShow(false)
            dispatch(updateWorkout({_id: workoutId,title,load,reps}))
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(()=>{
            dispatch(setWorkoutId(''));
        })
    }

    return (
        <>
            <div className="home my-4">
            <div className="container">
                <div className='row'>
                    <div className="col-8">
                        <h2>List</h2>
                        { workouts &&
                            workouts?.map((workout) => (
                                <WorkoutDetails key={workout._id} workout={workout} updateWorkoutBtn={updateWorkoutBtn} />
                            ))
                        }
                    </div>
                    <div className="col-4">
                         <h2>Add New</h2>
                        <WorkoutForm />
                    </div>
                </div>
            </div>
        </div>
        <Modal show={show} onHide={handleClose}     backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body>
      
            <div className='form-group mb-3'>
                <label className='form-label'>Title</label>
                <input type='text' className='form-control' defaultValue={workout?.title} ref={titleRef} required   />
            </div>
            <div className='form-group mb-3'>
                <label className='form-label'>Load</label>
                <input type='number' className='form-control' defaultValue={workout?.load} ref={loadRef} required  />
            </div>
            <div className='form-group mb-3'>
                <label className='form-label'>Reps</label>
                <input type='number' className='form-control' defaultValue={workout?.reps} ref={repsRef} required  />
            </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={status === 'loading'} onClick={updateFormWorkoutBtnSubmit}>
            Update
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
        </>
    )
}
