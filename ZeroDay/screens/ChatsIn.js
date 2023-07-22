import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, withSafeAreaInsets } from 'react-native-safe-area-context';

const ChatsIn = ({ route, navigation }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const user = auth().currentUser;
    useEffect(() => {
        let combinedid = user.email + route.params.user.email;
        let combinedid2 = route.params.user.email + user.email;
        let id = combinedid > combinedid2 ? combinedid : combinedid2;
        firestore().collection('messages').doc(id).collection('messages').orderBy('createdAt').onSnapshot((querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc.data());
            });
            setMessages(messages);
            console.log(messages);
        })
    }, [])
    const sendMessage = () => {
        let combinedid = user.email + route.params.user.email;
        let combinedid2 = route.params.user.email + user.email;
        let id = combinedid > combinedid2 ? combinedid : combinedid2;
        firestore().collection('messages').doc(id).collection('messages').add({
            username: user.displayName,
            useremail: user.email,
            text: message,
            createdAt: firestore.FieldValue.serverTimestamp(),
        })
        setMessage('');
    }
    return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
            <SafeAreaView>
                <FlatList
                    data={messages}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.chat}>
                                <View style={styles.chatInfo}>
                                    <Text style={styles.name}>{item.username}</Text>
                                    <Text style={styles.message}>{item.text}</Text>
                                </View>
                            </View>
                        )
                    }}
                    keyExtractor={item => item.useremail}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        value={message}
                        onChangeText={setMessage}
                        style={styles.input}
                        placeholder="Type message"
                        placeholderTextColor="grey"
                    />
                    <View style={{
                        color: 'white',
                    }}>
                        <Button title="Send" onPress={sendMessage} />
                    </View>
                </View>
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
        color: "white",
        borderBottomColor: 'grey'
    },
    chatInfo: {
        marginLeft: 15,
        color: "white"
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    message: {
        fontSize: 16,
        color: 'white'
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 25
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        backgroundColor: 'White',
        borderRadius: 25
    },
    input: {
        flex: 1,
        height: 40,
        marginLeft: 20,
        color: "white"
    },
    send: {
        marginRight: 15,
        fontWeight: 'bold',
        fontSize: 16
    }
})

export default ChatsIn;