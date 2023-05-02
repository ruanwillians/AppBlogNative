import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Title } from '../../components';
import PostCard from '../../components/Post';
import { getPost } from '../../services/post';
import { FlatList, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { SafeAreaView } from 'react-native-safe-area-context';
import { showMessage } from 'react-native-flash-message';
import { Ionicons } from '@expo/vector-icons'
import { deletePost } from '../../services/post';

const Feed = ({ navigation }) => {

  const [post, setPost] = useState()
  const [loading, setLoading] = useState(true)


  const getData = async () => {
    setLoading(true)
    const response = await getPost()
    const { posts } = response.data
    setPost(posts)
    setLoading(false)
  }

  const handleDeletePost = async (postId) => {
    const response = await deletePost(postId);
    setLoading(true)
    if (response.status === 200) {
      getData()
      showMessage({
        message: "Post deletado com sucesso",
        type: "success",
        description: "Veja o seu conteúdo no feed",
        icon: props => <Ionicons size={20} name='checkmark' color={"#fff"} />,
      });
    } else {
      showMessage({
        message: "Não foi possível excluir o seu conteúdo",
        type: "warning",
        description: "Você pode apenas excluir conteúdos criados por você",
      });
    }
    setLoading(false)
  };

  useEffect(() => {
    console.log(post)
  }, [post])

  useEffect(() => {
    const unsubscrible = navigation.addListener("focus", () => {
      getData()
    })
    return unsubscrible
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={post}
        renderItem={({ item }) => <PostCard {...item} navigation={navigation} onDelete={() => handleDeletePost(item.id)} />}
        keyExtractor={item => item.id}
      />
      <Spinner
        visible={loading}
        textContent={'Carregando'}
        textStyle={{ color: "white" }}
      />
    </SafeAreaView>

  );
}

export default Feed