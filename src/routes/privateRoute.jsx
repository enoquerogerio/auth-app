import React from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export function PrivateRoute({ children }){
    const userStored = JSON.parse(localStorage.getItem('user'))
    const user = userStored ? userStored : null
    try {
        if(user){
            const decodedToken = jwtDecode(user.token);
            const expirationTime = decodedToken.exp * 1000
            const currentTime = Date.now();
            return expirationTime > currentTime ? children : < Navigate to="/login" />
        }else{
            return < Navigate to="/login" />
        }
        
    } catch (error) {
        
    }
    return 
}

