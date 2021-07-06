import React from 'react';
import {
    View, StyleSheet, Image, Text, Pressable, Alert
} from 'react-native';

import { connect } from 'react-redux';
import { removeFromFavourites } from '../redux/actionCreators';

const mapDispatchToProps = dispatch => {
    return {
        removeFromFavourites: dish => dispatch(removeFromFavourites(dish)),
    }
}

const Card = props => {

    const removeFav = () => {
        Alert.alert(
            'Delete Favourite?',
            'Are you sure you wish to delete the favourite dish' + props.item.name + '?',
            [
                {
                    text: 'Cencel',
                    onPress: () => console.log("Cencelled"),
                    style: "cancel"

                },
                {
                    text: 'OK',
                    onPress: () => props.removeFromFavourites(props.item),
                }
            ],
            { cancelable: false }

        )
    }
    return (
        <Pressable onLongPress={() => removeFav()}>
            <View style={styles.card}>
                <Image source={{ uri: props.item.image }}
                    style={styles.image} />
                <View style={styles.details}>
                    <Text style={styles.title}>{props.item.name}</Text>
                    <Text>{props.item.category}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: "white",
        overflow: "hidden",
        margin: 20,
        elevation: 5,
    },
    details: {
        padding: 25,
    },
    image: {
        width: "100%",
        height: 150,


    },
    title: {
        marginBottom: 7,
        fontSize: 20,
    }
})

export default connect(null, mapDispatchToProps)(Card);