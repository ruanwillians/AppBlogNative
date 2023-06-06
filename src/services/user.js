import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signInUser = async (email, password) => {
  return await api.post('/login', {
    email,
    password,
  })
    .then((response) => {
      if (response.status === 200) {
        return response
      }
      return null
    })
    .catch((error) => {
      return error
    })
}

export const getUserId = async (id) => {
  const token = await AsyncStorage.getItem('token');
  return await api.get(`/users/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response
      }
    })
    .catch((err) => {
      return err
    });
}
export const registerUser = async (username, email, password) => {
  const user = {
    username,
    email,
    password,
  }
  return await api.post(`/users`, user, {
  })
    .then((response) => {
      if (response.status === 201) {
        return response
      }
    })
    .catch((err) => {
      return err
    });
}
