import {configureStore} from '@reduxjs/toolkit';
import workoutReducer from '../feature/workoutSlice';

export const store = configureStore({
    reducer: {
        workout: workoutReducer
    }
});