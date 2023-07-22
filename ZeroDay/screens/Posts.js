import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Posts = () => {
    const [state, setState] = useState({
        image: null,
        title: '',
        description: ''
    })
    const onChangeTitle = title => {
        setState({ ...state, title })
    }
    const onChangeDescription = description => {
        setState({ ...state, description })
    }

    const onSubmit = async () => {
        try {
            const post = {
                photo: state.image,
                title: state.title,
                description: state.description,
                timestamp: firestore.FieldValue.serverTimestamp()
            }
            const reference = storage().ref('posts/' + new Date().toISOString());
            reference.putFile(post.photo.uri).then(() => {
                reference.getDownloadURL().then((url) => {
                    firestore().collection('posts').add({
                        title: post.title,
                        description: post.description,
                        photo: url,
                        useremail: auth().currentUser.email,
                        timestamp: post.timestamp
                    }).then(() => {
                        console.log('Post added!');
                    }).catch((e) => {
                        console.log(e);
                    })
                })
            })
            setState({
                image: null,
                title: '',
                description: ''
            })
        } catch (e) {
            console.error(e)
        }
    }

    const selectImage = () => {
        const options = {
            noData: true
        }
        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            } else {
                const source = { uri: response.assets[0].uri }
                console.log(source)
                setState({
                    image: source
                })
            }
        })
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                {state.image ? (
                    <Image
                        source={state.image}
                        style={{ width: '100%', height: 400 }}
                    />
                ) : (
                    <Ionicons name="add-circle" size={150} color="white" style={styles.icon} onPress={selectImage} />
                )}
            </View>
            {/* <Input placeholder='Title' value={state.title} onChangeText={onChangeTitle} /> */}
            <View style={{ marginTop: 0, alignItems: 'center', backgroundColor: "black" }}>

                <Text category='h4'>Post Details</Text>
                <TextInput
                    placeholder='Title'
                    placeholderTextColor="white"
                    value={state.title}
                    onChangeText={onChangeTitle}
                    style={{ width: '95%', height: 35, borderColor: 'gray', borderWidth: 2, borderRadius: 10, color: "white", fontSize: 20, paddingTop: 0, paddingBottom: 0, paddingLeft: 10 }}
                />
                <TextInput
                    placeholder='Description'
                    placeholderTextColor="white"
                    value={state.description}
                    onChangeText={onChangeDescription}
                    style={{ width: '95%', height: 150, borderColor: 'gray', borderWidth: 2, borderRadius: 10, marginTop: 10, marginBottom: 20, color: "white", fontSize: 18, paddingBottom: 0, paddingLeft: 10 }}
                />
                {/* <Button color="#474747" status='success' onPress={onSubmit} title="Upload">
                </Button> */}
                <TouchableOpacity style={styles.postButton} onPress={onSubmit}>
                    <Text style={styles.buttonText}>Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Posts

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: "black"
    },
    icon: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 100,
        paddingBottom: 50,
    },
    postButton: {
        width: 100,
        height: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonText: {
        color: 'black',
        fontSize: 20
    }
});
