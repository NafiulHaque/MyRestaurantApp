import React, { useState, useEffect } from 'react';
import {
    View, StyleSheet, Image, Text, Pressable, Alert, TextInput
} from 'react-native';

import { connect } from 'react-redux';
import { less, more, removeFromCart } from '../redux/actionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        cart: state.cart,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: dish => dispatch(removeFromCart(dish)),
        more: sitem => dispatch(more(sitem)),
        less: sitem => dispatch(less(sitem)),
    }
}

const CartItem = props => {


    // console.log(props.dishes, "cart di");
    const removeCart = () => {
        Alert.alert(
            'Delete from Cart?',
            'Are you sure you wish to delete ' + props.item.name + 'from Cart?',
            [
                {
                    text: 'Cencel',
                    onPress: () => console.log("Cencelled"),
                    style: "cancel"

                },
                {
                    text: 'OK',
                    onPress: () => props.removeFromCart(props.item),
                }
            ],
            { cancelable: false }

        )
    }

    // const [count, setCount] = useState(1);

    // const pri = props.dishes.map(it => it.id == props.item.id ? it.price : null);
    // const [tprice, setPrice] = useState(dish);
    // let tprice = null;
    // const ispressed = (count) => {
    //     // console.log(pi);
    //     // setPrice(tprice * count);
    //     const citem = props.item;
    //     // let it = { ...citem };
    //     // var pri = props.item.price;
    //     // var cou = props.item.quantity;
    //     const sitem = { ...citem, quantity: count };
    //     // console.log(it.price);
    //     props.more(sitem);
    // }


    return (

        <Pressable onLongPress={() => removeCart()}>
            <View style={styles.card}>
                <Image source={{ uri: props.item.image }}
                    style={styles.image} />
                <View style={styles.details}>
                    <View style={styles.textgrp}>
                        <Text style={styles.title}>{props.item.name}</Text>
                        <Text style={styles.btnitem} >Price:{((props.item.price) * (props.item.quantity))}</Text>
                    </View>
                    <View style={styles.btngroup}>
                        <Text style={styles.btnitem} onPress={() => (props.more(props.item))}>+</Text>
                        <Text style={{
                            color: "black",
                            fontSize: 17,
                            paddingHorizontal: 5,
                            marginHorizontal: 5,
                        }}>{props.item.quantity}</Text>
                        <Text style={styles.btnitem} onPress={() => props.less(props.item)} >-</Text>

                    </View>
                </View>

            </View>
        </Pressable >
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        backgroundColor: "#f2f2f2",
        overflow: "hidden",
        margin: 7,
        elevation: 5,
        flexDirection: "row",
    },
    details: {
        padding: 7,
        flexDirection: "row",
        width: 120,
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
    },
    textgrp: {
        width: "80%"
    },
    image: {
        width: "40%",
        height: 110,
    },
    title: {
        marginBottom: 7,
        fontSize: 18,

    },
    btngroup: {
        flexDirection: "column",
        backgroundColor: "#f2f2f2",
        justifyContent: "space-between",
        borderRadius: 16,
        elevation: 7,

    },
    btnitem: {
        fontSize: 17,
        paddingHorizontal: 5,
        marginHorizontal: 5,
        color: "grey"
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);