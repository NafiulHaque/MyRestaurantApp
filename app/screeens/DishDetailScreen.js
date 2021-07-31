import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native"
import Icon from '../components/Icon';
import { connect } from "react-redux";
import { addToCart, addToFavourites, removeFromCart } from "../redux/actionCreators";
import { removeFromFavourites } from "../redux/actionCreators";
const mapStateToProps = state => {
    return {
        favourites: state.favourites,
        cart: state.cart,

    }
}
const mapDispatchToProps = dispatch => {
    return {
        addToFavourites: dish => dispatch(addToFavourites(dish)),
        removeFromFavourites: dish => dispatch(removeFromFavourites(dish)),
        addToCart: dish => dispatch(addToCart(dish)),
        removeFromCart: dish => dispatch(removeFromCart(dish)),
    }
}


const DishDetailScreen = props => {

    const dish = props.route.params.dish;

    const isFavourite = props.favourites.some(item => item.id === dish.id);
    const isInCart = props.cart.some(item => item.id === dish.id);
    const markFavourite = dish => {
        if (isFavourite) {
            //alert("Already added to favourites!");
            props.removeFromFavourites(dish);

        } else {
            props.addToFavourites(dish);

        }

    }
    const markCart = dish => {
        if (isInCart) {
            //remove
            props.removeFromCart(dish);
        } else {
            props.addToCart(dish);
            // console.log("is in cca");
        }
    }

    let iconName = "ios-heart-outline";
    if (isFavourite) {
        iconName = "ios-heart-sharp";
    }

    let cartbg = "white";
    let cartname = "Add to Cart";
    if (isInCart) {
        cartbg = "crimson";
        cartname = "Added";
    }


    return (
        <View>
            <Image source={{ uri: dish.image }} style={styles.image} />
            <View style={styles.details}>
                <Icon name={iconName}
                    color="#f53b50" size={39}
                    iconStyle={{ width: "30%" }}
                    action={() => markFavourite(dish)} />
                <Text style={styles.price}>{dish.price} Tk</Text>
                <Text>{dish.description}</Text>
            </View>
            <View style={styles.buttonGroup}>

                <Text style={styles.orderbtn}

                    onPress={() => (isInCart ? null : props.addToCart(dish)) & props.navigation.navigate("Cart", dish)}

                >Order Now</Text>
                <Text style={styles.cartbtn}
                    style={{
                        backgroundColor: cartbg,
                        color: isInCart ? "white" : "black",
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "#f53b50",
                        borderRadius: 5,
                        textAlign: "center",
                        justifyContent: "center",
                        padding: 5,
                        marginHorizontal: 5,
                    }}
                    onPress={() => markCart(dish)}
                >{cartname}</Text>

            </View>
        </View >
    )

}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300,
    },
    name: {
        fontSize: 20,
        fontWeight: "500",

    },
    price: {
        width: "20%",
        borderWidth: 1,
        borderColor: "#f53b50",
        padding: 4,
        borderRadius: 16,
        textAlign: "center",
        margin: 10,
        height: 30,
        color: "white",
        backgroundColor: "#f53b50",
    },
    details: {
        // flex: 1,
        padding: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginHorizontal: 16,

    },
    buttonGroup: {
        marginHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-around",
        borderTopWidth: 2,
        borderColor: "#f53b50",
        paddingTop: 16,

    },
    orderbtn: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#f53b50",
        borderRadius: 5,
        textAlign: "center",
        justifyContent: "center",
        padding: 5,
        marginHorizontal: 5,
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(DishDetailScreen);