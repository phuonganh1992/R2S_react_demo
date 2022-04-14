import "./App.css";
import React from "react";
import DefaultLayout from "./container/DefaultLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import LoadingBar from "react-redux-loading-bar";

function App() {
  return (
    <>
      <div className="position-absolute w-100" style={{ zIndex: 100 }}>
        <LoadingBar
          updateTime={100}
          className="bg-danger"
          style={{ height: "2px" }}
        />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<DefaultLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
