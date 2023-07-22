import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import Icons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Chats from "../screens/Chats";
import ChatsIn from "../screens/ChatsIn";
import Home from "../screens/Home";
import Posts from "../screens/Posts";
import Profile from "../screens/Profile";
import ViewEdit from "../screens/ViewEdit";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStack = () => (
  <Stack.Navigator
    initialRouteName={Profile}
  >
    <Stack.Screen

      name="Profile"
      component={Profile}
      options={{

        headerShown: false,
        tabBarShowLabel: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={ViewEdit}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
        headerTitle: 'Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'black',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const ChatStack = () => (
  <Stack.Navigator
    initialRouteName={Chats}
  >
    <Stack.Screen
      name="Chats"
      component={Chats}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    />
    <Stack.Screen
      name="ChatsIn"
      component={ChatsIn}
      options={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        user: route.params.user
      })}
    />

  </Stack.Navigator>
);


const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={
      {
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'black'
        },
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: '#3ad6ab',
      }
    }>
      <Tab.Screen name="Home" component={Home} options={
        {
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />)
        }
      } />
      <Tab.Screen name="Chats" component={ChatStack} options={
        {
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox" color={color} size={size} />)
        }
      } />
      <Tab.Screen name="Posts" component={Posts} options={
        {
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />)
        }
      } />
      <Tab.Screen name="Profile1" component={ProfileStack} options={
        {
          tabBarIcon: ({ color, size }) => (
            <Icons name="user" color={color} size={size} />)
        }
      } />
    </Tab.Navigator>
  );
}

export default TabNavigator;
