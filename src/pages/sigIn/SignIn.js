import React, { useContext } from "react";
import { Image, Alert } from "react-native";
import { Box, Spacer, Text, Title, Input, Button } from "../../components"
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/authContext";
import { signInUser } from "../../services/user";



const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { toggleAuth } = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      const response = await signInUser(email, password)
      console.log(response)

      if (response.status === 200) {
        const { token, username } = response.data;
        await AsyncStorage.setItem('token', `Bearer ${token.token}`);
        await AsyncStorage.setItem('username', `${username}`);
        toggleAuth()
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to login.');
    }
  }

  return (
    <Box background="ligth" justify="center" align="center" hasPadding >
      <Image style={{ width: 100, height: 100 }} source={require('../../../public/assets/LOGO.png')} />
      <Spacer size="30px" />
      <Title bold color="dark">Entre na sua conta</Title>
      <Spacer />
      <Text align="center" spacing="0px 70px">Preencha os dados abaixo para entrar na sua conta</Text>
      <Spacer size="30px" />
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Spacer size="10px" />
      <Input secureTextEntry placeholder="Password" value={password} onChangeText={setPassword} />
      <Spacer size="20px" />
      <Button block background="secondary" onPress={handleSubmit}>
        <Text bold color="light">Entrar</Text>
      </Button>
      <Spacer size="20px" />
      <Text color="muted">Já possuo cadastro</Text>
    </Box>
  )

}

export default SignIn