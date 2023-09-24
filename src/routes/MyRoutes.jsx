import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile"
import Edit from "../pages/Edit";

export default function MyRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Profile/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/edit" element={<Edit/>}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    )
}