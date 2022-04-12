import api from "./api";

const list = () => api.get(api.url.major);

const get = (id) => api.get(`${api.url.major}/${id}`);

const add = (data) => api.post(api.url.major, data);

const update = (id, data) => api.put(`${api.url.major}/${id}`, data);

const remove = (id) => api.delete(`${api.url.major}/${id}`);

const majorService = {
  list,
  get,
  add,
  update,
  delete: remove,
};

export default majorService;
