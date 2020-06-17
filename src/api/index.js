import {API_URL} from '../config';

export const fetchCards = async (id) => {
  return await fetch(`${API_URL}/cards?columnId=${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((data) => []);
};

export const addCard = async (data) => {
  return await fetch(`${API_URL}/cards`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((data) => []);
};

export const deleteCard = async (id) => {
    return await fetch(`${API_URL}/cards/${id}`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .catch((data) => []);
  };
  