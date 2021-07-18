import React from "react";
import { Component } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native"
import { connect } from "react-redux";
import { fetchOrders } from "../redux/actionCreators";
import OrderCard from "../components/OrderCard";
const mapStateToProps = state => {
    return {
        orders: state.orders,
        userId: state.userId,
        token: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
    }
}



class OrderScreen extends Component {
    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }

    componentDidUpdate() {
        //console.log(this.props.orders, "Orders........");
    }
    render() {

        const jon = this.props.orders;
        const orde = Object.values(jon);
        const keyval = Object.keys(jon);
        console.log(keyval);

        return (

            <View style={styles.view} >


                {/* <FlatList data={orde}
                    // numColumns={3}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (<OrderCard order={item} />
                        //<Text></Text>
                    )}
                /> */}

                <ScrollView>{orde.map((order, index) => { return <OrderCard order={order} key={index} /> })}</ScrollView>
            </View>

        )



    }


}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        // marginHorizontal: 16,
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);