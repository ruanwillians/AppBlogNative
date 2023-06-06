import React, { useContext } from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { Title, Button, Text, Spacer, Box } from '../../components/index'
import { Image } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../context/authContext';

function CustomDrawer(props, navigation) {

    const [username, setUsername] = useState("")
    const { toggleAuth } = useContext(AuthContext);


    useEffect(() => {
        async function getUserName() {
            const userName = await AsyncStorage.getItem('username')
            setUsername(userName)
        }
        getUserName()
    }, [])



    async function logout() {
        await AsyncStorage.clear()
        toggleAuth()
    }

    return (
        <DrawerContentScrollView {...props}>
            <Title hasPadding >Olá {username}</Title>
            <DrawerItemList {...props} />
            <Spacer size="500px" color="white" />
            <Box justify="flex-end" fluid align="center">
                <Spacer size="20px" />
                <Text color="muted" onPress={logout} >Sair</Text>
            </Box>
        </DrawerContentScrollView >
    );
}

export default CustomDrawer