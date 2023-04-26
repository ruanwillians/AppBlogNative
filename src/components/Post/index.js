import React from "react"
import { Box, Title, Spacer, Text, Button, Img } from "../../components/index"
import { Image } from "react-native"
import { getPostId } from "../../services/post"
import { getUserId } from "../../services/user"
import DropdownButton from "../DropdowMenu"
import { View } from "react-native"


const Post = ({ content, title, image, user, created_at, navigation, id }) => {

    async function viewPost() {
        const response = await getPostId(id)
        const res = await getUserId(response.data.data.user_id)
        navigation.navigate('Post', { data: response.data.data, username: res.data.username });
    }

    return (
        <Box justify="flex-start" hasPadding align="flex-start" background="light2">
            <Image style={{ width: 100 + '%', height: 200, borderRadius: 10 }} source={{ uri: image }} />
            <Box hasPadding fluid height="auto" background="white" radius="10px">
                <Spacer color="white" />
                <Box row >
                    <Title>{title}</Title>
                    <Box align="flex-end">
                        <DropdownButton />
                    </Box>
                </Box>

                <Spacer color="white" />
                <Text>{content.slice(0, 100) + "..."}</Text>
                <Spacer size="20px" color="white" />
                <Text>{`Criado por: ${user.username}`}</Text>
                <Spacer size="20px" color="white" />
                <Button onPress={viewPost} background="secondary" >
                    <Text bold color="light">Ler mais</Text>
                </Button>
            </Box>
        </Box >
    )

}

export default Post
