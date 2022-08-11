import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    allStatus: [],
    currentStatusSlide: null,
    statusIndex: 0,
    currentStatusArray: [],
    createStatus: false
}

const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setAllStatus: (state, action)=>{
            state.allStatus = action.payload
        },
        setCurrentStatusSlide: (state, action)=>{
            state.currentStatusSlide = action.payload
        },
        setStatusIndex: (state, action)=>{
            state.statusIndex = action.payload
        },
        setCurrentStatusArray: (state, action)=>{
            state.currentStatusArray = action.payload
        },
        createStatus: (state, action)=>{
            state.createStatus = action.payload
        }
    }
})

export const {
          setAllStatus,
          setCurrentStatusSlide,
          setStatusIndex,
          setCurrentStatusArray,
          createStatus
        } = statusSlice.actions

export default statusSlice.reducer