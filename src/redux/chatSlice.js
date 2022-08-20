import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    chatList: [],
    chatLoading: false,
    chatSwitch: false,
    headerToggle: false,
    showGroupModal: false,
    chatObject: null,
    socketId: null,
    notifications: [],
    popImg: null,
    showImg: false,
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChats: (state, action)=>{
            state.chatList = action.payload
        },
        setChatLoad: (state, action)=>{
            state.chatLoading = action.payload
        },
        setChatSwitch: (state, action)=>{
            state.chatSwitch = action.payload
        },
        addChatList: (state, action)=>{
            state.chatList.unshift(action.payload)
        },
        setChatObject: (state, action)=>{
            state.chatObject = action.payload
        },
        setHeaderToggle: (state, action)=>{
            state.headerToggle = action.payload
        },
        setShowGroupModal: (state, action)=>{
            state.showGroupModal = action.payload
        },
        setSocketChat: (state, action)=>{
            state.socketId = action.payload
        },
        setChatMessages: (state, action)=>{
            state.chatMessages = action.payload
        },
        // addChatMessage: (state, action)=>{
        //     state.chatMessages.push(action.payload)
        // },
        setNotifications: (state, action)=>{
            state.notifications = [...state.notifications, action.payload]
        },
        setPopImg: (state, action)=>{
            state.popImg = action.payload
        },
        setShowImg: (state, action)=>{
            state.showImg = action.payload
        }
    }
})

export const {setChats, startChatLoad,
        setSocketChat,
        removeChat,
        setChatObject,
        addChatList,
        setHeaderToggle,
        setShowGroupModal,
        setChatMessages,
        // addChatMessage,
        setNotifications,
        updateChat,
        setPopImg,
        setChatLoad,
        setShowImg,
        setChatSwitch
        } = chatSlice.actions

export default chatSlice.reducer