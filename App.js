
import 'react-native-gesture-handler';
import * as React from 'react';
import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/pages/home/HomeScreen';
import SignIn from './src/pages/sigIn/SignIn';
import Feed from './src/pages/feed';
import Create from './src/create';
import PostId from './src/pages/post/Post.js';
import { AuthContext, AuthProvider } from './src/context/authContext';
import { colors } from "./styles/theme.json"
import { Ionicons } from '@expo/vector-icons';
import { DrawerContent, createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './src/components/CustomDrawer';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator()

const MyStack = () => {
  const { auth } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!auth ? (

        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>

      ) : (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />} screenOptions={{
          drawerActiveTintColor: `${colors.light}`,
          drawerActiveBackgroundColor: `${colors.secondary}`

        }}>
          <Drawer.Screen name="Feed" component={Feed} options={{
            drawerLabel: 'Home',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }} />
          <Drawer.Screen name="Create" component={Create} options={{
            drawerLabel: 'Postar',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="add" color={color} size={size} />
            ),
          }} />
          <Drawer.Screen name="Post" component={PostId} options={{
            drawerLabel: 'Ver último conteúdo',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="albums-outline" color={color} size={size} />
            ),
          }} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>

  );
};

const App = () => {
  return (
    <AuthProvider>
      <MyStack />
    </AuthProvider>
  );
};

export default App

