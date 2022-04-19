import api from "./api";

const list = () => api.get(api.url.student);

const get = (id) => api.get(`${api.url.student}/${id}`);

// const add = (data) => api.post(`${api.url.student}`, data);
const add = (data) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return api.post(api.url.student, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// const update = (id, data) => api.put(`${api.url.student}/${id}`, data);

const update = (id, data) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return api.post(`${api.url.student}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const remove = (id) => api.delete(`${api.url.student}/${id}`);

const getAvataUrl = (id) => api.get(`${api.url.student}/avatar-url/${id}`);
const getAvataBase64 = (id) =>
  api.get(`${api.url.student}/avatar-base64/${id}`);
const getAvatar = (id) =>
  api.get(`${api.url.student}/avatar/${id}`, {
    responseType: "blob",
  });

const downloadAvatar = (id) =>
  api.get(`${api.url.student}/download-avatar/${id}`, {
    responseType: "blob",
  });

const studentService = {
  list,
  get,
  getAvataUrl,
  getAvataBase64,
  getAvatar,
  add,
  update,
  downloadAvatar,
  delete: remove,
};

export default studentService;
