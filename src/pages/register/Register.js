import React, { useContext, useEffect } from "react";
import { Image, Alert } from "react-native";
import { Box, Spacer, Text, Title, Input, Button } from "../../components"
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/authContext";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Ionicons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { registerUser } from "../../services/user";
import SignIn from "../sigIn/SignIn";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { toggleAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await registerUser(username, email, password)
      console.log(response)

      if (response.status === 201) {
        navigation.navigate("SignIn")
        showMessage({
          message: "Usuário cadastrado com sucesso",
          type: "success",
          description: "Faça login",
          icon: props => <Ionicons size={20} name='checkmark' color={"#fff"} />,
        });
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

  function resetData() {
    setEmail("")
    setPassword("")
    setUsername("")
  }

  useEffect(() => {
    const unsubscrible = navigation.addListener("blur", () => {
      resetData()
    })
    return unsubscrible
  }, [navigation]);

  const goToLogin = () => {
    navigation.navigate("SignIn")
  }

  return (
    <Box background="ligth" justify="center" align="center" hasPadding >
      <Spacer size="70px" />
      <Image style={{ width: 100, height: 100 }} source={require('../../../public/assets/LOGO.png')} />
      <Spacer size="30px" />
      <Title bold color="dark">Crie na sua conta</Title>
      <Spacer />
      <Text align="center" spacing="0px 70px">Preencha os dados abaixo para criar sua conta</Text>
      <Spacer size="30px" />
      <Input placeholder="Username" value={username} onChangeText={setUsername} />
      <Spacer size="10px" />
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Spacer size="10px" />
      <Input secureTextEntry placeholder="Password" value={password} onChangeText={setPassword} />
      <Spacer size="20px" />
      <Button block background="secondary" onPress={handleSubmit}>
        <Text bold color="light">Cadastrar-se</Text>
      </Button>
      <Spacer size="20px" />
      <Text onPress={goToLogin} color="muted">Já possui cadastro?</Text>
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

export default Register