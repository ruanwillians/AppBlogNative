import React from "react"
import { Box, Title, Spacer, Text, Button, Img } from "../../components/index"
import { Image } from "react-native"
import { useEffect, useState } from "react"
import { getPostId } from "../../services/post"
import { Ionicons } from "@expo/vector-icons"

const PostId = ({ route, navigation }) => {

    const { data, username } = route.params;

    return (

        <Box justify="flex-start" hasPadding align="flex-start" background="light">
            <Box hasPadding fluid height="auto" >
                <Spacer color="white" />
                <Title>{data.title}</Title>
                <Spacer size="20px" color="white" />
                <Text>{`Criado por: ${username}`}</Text>
                <Spacer size="20px" color="white" />
                <Image style={{ width: 100 + '%', height: 200 }} source={{ uri: data.image }} />
                <Spacer color="white" size="20px" />
                <Text>{data.content}</Text>
                <Spacer size="20px" color="white" />
                <Button block background="secondary" onPress={() => navigation.navigate("Feed")} >
                    <Text bold color="light">Voltar para o Feed</Text>
                </Button>
            </Box>
        </Box>
    )

}

export default PostId