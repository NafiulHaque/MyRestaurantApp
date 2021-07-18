import React from 'react';
import {
    View, StyleSheet, Image, Text, Pressable, Alert
} from 'react-native';

const OrderCard = props => {
    // const orde = Object.values(props.order.orderTime);
    // console.log(props.id, "order caarddddddd");

    const cartinfo = props.order.cart.map(item => {

        return (
            <Text key={item.id} style={{ width: 250, fontSize: 12, }}> #{item.name}          {item.price} x {item.quantity}</Text>
        )
    })

    var datee = props.order.orderTime;
    var date = datee.toLocaleString().slice(0, 10);
    var time = datee.toLocaleString().slice(11, 19);
    // var date = datee.getFullYear() + '-' + (datee.getMonth() + 1) + '-' + datee.getDate();


    return (

        <View style={styles.card}>
            <View style={styles.details}>
                <View style={styles.pricerow}>

                    {cartinfo}
                </View>
                <View style={{ borderBottomWidth: 1, marginVertical: 7, borderColor: "grey" }}></View>
                <Text style={styles.totalPrice}>Total Price: {props.order.totalPrice} ৳</Text>

            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", width: "100%", marginTop: 7 }}>
                <Text style={{ fontSize: 10, marginRight: 5 }}>Date:{date}</Text>
                <Text style={{ fontSize: 10, }}>Time:{time}</Text>
            </View>
        </View>

    )

}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        // backgroundColor: "#f2f2f2",
        // overflow: "hidden",
        // margin: 5,
        elevation: 5,
        width: "100%",
        minHeight: 50,
        marginVertical: 5,
        padding: 15,
        textAlign: 'center',
        justifyContent: "center",
        alignItems: "center"
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
    pricerow: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "80%",

    },
    totalPrice: {
        // borderRadius: 12,
        // borderColor: "crimson",
        // borderWidth: 1,
        // color: "white",
        // backgroundColor: "crimson",
        // textAlign: "center",
        // width: "45%",
        fontWeight: "bold",
        // fontSize: 15,
    }
})

export default OrderCard;