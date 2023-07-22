import firestore from '@react-native-firebase/firestore';
import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Card = (props) => {
    const [user, setUser] = React.useState(null);
    // get 2 hours ago or 20 secs ago using timestamp
    const getTime = (timestamp) => {
        const seconds = Math.floor((new Date() - timestamp.toDate()) / 1000);
        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";

    }

    useEffect(() => {
        firestore().collection('users').where('email', '==', props.post.useremail).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        }
        )
    }, [])
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Image source={{ uri: user?.photo }} style={
                    {
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        borderWidth: 3,
                        borderColor: '#fff'
                    }
                } />
                <View>
                    <Text style={styles.name}>{user?.name}</Text>
                    <Text style={styles.time}> {getTime(props.post.timestamp)} ago</Text>
                </View>
            </View>
            <Image source={{ uri: props.post.photo }} style={styles.postImage} />
            {/* <Image source={require()} style={styles.postImage} resizeMode="cover" /> */}
            <View style={styles.cardFooter}>
                <View style={styles.socialBarContainer}>
                    <View style={styles.socialBarSection}>
                        <Ionicons name="heart" size={25} color="white" />
                    </View>
                    <View style={styles.socialBarSection2}>
                        <Ionicons name="bookmark-outline" size={25} color="white" />
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Card;

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        backgroundColor: "#202020",
        borderRadius: 5,
        marginHorizontal: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    cardHeader: {
        paddingVertical: 9,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: "center",
        borderBottomColor: "#EBECF4",
    },
    profileImage: {
        width: 36,
        height: 36,
        borderRadius: 18,
        overflow: "hidden",
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65",
        marginLeft: 10
    },
    time: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 3,
        marginLeft: 10
    },
    postImage: {
        width: Dimensions.get('window').width - 20,
        height: 250,
        alignSelf: 'center',
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    socialBarContainer: {
        flexDirection: "row",
        flex: 1,
    },
    socialBarSection: {
        flexDirection: "row",
        flex: 1,
    },
    socialBarSection2: {
        flexDirection: "row",
    },
});