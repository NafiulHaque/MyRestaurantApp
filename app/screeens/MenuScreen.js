import React, { useEffect } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { connect } from "react-redux";
import { getDishes } from "../redux/actionCreators";

import MenuItem from "../components/MenuItem";


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDishes: () => dispatch(getDishes()),
    }
}
const MenuScreen = (props) => {
    useEffect(() => {
        props.getDishes();
    }, [])
    console.log(props.dishes, "dishes........");
    return (
        <View>
            <FlatList
                data={props.dishes}
                renderItem={
                    ({ item }) => (<MenuItem item={item}
                        selectDish={() =>
                            props.navigation.navigate("Dish Detail", { dish: item })} />)
                }
                keyExtractor={item => item.id.toString()}
            />

        </View>
    )

}

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);