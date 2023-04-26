import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DropdownButton = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const handleMenuPress = () => {
        setIsMenuVisible(!isMenuVisible);
    }

    const handleEditPress = () => {
        // lógica para editar o item
        setIsMenuVisible(false);
    }

    const handleDeletePress = () => {
        // lógica para deletar o item
        setIsMenuVisible(false);
    }

    return (
        <View>
            <TouchableOpacity onPress={handleMenuPress}>
                <Text><Ionicons size={25} name='chevron-down' /></Text>
            </TouchableOpacity>

            <Modal
                visible={isMenuVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsMenuVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20 }}>
                        <TouchableOpacity onPress={handleEditPress}>
                            <Text>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDeletePress}>
                            <Text>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default DropdownButton;