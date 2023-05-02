import React, { useContext } from "react";
import { Image, Alert } from "react-native";
import { Box, Spacer, Text, Title, Input, Button } from "../../components"
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/authContext";
import { signInUser } from "../../services/user";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Ionicons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay/lib";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { toggleAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await signInUser(email, password)

      if (response.status === 200) {
        const { token, username, id } = response.data;
        await AsyncStorage.setItem('token', `Bearer ${token.token}`);
        await AsyncStorage.setItem('id', `${username}`);
        await AsyncStorage.setItem('id', `${id}`);
        toggleAuth()
      } else {
        showMessage({
          message: "Login ou senha inválido",
          type: "danger",
          description: "Verifique e tente novamente",
          icon: props => <Ionicons size={20} name='close' />,
        });
      }
    } catch (error) {
      console.error(error);
      showMessage({
        message: "Houve um erro",
        description: "Tente novamente mais tarde",
        type: "warning",
      });
    }
    setLoading(false)
  }

  return (
    <Box background="ligth" justify="center" align="center" hasPadding >
      <Spacer size="70px" />
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
      <Text color="muted">Ainda não possui cadastro?</Text>
      <Box justify="center" align="center" hasPadding>
        <Spinner
          visible={loading}
          textContent={'Carregando'}
          textStyle={{ color: "white" }}
        />
      </Box>
    </Box>
  )

}

export default SignIn