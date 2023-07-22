import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import Card from './Cards';

// This the the profile view page where the user can view his/her profile
// The user can also edit his/her profile from this page by clicking a button to navigate to the edit page
// User Image is shown on the top along with his details and a button to edit the profile and a logout button
// Refer to the ViewEdit.js file for the edit page

// OnLogout function to logout the user
const onLogout = () => {
    auth().signOut();
}

const Profile = ({ navigation }) => {
    const [state, setState] = useState({})
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        firestore().collection('users').where('email', '==', auth().currentUser.email).get().then((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
                setState(documentSnapshot.data())
            });
        });
        firestore().collection('posts').where('useremail', '==', auth().currentUser.email).get().then((querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push(doc.data());
            });
            setPosts(posts);
        })
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
            <ScrollView style={{ flex: 1, padding: 20 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: state.photo }} style={
                            {
                                width: 200,
                                height: 200,
                                borderRadius: 100,
                                borderWidth: 3,
                                borderColor: '#fff'
                            }
                        } />
                        {/* <Text style={styles.imageText}>User Image</Text> */}
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailsText}>Name:  {state?.name}</Text>
                        <Text style={styles.detailsText}>Email:  {state?.email}</Text>
                        <Text style={styles.detailsText}>Institute: {state?.institute}</Text>
                        <Text style={styles.detailsText}>Department:  {state?.department} </Text>
                        <Text style={styles.detailsText}>Year of passing: {state?.year}</Text>
                        <Text style={styles.detailsText}>Current Job: {state?.job}</Text>
                        <Text style={styles.detailsText}>Bio: {state?.bio}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
                        {posts.map((post, index) => {
                            console.log(post);
                            return (
                                <Card key={index} post={post} />
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    imageText: {
        color: 'grey',
        fontSize: 20
    },
    detailsContainer: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 20,
        backgroundColor: '#202020',
        borderRadius: 10,
        padding: 10
    },
    detailsText: {
        fontSize: 20,
        marginBottom: 10,
        color: 'grey',
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 10

    },
    editButton: {
        width: 90,
        height: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    logoutButton: {
        width: 90,
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

})

export default Profile;
