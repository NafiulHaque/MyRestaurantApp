import React from 'react';
import {
    View, StyleSheet, Image, Text, Pressable, Alert
} from 'react-native';

import { connect } from 'react-redux';
// import { removeFromFavourites } from '../redux/actionCreators';

const mapDispatchToProps = dispatch => {
    return {
        // removeFromFavourites: dish => dispatch(removeFromFavourites(dish)),
    }
}

const HomeCard = props => {


    return (
        <Pressable onPress={props.selectDish}>
            <View style={styles.card}>
                <Image source={{ uri: props.item.image }}
                    style={styles.image} />
                <View style={styles.details}>
                    <View style={styles.pricerow}>
                        <Text style={styles.category}>{props.item.category}</Text>
                        <Text style={styles.price}>{props.item.price} Tk</Text>
                    </View>
                    <Text style={styles.title}>{props.item.name}</Text>


                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: "#f2f2f2",
        overflow: "hidden",
        margin: 5,
        elevation: 5,
        width: 150,
        height: 200,
    },
    details: {
        padding: 15,
    },
    image: {
        width: "100%",
        height: 100,


    },
    title: {
        marginBottom: 7,
        marginTop: 7,
        fontSize: 15,
    },
    category: {
        borderRadius: 12,
        borderColor: "crimson",
        borderWidth: 1,
        color: "black",
        textAlign: "center",
        width: "45%",

    },
    pricerow: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",

    },
    price: {
        borderRadius: 12,
        borderColor: "crimson",
        borderWidth: 1,
        color: "white",
        backgroundColor: "crimson",
        textAlign: "center",
        width: "45%",
        fontWeight: "bold",
        fontSize: 15,
    }
})

export default connect(null, mapDispatchToProps)(HomeCard);