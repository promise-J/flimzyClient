import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    messageLoad: false,
    singleLoad: false,
    selectedMessage: null
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessageLoad: (state, action)=>{
            state.messageLoad = action.payload
        },
        setSingleLoad: (state, action)=>{
            state.singleLoad = action.payload
        },
        setSelectedMessage: (state, action)=>{
            state.selectedMessage = action.payload
        }
    }
})

export const {setMessageLoad, setSingleLoad, setSelectedMessage} = messageSlice.actions

export default messageSlice.reducer