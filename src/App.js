import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './App.css';
import ChatView from './page/ChatView';
import Homepage from './page/Homepage';
import { setUser } from './redux/userSlice';
import { makeRequest } from './utils/apiCalls';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  const dispatch = useDispatch()
  const {isLogged} = useSelector(state=> state.user)
  const {socketId} = useSelector(state=> state.chat)
  

  


  useEffect(()=>{
    const fetchUser = async()=>{
        try {
          const res = await makeRequest.get('/user/getUser')
          dispatch(setUser(res.data))
        } catch (error) {
          // if(error.response.data.message==='jwt malformed'){
          //   logOUT()
          // }
        }
    }
    if(isLogged){
        fetchUser()
    }
  },[dispatch, socketId, isLogged])



  return (
    <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route path='/' exact element={<Homepage />} />
      <Route path='/chat' exact element={<PrivateRoute isLogged={isLogged}><ChatView /></PrivateRoute>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
