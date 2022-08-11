import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    messageLoad: false,
    singleLoad: false,
    selectedMessage: null,
    repliedMessage: null,
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
        },
        setRepliedMessage: (state, action)=>{
            state.repliedMessage = action.payload
        },
    }
})

export const {setMessageLoad, setIncomingCall, setSingleLoad, setPeerInstance, setPeerId, setSelectedMessage, setRepliedMessage} = messageSlice.actions

export default messageSlice.reducer