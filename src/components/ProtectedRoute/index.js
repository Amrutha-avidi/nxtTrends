import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    useEffect(()=>{
        const jwtToken = Cookies.get('jwt_token');

        if (jwtToken === undefined) {
            return navigate("/login")
        }
    },[navigate])

    // If the token is present, allow access to the route
    return children;
};

export default ProtectedRoute;
