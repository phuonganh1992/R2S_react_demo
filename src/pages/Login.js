import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import userService from "../services/userService";

const Login = (props) => {
  const [message, setMessage] = useState("");
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    userService.login(username, password).then((res) => {
      console.log(res);
      if (res.errorCode > 0) {
        setMessage(res.message);
      } else {
        setMessage(res.message);
      }
    });
    // if (username === "admin") {
    //     setMessage({message: "Good"})
    //     setMessage("Good!")
    // } else {
    //     setMessage({message: "bad"})
    //     setMessage("Bad!")
    // }
    // console.log(message)
  };
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <>
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-sm-8 col-lg-5">
            <div className="card bg-primary">
              <div className="card-header text-white">
                <h4 className="card-title mb-0">
                  <i className="bi-grid-3x3-gap-fill"></i> Login
                </h4>
              </div>
              <div className="card-body bg-white rounded-bottom">
                <p className="text-center text-danger">{message}</p>
                <form onSubmit={formSubmitHandler}>
                  <Input
                    inputRef={usernameRef}
                    label="Username"
                    id="txtUsername"
                    type="text"
                    labelSize="3"
                    autoComplete="off"
                  ></Input>
                  <Input
                    inputRef={passwordRef}
                    label="Password"
                    id="txtPassword"
                    type="password"
                    labelSize="3"
                  ></Input>
                  <Input
                    label="Note"
                    id="txtNote"
                    type="password"
                    labelSize="3"
                    rows="3"
                  ></Input>
                  <div className="row">
                    <div className="offset-sm-3 col-auto">
                      <button type="submit" className="btn btn-primary">
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
