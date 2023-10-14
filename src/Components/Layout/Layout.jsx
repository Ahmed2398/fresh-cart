import React from 'react';
import Navbar from "../Navbar/Navbar";
import {Outlet} from "react-router-dom";
import { Offline } from "react-detect-offline";

import AuthContextProvider from "../../Contexts/AuthContext";
import {ReactQueryDevtools} from "react-query/devtools";
import {QueryClient, QueryClientProvider} from "react-query";
import Footer from "../Footer/Footer";
import Products from "../Products/Products";

const Layout = () => {
    let queryClient = new QueryClient()

    return (
        <>
            <QueryClientProvider client={queryClient}>
            <AuthContextProvider>

            <Navbar/>
                <div className="container mt-5 py-5">
                    <Outlet />
                </div>
                <Offline>
                    <div className="offline">
                        <p className='mb-0'>You're offline right now. Check your connection.</p>
                    </div>
                </Offline>
                <Footer />
            </AuthContextProvider>
                {/*<Products/>*/}
                <ReactQueryDevtools position='bottom-right'/>
            </QueryClientProvider>
        </>
    );
};

export default Layout;
