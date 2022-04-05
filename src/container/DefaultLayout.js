import React, {useEffect, useState} from "react";
import Header from "./Header";
import Home from "../pages/Home";
import {Routes, Route} from "react-router-dom";
import Login from "../pages/Login";
import Major from "../pages/Major";
import myRoutes from "../my-routes";

const DefaultLayout = () => {
    return (
        <>
            <Header/>
            <Routes>
                {myRoutes.map((route, idx) => (
                    <Route key={idx} path={route.path} element={route.component}/>
                ))}
            </Routes>
        </>

    );
}
export default DefaultLayout;