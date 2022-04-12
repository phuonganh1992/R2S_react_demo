import api from "./api";

const list = () => api.get(api.url.instructor);

const get = (id) => api.get(`${api.url.instructor}/${id}`);

const add = (data) => api.post(`${api.url.instructor}`, data);

const update = (id, data) => api.put(`${api.url.instructor}/${id}`, data);

const remove = (id) => api.delete(`${api.url.instructor}/${id}`);

const instructorService = {
  list,
  get,
  add,
  update,
  delete: remove,
};

export default instructorService;
