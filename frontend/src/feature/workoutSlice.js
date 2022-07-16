import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    id: null,
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
        },
        updateWorkout: (state,action)=>{

            const {_id,title,load,reps} = action.payload
            state.status = 'loading';
            try{
                state.data.filter((workout)=>{
                    return workout._id === _id;
                }).forEach((workout)=>{
                    workout.title = title;
                    workout.load = load;
                    workout.reps = reps;
                    workout = action.payload
                });
                state.status = 'success';
            }catch(e){
                console.log('updateWorkout',e);
                state.status = 'error';
            }finally{
                state.status = 'idle';
            }
         
        },
        setWorkoutId: (state,action)=>{
            state.id = action.payload;
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

export const getWorkoutId = (state) =>state.workout.id;

export const {setWorkout,deleteWorkout,setStatus,setWorkoutId,updateWorkout} = workoutSlice.actions
export default workoutSlice.reducer;