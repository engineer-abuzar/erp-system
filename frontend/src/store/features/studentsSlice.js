import { createSlice } from "@reduxjs/toolkit";

const studentSlice=createSlice({
    name:"students",
    initialState:[],
    reducers:{
        displayStudents:(state,action)=>{
         
            return action.payload
        }


    }

})
export const {displayStudents}=studentSlice.actions;
export default studentSlice.reducer;
