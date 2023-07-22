import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';


const ViewEdit = ({ navigation }) => {
    const [state, setState] = useState({
        name: '',
        institute: '',
        department: '',
        year: '',
        job: '',
        bio: ''
    })
    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then((doc) => {
            setState({
                name: doc.data().name,
                institute: doc.data().institute,
                department: doc.data().department,
                year: doc.data().year,
                job: doc.data().job,
                bio: doc.data().bio
            })
        })
    }, []);
    const onChangeName = name => {
        setState({ ...state, name })
    }
    const onChangeInstitute = institute => {
        setState({ ...state, institute })
    }
    const onChangeDepartment = department => {
        setState({ ...state, department })
    }
    const onChangeYear = year => {
        setState({ ...state, year })
    }
    const onChangeJob = job => {
        setState({ ...state, job })
    }
    const onChangeBio = bio => {
        setState({ ...state, bio })
    }

    const onSave = () => {
        firestore().collection('users').doc(auth().currentUser.uid).update({
            name: state.name,
            institute: state.institute,
            department: state.department,
            year: state.year,
            job: state.job,
            bio: state.bio
        })
            .then(() => {
                navigation.navigate('Profile');
            }
            )
    }
    const onCancel = () => {
        navigation.navigate('Profile')
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <ScrollView style={{ flex: 1, padding: 20 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 30, color: "white" }}>Edit Profile</Text>
                </View>
                <View style={{ flex: 1, padding: 20 }}>
                    <Text style={{ fontSize: 20, color: "white" }}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor={'grey'}
                        value={state.name}
                        onChangeText={onChangeName}
                    />
                    <Text style={{ fontSize: 20, color: "white" }}>Institute</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Institute"
                        placeholderTextColor={'grey'}
                        value={state.institute}
                        onChangeText={onChangeInstitute}
                    />
                    <Text style={{ fontSize: 20, color: "white" }}>Department</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Department"
                        placeholderTextColor={'grey'}
                        value={state.department}
                        onChangeText={onChangeDepartment}
                    />
                    <Text style={{ fontSize: 20, color: "white" }}>Year of passing</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Year of passing"
                        placeholderTextColor={'grey'}
                        value={state.year}
                        onChangeText={onChangeYear}
                    />
                    <Text style={{ fontSize: 20, color: "white" }}>Current job and company</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Current job and company"
                        placeholderTextColor={'grey'}
                        value={state.job}
                        onChangeText={onChangeJob}
                    />
                    <Text style={{ fontSize: 20, color: "white" }}>Bio</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Bio"
                        placeholderTextColor={'grey'}
                        value={state.bio}
                        onChangeText={onChangeBio}
                    />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={styles.button} onPress={onSave}>
                            <Text style={{ color: 'black', fontSize: 20 }}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={onCancel}>
                            <Text style={{ color: 'black', fontSize: 20 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "white"
    },
    button: {
        alignItems: "center",
        backgroundColor: "white",
        marginTop: 15,
        padding: 5,
        borderRadius: 10,
        width: 80,
    }
})

export default ViewEdit;



