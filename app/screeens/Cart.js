import React, { version } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native"
import { connect } from "react-redux";
import CartItem from "../components/cartItem";


const mapStateToProps = state => {
    return {
        cart: state.cart,
    }
}

const Cart = (props) => {


    const pr = props.cart.map(it => it.price);
    const qu = props.cart.map(it => it.quantity)
    const multArray = [];
    for (let i = 0; i < Math.min(pr.length, qu.length); i++) {
        multArray[i] = pr[i] * qu[i];
    }
    const pri = eval(multArray.join('+'));


    console.log(pri);
    return (

        <View style={styles.container}>

            <View style={styles.flatlist}>
                <FlatList
                    data={props.cart}
                    renderItem={({ item }) => (<CartItem item={item} />)}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
            <View style={styles.total}>

                <View style={styles.totalpricegrp}>
                    <Text style={styles.totalprice}>Total Price: </Text>
                    <Text style={styles.totalprice}>{pri} ৳</Text>
                </View>
                <TouchableOpacity style={styles.checkout}>
                    <Text style={styles.checkouttext}>Check Out</Text>
                </TouchableOpacity>
            </View>




        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    total: {
        padding: 20,
        backgroundColor: "#f2f2f2",
        marginHorizontal: 30,
        alignItems: "center",
        justifyContent: "space-between",
        height: 130,
        borderTopWidth: 2,
        borderColor: "grey"

    },
    flatlist: {
        flex: 1,

    },
    totalpricegrp: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    totalprice: {
        fontSize: 18,
        fontWeight: '900',
    },
    checkout: {
        backgroundColor: "crimson",
        width: "100%",
        // fontWeight: "900",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 10,

    },
    checkouttext: {
        fontWeight: "900",
        fontSize: 18,
        padding: 5,
        color: "white",
    }
})

export default connect(mapStateToProps)(Cart);