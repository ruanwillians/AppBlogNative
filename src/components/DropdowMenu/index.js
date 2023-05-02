import React, { useRef } from "react";
import { View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Box, Button, Text, Spacer } from "../../components/index"
import { Ionicons } from "@expo/vector-icons";
import { deletePost } from "../../services/post";

export default function Example({ onDelete, id, navigation }) {
    const refRBSheet = useRef();

    function deleteUniquePost() {
        onDelete()
    }
    function goToEdit() {
        navigation.navigate("Create", { id })
    }
    return (
        <Box>
            <Text onPress={() => refRBSheet.current.open()}><Ionicons size={25} name='chevron-down' /></Text>
            <RBSheet
                ref={refRBSheet}
                height={150}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <Box hasPadding align="center">
                    <Text bold color="muted" onPress={goToEdit}>Editar</Text>
                    <Spacer size="20px" />
                    <Text bold color="primary" onPress={deleteUniquePost}>Excluir</Text>
                </Box>

            </RBSheet>
        </Box>
    );
}