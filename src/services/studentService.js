import api from "./api";

const list = () => api.get(api.url.student);

const get = (id) => api.get(`${api.url.student}/${id}`);

const add = (data) => api.post(`${api.url.student}`, data);

const update = (id, data) => api.put(`${api.url.student}/${id}`, data);

const remove = (id) => api.delete(`${api.url.student}/${id}`);

const studentService = {
  list,
  get,
  add,
  update,
  delete: remove,
};

export default studentService;
