import {createSlice} from '@reduxjs/toolkit'


const initialState = {
  rightView: null,
  leftView: "chat",
  showTheme: false,
  colorPallete: "",
  themeBg: {
    bg: 'black',
    color: 'white'
  },
//   themeBg: "#202c33",
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setRightView: (state, action)=>{
            state.rightView = action.payload
        },
        setLeftView: (state, action)=>{
            state.leftView = action.payload
        },
        setShowTheme: (state, action)=>{
            state.showTheme = action.payload
        },
        setColorPallete: (state,action)=>{
            state.colorPallete = action.payload
        },
        setStatusMode: (state)=>{
            state.statusMode = !state.statusMode
        },
        setThemeBg: (state, action)=>{
            state.themeBg = action.payload
        }
    }
})

export const {setRightView, setLeftView, setThemeBg,setShowTheme, setColorPallete, setStatusMode} = appSlice.actions

export default appSlice.reducer