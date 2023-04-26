import React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { Title } from '../../components/index'
import { Image } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useState } from 'react';

function CustomDrawer(props) {

    const [username, setUsername] = useState("")

    useEffect(() => {
        async function getUserName() {
            const userName = await AsyncStorage.getItem('username')
            setUsername(userName)
        }
        getUserName()
    }, [])

    return (
        <DrawerContentScrollView {...props}>
            <Title hasPadding >Olá {username}</Title>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

export default CustomDrawer