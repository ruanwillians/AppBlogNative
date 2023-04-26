import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Title } from '../components/index';

const Create = ({ navigation }) => {


    useEffect(() => {
        const verifyToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                navigation.navigate('Home');
            }
        };
        verifyToken();
    }, []);
    return (
        <>
            <Title>Create</Title>
        </>

    );
}

export default Create