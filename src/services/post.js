import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";


export const getPost = async () => {
    const token = await AsyncStorage.getItem('token');
    return await api.get(`/posts`, {
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

export const getPostId = async (id) => {
    const token = await AsyncStorage.getItem('token');
    return await api.get(`/posts/${id}`, {
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


