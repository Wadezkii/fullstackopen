import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
  return axios.get(baseUrl).then((response) => response.data)
}

const createPerson = (newName, newNum) => {
  const nameObject = {
    content: newName,
    number: newNum,
  }
  return axios.post(baseUrl, nameObject).then((response) => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then((response) => response.data)
}

const updatePerson = (id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson).then(response => response.data);
  };


export  {
  getAllPersons,
  createPerson,
  deletePerson,
  updatePerson
}