import React, { createContext, useState } from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                googleLogin: async () => {
                    try {
                        await GoogleSignin.hasPlayServices();
                        const userInfo = await GoogleSignin.signIn();
                        const googleCredential = auth.GoogleAuthProvider.credential(
                            userInfo.idToken,
                        );
                        await auth().signInWithCredential(googleCredential).then(() => {
                            firestore().collection('users').doc(auth().currentUser.uid).get().then((doc) => {
                                if (!doc.exists) {
                                    firestore().collection('users').doc(auth().currentUser.uid).set({
                                        name: auth().currentUser.displayName,
                                        email: auth().currentUser.email,
                                        photo: auth().currentUser.photoURL,
                                    }).then(() => {
                                        console.log('User added!');
                                    }).catch((e) => {
                                        console.log(e);
                                    })
                                }
                            }
                            );
                        })
                            .catch(error => {
                                console.log('Something went wrong with sign up: ', error);
                            });
                    } catch (error) {
                        console.log({ error });
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (e) {
                        console.log(e);
                    }
                },
            }
            } >
            {children}
        </AuthContext.Provider >
    );
};


export default AuthProvider;