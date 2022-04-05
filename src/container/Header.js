import React,{useEffect, useState} from "react";
import {Link} from "react-router-dom";


const Header = () => {
  return(
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Student Management
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/de/major">Major</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Student</a>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="#">welcome to ... </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#"><i className="bi-box-arrow-right"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
  );
}

export default Header;