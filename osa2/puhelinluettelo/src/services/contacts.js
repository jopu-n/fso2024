import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getContacts = () => {
  return axios.get(baseUrl).then((res) => res.data);
};
const createContact = (newObject) => {
  return axios.post(baseUrl, newObject).then((res) => res.data);
};

const deleteContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
};

const updateContact = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then((res) => res.data);
};

export default { getContacts, createContact, deleteContact, updateContact };
