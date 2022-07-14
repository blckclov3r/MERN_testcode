import React from 'react'
import axios from 'axios';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import {useSelector, useDispatch} from 'react-redux';
import { getUserAction, setUserAction } from '../feature/workoutSlice';


export default function Home() {

    const [workouts, setWorkouts] = React.useState(null);
    const user_action = useSelector(getUserAction);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(setUserAction('idle'));
        const fetchWorkouts = async () => {
            const response = await axios.get('/api/workouts')
            .then(res=>{
               return res?.data
            });
            setWorkouts(response);
        }
        fetchWorkouts();
    }, [user_action,dispatch]);


    return (
        <div className="home my-4">
            <div className="container">
                <div className='row'>
                    <div className="col-8">
                        <h2>Home</h2>
                        {
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
