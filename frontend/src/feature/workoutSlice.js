import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   
    user_action: 'idle' // create, update ,delete
}

export const workoutSlice = createSlice({
    name: "workout",
    initialState,
    reducers: {
        setUserAction: (state,action)=>{
            state.user_action = action.payload
        }
    }
});



export const getUserAction = (state) => state.workout.user_action;

export const {setUserAction} = workoutSlice.actions
export default workoutSlice.reducer;