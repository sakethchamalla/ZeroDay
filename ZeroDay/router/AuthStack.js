import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';

import { Login } from '../screens/Login';
import { Slider } from '../screens/Slider';

const Stack = createStackNavigator();

const AuthStack = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    let routeName;

    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then((value) => {
            if (value == null) {
                AsyncStorage.setItem('alreadyLaunched', 'true');
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        });
        GoogleSignin.configure({
            webClientId: '730115463676-054bmp9kgrvj4j3j5m8sg3ut7rjcb127.apps.googleusercontent.com'
        });

    }, []);

    if (isFirstLaunch === null) {
        return null;
    } else {
        routeName = isFirstLaunch == true ? 'Slider' : 'Login';
    }

    return (
        <Stack.Navigator initialRouteName={routeName}>
            <Stack.Screen
                name="Slider"
                component={Slider}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ header: () => null }}
            />
        </Stack.Navigator>
    );
};

export default AuthStack;
