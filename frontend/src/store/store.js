import {configureStore} from '@reduxjs/toolkit'
import studentReducer from './features/studentsSlice.js'
import authenticationReducer from './features/authentication.js';
const store=configureStore({
    reducer:{
        students:studentReducer,
        authentication:authenticationReducer
    }
})

export default store;