import React from "react";
import { View, Image, StatusBar } from 'react-native'
import { Box, Button, Text, Title, Spacer } from "../../components/index"

const Home = ({ navigation }) => {

    const goToRegister = () => {
        navigation.navigate("Register")
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <Box justify="center" hasPadding align="center" background="ligth">
                <Box justify="center" align="center">
                    <Title color="dark" bold >Bem Vindo ao Blog</Title>
                    <Spacer size="10px" />
                    <Text align="center" spacing="0px 70px">Aqui você pode compartilhar tudo que você quiser!</Text>
                </Box>
                <Box justify="flex-end" fluid align="center">
                    <Button block background="secondary" onPress={() =>
                        navigation.navigate("SignIn")}>
                        <Text bold color="light">Entrar na minha conta</Text>
                    </Button>
                    <Spacer size="20px" />
                    <Text onPress={goToRegister} color="muted">Criar uma conta</Text>
                </Box>
                <Spacer size="60px" />
            </Box>
        </>
    )
}

export default Home;