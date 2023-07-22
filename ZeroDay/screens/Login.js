import React, { useContext } from 'react';
import {
    Dimensions, Image, SafeAreaView,
    StatusBar,
    StyleSheet, Text, TouchableOpacity, View
} from 'react-native';

import { AuthContext } from '../router/AuthProvider';

export const Login = () => {
    const { googleLogin } = useContext(AuthContext);
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>
                <View style={styles.topContent}>
                    <Text style={styles.mainText}>
                        ZeroDay
                    </Text>
                </View>
                <View style={styles.bottomContent}>
                    <TouchableOpacity style={styles.googleButton} onPress={
                        googleLogin
                    }>
                        <Image
                            style={styles.googleIcon}
                            source={{
                                uri: "https://i.ibb.co/j82DCcR/search.png",
                            }}
                        />
                        <Text style={styles.googleButtonText}>Sign in with Google</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
};
const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "#262b2f"
    },
    container: {
        height: Dimensions.get('window').height,
        backgroundColor: "black",
    },
    topContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainText: {
        fontSize: 54,
        color: "white",
    },
    googleButton: {
        backgroundColor: "white",
        borderRadius: 4,
        paddingHorizontal: 34,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    googleButtonText: {
        color: "#262b2f",
        marginLeft: 16,
        fontSize: 18,
        fontWeight: '600'
    },
    googleIcon: {
        height: 24,
        width: 24
    }
});