import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import ChatView from "./page/ChatView";
import Homepage from "./page/Homepage";
import Login from "./page/Login";
import NotFound from "./page/NotFound";
import StatusPage from "./page/StatusPage";
import { setIsConnected, setUser, setUserFriends, setUserRequest } from "./redux/userSlice";
import { makeRequest } from "./utils/apiCalls";
import PrivateRoute from "./utils/PrivateRoute";
import AOS from "aos";
import "aos/dist/aos.css";
import Starting from "./page/Starting";

// const END_POINT = process.env.REACT_APP_BACKEND_URL;


function App({socket}) {
  const dispatch = useDispatch();
  const { isLogged, user } = useSelector((state) => state.user);
  // const [socket, setSocket] = useState(()=> io(END_POINT));

  useEffect(() => {
    const initSocket = () => {
      socket && socket.emit("setup", user);
      dispatch(setIsConnected(true))
      //   setSocket(sock);
    };
    user && initSocket();
  }, [user, dispatch, socket]);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await makeRequest.get("/user/getUser");
        dispatch(setUserRequest(res.data.request));
        dispatch(setUserFriends(res.data.friends))
        // console.log(res.data.friends, 'our user')
        dispatch(setUser(res.data));
      } catch (error) {}
    };
    if (isLogged) {
      fetchUser();
    }
  }, [dispatch, isLogged]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/starting" exact element={<Starting />} />
        <Route path="/signup" exact element={<Login />} />
        {/* <Route path='/status' exact element={<StatusPage />} /> */}
        <Route
          path="status"
          exact
          element={
            <PrivateRoute isLogged={isLogged}>
              <StatusPage />
            </PrivateRoute>
          }
        />
        <Route
          path="chat"
          exact
          element={
            <PrivateRoute isLogged={isLogged}>
              <ChatView socket={socket} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
