import {createSlice} from '@reduxjs/toolkit'


const logged = localStorage.getItem('secretToken')

const initialState = {
    user: null,
    isLogged: Boolean(logged),
    isLoading: false,
    chatId: null,
    userList: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action)=>{
            state.isLogged = true
            state.user = action.payload
        },
        loginStart: (state)=>{
            state.isLogged = false
            state.isLoading = true
        },
        loginFailure: (state)=>{
            state.isLogged = false
            state.isLoading = false
        },
        setUser: (state, action)=>{
            state.user = action.payload
        },
        setChatId: (state, action)=>{
            state.chatId = action.payload
        },
        logout: (state)=>{
            state.user = null
            state.isLogged = false
            state.chatId = null
        },
        setUsers: (state, action)=>{
            state.userList = action.payload
        }
    }
})

export const {login, setUser, setChatId, logout, setUsers} = userSlice.actions

export default userSlice.reducer