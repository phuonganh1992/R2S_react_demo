import api from "./api";

const login = (username, password) => {
  const data = {
    // "username":username,
    // "password":password
    //Trong JS khi trái phải giống nhau thì có thể bỏ phía bên trái
    username,
    password,
  };

  return api.post(api.url.login, data).then((res) => res.data);
};

const userService = {
  login,
};

export default userService;
