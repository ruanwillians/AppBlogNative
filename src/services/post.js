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
            return response
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

export const createPost = async (title, content, image) => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');
    const post = {
        title,
        content,
        image,
        userId,
    };

    return await api.post(`/posts/`, post, {
        headers: {
            Authorization: `${token}`,
        },
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

export const editPost = async (id, title, content, image) => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');
    const post = {
        title,
        content,
        image,
        userId,
    };

    return await api.patch(`/posts/${id}`, post, {
        headers: {
            Authorization: `${token}`,
        },
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

export const deletePost = async (id) => {
    const token = await AsyncStorage.getItem('token');
    return await api.delete(`/posts/${id}`, {
        headers: {
            Authorization: `${token}`,
        },
    })
        .then((response) => {

            return response

        })
        .catch((err) => {
            return err
        });
}




