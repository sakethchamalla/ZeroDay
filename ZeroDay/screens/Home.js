import firestore from '@react-native-firebase/firestore';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import Card from './Cards';
import Search from './Search';

export default function Home() {
    const [posts, setPosts] = React.useState([]);
    useEffect(() => {
        // using firebase generate a all posts
        // and store it in a state
        // and then map it to the card component
        firestore().collection('posts').get().then((querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push(doc.data());
            });
            setPosts(posts);
        })
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
            <SafeAreaView>
                <ScrollView>
                    <Search />
                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
                        {posts.map((post, index) => {
                            return (
                                <Card key={index} post={post} />
                            )
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
