import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Input from "../components/Input";
import userService from "../services/userService";
import ActionTypes from "../store/reducers/actions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = (props) => {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const usernameRef = React.useRef();
  const passwordRef = React.useRef();

  const handleLoginAction = (token, userInfo) => {
    dispatch({
      type: ActionTypes.LOGIN_USER,
      token: token,
      currentUser: userInfo,
    });
  };

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
        handleLoginAction(res.data.accessToken, res.data);
        navigate("/home");
      }
    });
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
                  <i className="bi-grid-3x3-gap-fill"></i>
                  {t("loginSystem")}
                </h4>
              </div>
              <div className="card-body bg-white rounded-bottom">
                <p className="text-center text-danger">{message}</p>
                <form onSubmit={formSubmitHandler}>
                  <Input
                    inputRef={usernameRef}
                    label={t("username")}
                    id="txtUsername"
                    type="text"
                    labelSize="3"
                    autoComplete="off"
                  ></Input>
                  <Input
                    inputRef={passwordRef}
                    label={t("password")}
                    id="txtPassword"
                    type="password"
                    labelSize="3"
                  ></Input>
                  <div className="row">
                    <div className="offset-sm-3 col-auto">
                      <button type="submit" className="btn btn-primary">
                        {t("signIn")}
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
