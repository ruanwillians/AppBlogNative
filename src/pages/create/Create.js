import { Title, Box, Spacer, Input, Text, Button, InputArea } from '../../components/index';
import { createPost, editPost } from '../../services/post';
import { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { showMessage } from 'react-native-flash-message';
import { Ionicons } from '@expo/vector-icons';
import { getPostId } from '../../services/post';


const Create = ({ navigation, route }) => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const [id, setId] = useState("")
    const [update, setUpdate] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(route)
        if (route.params) {
            const { data, username } = route.params;
            setTitle(data.title);
            setImage(data.image);
            setContent(data.content);
            setId(data.id);
            setUpdate(true);
        } else {
            setUpdate(false);
        }
    }, [route.params]);


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
    async function editMyPost({ route }) {
        setLoading(true)
        const valid = validate()

        if (valid) {
            try {
                const res = await editPost(id, title, content, image)
                setLoading(false)
                navigation.navigate("Feed")
                showMessage({
                    message: "Post editado com sucesso",
                    type: "success",
                    description: "Seu conteúdo está disponível no feed",
                    icon: props => <Ionicons size={20} name='checkmark' color={"#fff"} />,
                });

            } catch (error) {
                showMessage({
                    message: "Não foi possível editar o conteúdo",
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
        setUpdate(false)
    }

    useEffect(() => {
        setUpdate(false)
        const unsubscrible = navigation.addListener("blur", () => {
            resetData()
        })
        return unsubscrible
    }, [navigation]);

    return (
        <Box background="ligth" justify="center" align="center" hasPadding >
            {update ? (
                <Title bold color="dark">Edite sua postagem</Title>
            ) : (<Title bold color="dark">Faça sua postagem</Title>)}

            <Spacer />
            {update ? (
                <Text align="center" spacing="0px 40px">Edite o conteúdo, da sua postagem e publique para todos da rede.</Text>
            ) : (
                <Text align="center" spacing="0px 40px"> Publique assuntos do seu interesse com todos da sua rede.</Text>
            )}

            <Spacer size="30px" />
            <Input placeholder="Título" value={title} onChangeText={setTitle} />
            <Spacer size="10px" />
            <InputArea placeholder="Conteúdo" value={content} justify="flex-start" multiline={true} textAlignVertical='top' onChangeText={setContent} />
            <Spacer size="10px" />
            <Input placeholder="Url da imagem" value={image} onChangeText={setImage} />
            <Spacer size="20px" />
            {update ? (
                <Button block background="secondary" onPress={editMyPost}>
                    <Text bold color="light">Editar</Text>
                </Button>
            ) : (
                <Button block background="secondary" onPress={createNewPost}>
                    <Text bold color="light">Postar</Text>
                </Button>
            )}

            <Spinner
                visible={loading}
                textContent={'Carregando'}
                textStyle={{ color: "white" }}
            />
        </Box>
    );
}

export default Create