import React from 'react';
import {
    View, StyleSheet, Image, Text, Pressable, Alert
} from 'react-native';

// import { connect } from 'react-redux';
// import { removeFromFavourites } from '../redux/actionCreators';

// const mapDispatchToProps = dispatch => {
//     return {
//         // removeFromFavourites: dish => dispatch(removeFromFavourites(dish)),
//     }
// }

const OrderCard = props => {
    // const orde = Object.values(props.order);
    console.log(props.order.totalPrice, "order caarddddddd");

    // for (var key in orde) {
    //     // console.log(orde[key].userId, "loooooop");
    // }
    const cartinfo = props.order.cart.map(item => {
        console.log(item.price * item.quantity);
        return (

            <Text key={item.id}>{item.name}</Text>


        )
    })





    return (

        <View style={styles.card}>
            {/* <Image source={{ uri: props.item }}
                    style={styles.image} /> */}
            <View style={styles.details}>
                <View style={styles.pricerow}>
                    {/* <Text style={styles.category}>{props.order.id}</Text> */}
                    {/* <Text style={styles.price}>{props.order.totalPrice} Tk</Text> */}
                </View>
                {cartinfo}
                <Text style={styles.title}>Total Price:{props.order.totalPrice}</Text>
                <Text></Text>

            </View>
        </View>

    )

}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: "#f2f2f2",
        overflow: "hidden",
        // margin: 5,
        elevation: 5,
        width: "100%",
        height: 100,
        marginVertical: 5,
    },
    // details: {
    //     padding: 15,
    // },
    // image: {
    //     width: "100%",
    //     height: 100,


    // },
    // title: {
    //     marginBottom: 7,
    //     marginTop: 7,
    //     fontSize: 15,
    // },
    // category: {
    //     borderRadius: 12,
    //     borderColor: "crimson",
    //     borderWidth: 1,
    //     color: "black",
    //     textAlign: "center",
    //     width: "45%",

    // },
    // pricerow: {
    //     flexDirection: "row",
    //     flexWrap: "wrap",
    //     justifyContent: "space-between",

    // },
    // price: {
    //     borderRadius: 12,
    //     borderColor: "crimson",
    //     borderWidth: 1,
    //     color: "white",
    //     backgroundColor: "crimson",
    //     textAlign: "center",
    //     width: "45%",
    //     fontWeight: "bold",
    //     fontSize: 15,
    // }
})

export default OrderCard;