import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: null,
    status: null,
}
const namespace = 'workout';
export const fetchWorkout = createAsyncThunk(`${namespace}/fetchGithub`,async()=>{
    try{
        const response = await axios.get('/api/workouts')
        return response?.data;
    }catch(err){
        console.log('fetchWorkout',err);
    }
});  

export const workoutSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        setStatus: (state,action)=>{
            state.status = action.payload
        },
        setWorkout: (state,action)=>{
            state.data = [action.payload,...state.data];
        },
        deleteWorkout: (state,action)=>{
            const workouts = state.data?.filter((workout)=>workout._id !== action.payload);
            state.data = workouts;
        }
    },
    extraReducers(builder){
        builder.addCase(fetchWorkout.pending,(state,action)=>{
            state.status = 'loading';
        });
        builder.addCase(fetchWorkout.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.status = 'idle';
        });
        builder.addCase(fetchWorkout.rejected,(state,action)=>{
            state.status = 'error';
        });
    }
});



export const getFetchWorkout = (state) => state.workout.data;

export const getStatus = (state) =>state.workout.status;

export const {setWorkout,deleteWorkout,setStatus} = workoutSlice.actions
export default workoutSlice.reducer;