// Write a simle search screen

import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Using functional components

const Search = () => {
    const [state, setState] = useState({
        search: '',
        data: []
    })
    const [data, setData] = useState([]);
    useEffect(() => {
        firestore().collection('users').get()
            .then(querySnapshot => {
                const users = [];
                querySnapshot.forEach(documentSnapshot => {
                    users.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id
                    })
                })
                setState({ ...state, data: users })
            })
    }, [])
    const onChangeSearch = search => {
        setState({ ...state, search })
        setData(state.data.filter(item => item.name.toLowerCase().includes(search.toLowerCase())))
    }
    const onSearch = () => {
        console.log(state.search);
    }
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    placeholderTextColor={'grey'}
                    value={state.search}
                    onChangeText={onChangeSearch}
                />
                <TouchableOpacity style={styles.searchButton} onPress={onSearch} >
                    <Ionicons name="search" size={24} color="white" />
                </TouchableOpacity>
            </View>


            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer} key={item.photo}>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 3
    },
    searchContainer: {
        marginTop: 10,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 80,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        borderColor: 'grey',
        borderWidth: 2,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    searchInput: {
        flex: 1,
        fontSize: 18,
        padding: 10,
        color: 'white'
    },
    searchButton: {
        padding: 10,
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    itemText: {
        fontSize: 18
    }
})

export default Search;
