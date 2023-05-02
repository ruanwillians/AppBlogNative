import React, { useState } from "react"
import { Box, Title, Spacer, Text, Button, Img } from "../../components/index"
import { Image, SafeAreaView, View } from "react-native"
import { getPostId } from "../../services/post"
import { getUserId } from "../../services/user"
import DropdownButton from "../DropdowMenu"
import Spinner from "react-native-loading-spinner-overlay"
import { showMessage } from "react-native-flash-message"

const Post = ({ content, title, image, user, created_at, navigation, id, onDelete }) => {

    const [loading, setLoading] = useState(false)

    async function viewPost() {
        setLoading(true)
        const response = await getPostId(id)
        if (response.status === 200) {
            const res = await getUserId(response.data.data.user_id)
            navigation.navigate('Post', { data: response.data.data, username: res.data.username });
        } else {
            showMessage({
                message: "Houve um erro ao acessar o conteúdo",
                type: "danger",
                description: "Tente novamente mais tarde",
                icon: props => <Ionicons size={20} name='close' color={"#fff"} />,
            });
        }
        setLoading(false)
    }

    return (
        <View style={{ padding: 20 }}>
            <Image style={{ width: 100 + '%', height: 200, borderRadius: 10 }} source={{ uri: image }} />
            <Spacer color="white" size="20px" />
            <View style={{ flexDirection: "row", marginBottom: -5 }}>
                <Title>{title}</Title>
                <Box align="flex-end"  >
                    <DropdownButton onDelete={onDelete} id={id} navigation={navigation} />
                </Box>
            </View>
            <Spacer color="white" size="10px" />
            <Text>{content.slice(0, 100) + "..."}</Text>
            <Spacer size="20px" color="white" />
            <Text>{`Criado por: ${user.username}`}</Text>
            <Spacer size="20px" color="white" />
            <Button onPress={viewPost} background="secondary" >
                <Text bold color="light">Ler mais</Text>
            </Button>
        </View>

    )

}

export default Post
