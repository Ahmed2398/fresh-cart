import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../Contexts/AuthContext";
import Login from "../Login/Login";

const ProtectedRoute = ({children}) => {
    let navigate = useNavigate();
    let [isUserLoggedIn, setIsUserLoggedIn] = useState(AuthContext)

    if(isUserLoggedIn) {
        return children
    }else {
        return <Login/>
    }
};

export default ProtectedRoute;