import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Chats = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        firestore().collection('users').get().then((querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            setUsers(users);
        })
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
            <SafeAreaView>
                <FlatList
                    data={users}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('ChatsIn', {
                                user: item
                            })}>
                                <View style={styles.chat}>
                                    <Image source={{ uri: item.photo }} style={styles.image} />
                                    <View style={styles.chatInfo}>
                                        <Text style={styles.name}>{item.name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={item => item.uid}
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    chat: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    chatInfo: {
        marginLeft: 15,
    },
    name: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    message: {
        fontSize: 16,
        color: 'white'
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 50
    }
})

export default Chats

