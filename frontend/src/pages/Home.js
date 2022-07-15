import React from 'react'
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import {useSelector} from 'react-redux';
import { getFetchWorkout } from '../feature/workoutSlice';
export default function Home() {


  const workouts = useSelector(getFetchWorkout);



    return (
        <div className="home my-4">
            <div className="container">
                <div className='row'>
                    <div className="col-8">
                        <h2>List</h2>
                        { workouts &&
                            workouts?.map((workout) => (
                                <WorkoutDetails key={workout._id} workout={workout} />
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
    )
}
