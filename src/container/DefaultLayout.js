import React from "react";
import Header from "./Header";
import { Routes, Route, Navigate } from "react-router-dom";
import myRoutes from "../my-routes";
import { useSelector } from "react-redux";

const DefaultLayout = () => {
  const isLoggerIn = useSelector((state) => state.auth.isLoggerIn);
  return (
    <>
      {!isLoggerIn ? (
        <Navigate to="/login" />
      ) : (
        <>
          <Header />
          <Routes>
            {myRoutes.map((route, idx) => (
              <Route key={idx} path={route.path} element={route.component} />
            ))}
          </Routes>
        </>
      )}
    </>
  );
};
export default DefaultLayout;
