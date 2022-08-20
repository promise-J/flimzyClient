import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  callMode: false,
  partnerId: null,
  peer: null,
  receivingCall: false,
  caller: null,
  callSignal: null
};

const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    setCallMode: (state, action)=>{
        state.callMode = action.payload
    },
    setPartnerId: (state, action)=>{
        state.partnerId = action.payload
    },
    setReceivingCall: (state, action)=>{
        state.receivingCall = action.payload
    },
    setCaller: (state, action)=>{
        state.caller = action.payload
    },
    setCallSignal: (state, action)=>{
        state.callSignal = action.payload
    },
    setPeer: (state, action)=>{
        state.peer = action.payload
    }
  },
});

export const {
 setCallMode,
 setPartnerId,
 setPeer,
 setCallSignal,
 setCaller,
 setReceivingCall
} = callSlice.actions;

export default callSlice.reducer;
