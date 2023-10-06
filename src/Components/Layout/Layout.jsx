import React from 'react';
import Navbar from "../Navbar/Navbar";
import {Outlet} from "react-router-dom";
import AuthContextProvider from "../../Contexts/AuthContext";

const Layout = () => {
    return (
        <>
            <AuthContextProvider>

            <Navbar/>
            <Outlet></Outlet>
            </AuthContextProvider>
        </>
    );
};

export default Layout;
