import axios from "axios";
import store from "./../store/index";

const url = {
  baseUrl: "https://restfulapi.dnd-group.net/api",
  login: "/login",
  major: "/majors",
  instructor: "/instructors",
  student: "/students",
};

const instance = axios.create({
  baseURL: url.baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use((request) => {
  const state = store.getState();
  if (state.auth.token) {
    request.headers.Authorization = `Bearer ${state.auth.token}`;
  }
  console.log("before sending to server", request);
  return request;
});
instance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log(err);
    if (!err.response) {
      window.location.href = "/no-internet";
    } else {
      switch (err.response.status) {
        case 401:
          window.location.href = "/login";
          break;
        case 403:
          window.location.href = "/no-permission";
          break;
        default:
          break;
      }
      return Promise.reject(err);
    }
  }
);

const api = {
  url,
  instance,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
};

export default api;
