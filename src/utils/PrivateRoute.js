import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({isLogged, children}) => {
    const navigate = useNavigate()

    useEffect(()=>{
        if(!isLogged){
            return navigate('/')
        }
    },[isLogged,navigate])
     
    return children
}

export default PrivateRoute