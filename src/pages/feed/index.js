import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Title } from '../../components';
import PostCard from '../../components/Post';
import { getPost } from '../../services/post';
import { FlatList, SafeAreaView } from 'react-native';

const Feed = ({ navigation }) => {

  const [data, setData] = useState([])

  useEffect(() => {
    const verifyToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        toggleAuth()
      }
    };
    verifyToken();

    const getData = async () => {
      const response = await getPost()
      if (response.status === 200) {
        setData(response.data.posts)
        console.log(data)
      }
    }
    getData()

  }, []);
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={({ item }) => <PostCard {...item} navigation={navigation} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>

  );
}

export default Feed