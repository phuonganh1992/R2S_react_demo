import './App.css';
import React from "react";
import DefaultLayout from "./container/DefaultLayout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/de/*" element={<DefaultLayout/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
