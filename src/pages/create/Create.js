import { Title, Box, Spacer, Input, Text, Button, InputArea } from '../../components/index';
import { createPost } from '../../services/post';
import { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { showMessage } from 'react-native-flash-message';
import { Ionicons } from '@expo/vector-icons';
import { getPostId } from '../../services/post';


const Create = ({ navigation, route }) => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)

    async function createNewPost({ route }) {
        setLoading(true)
        const valid = validate()

        if (valid) {
            try {
                const response = await createPost(title, content, image)
                if (response.status === 201) {
                    setLoading(false)
                    navigation.navigate("Feed")
                    showMessage({
                        message: "Post criado com sucesso",
                        type: "success",
                        description: "Seu conteúdo está disponível no feed",
                        icon: props => <Ionicons size={20} name='checkmark' color={"#fff"} />,
                    });
                }
            } catch (error) {
                showMessage({
                    message: "Não foi possível criar o seu conteúdo",
                    type: "warning",
                    description: "Tente novamente mais tarde",
                });
            }
        }
        setLoading(false)
    }

    function validate() {
        if (title === "" || title === null) {
            return showMessage({
                message: "Preencha o título",
                type: "warning",
                description: "O campo título é obrigatório",
            });
        }
        if (content === "" || content === null) {
            return showMessage({
                message: "Preencha o Conteúdo",
                type: "warning",
                description: "O campo Conteúdo é obrigatório",
            });
        }
        if (image === "" || image === null) {
            return showMessage({
                message: "Adicicone a Url da imagem",
                type: "warning",
                description: "Não é possível criar um conteúdo sem imagem",
            });
        }
        return true
    }

    function resetData() {
        setLoading(true)
        setContent("")
        setImage("")
        setTitle("")
        setLoading(false)
    }

    useEffect(() => {
        const unsubscrible = navigation.addListener("blur", () => {
            resetData()
        })
        return unsubscrible
    }, [navigation]);

    return (
        <Box background="ligth" justify="center" align="center" hasPadding >
            <Title bold color="dark">Faça sua postagem</Title>
            <Spacer />
            <Text align="center" spacing="0px 40px">Publique assuntos do seu interesse com todos da rede</Text>
            <Spacer size="30px" />
            <Input placeholder="Título" value={title} onChangeText={setTitle} />
            <Spacer size="10px" />
            <InputArea placeholder="Conteúdo" value={content} justify="flex-start" multiline={true} textAlignVertical='top' onChangeText={setContent} />
            <Spacer size="10px" />
            <Input placeholder="Url da imagem" value={image} onChangeText={setImage} />
            <Spacer size="20px" />
            <Button block background="secondary" onPress={createNewPost}>
                <Text bold color="light">Postar</Text>
            </Button>
            <Spinner
                visible={loading}
                textContent={'Carregando'}
                textStyle={{ color: "white" }}
            />
        </Box>
    );
}

export default Create