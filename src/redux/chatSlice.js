import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    chatList: [],
    chatLoading: true,
    headerToggle: false,
    showGroupModal: false,
    chatObject: null,
    socketId: null,
    // chatMessages: [],
    notifications: [],
    popImg: null,
    showImg: false
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChats: (state, action)=>{
            state.chatList = action.payload
        },
        startChatLoad: (state)=>{
            state.chatLoading = true
        },
        endChatLoad: (state)=>{
            state.chatLoading = false
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
            state.notifications.push(action.payload)
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
        endChatLoad,
        setChatObject,
        addChatList,
        setHeaderToggle,
        setShowGroupModal,
        setChatMessages,
        // addChatMessage,
        setNotifications,
        updateChat,
        setPopImg,
        setShowImg
        } = chatSlice.actions

export default chatSlice.reducer