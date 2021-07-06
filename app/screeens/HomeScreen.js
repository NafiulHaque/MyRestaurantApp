import React, { Component, useEffect } from "react";
import { View, Text, StyleSheet, Platform, FlatList } from "react-native"
import HomeCard from "../components/HomeCard";
import { connect } from "react-redux";
import { getDishes, selectCat } from "../redux/actionCreators";


const mapStateToProps = state => {

    return {
        dishes: state.dishes,
        category: state.category,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getDishes: () => dispatch(getDishes()),
        selectCat: item => dispatch(selectCat(item)),
    }
}

class HomeScreen extends Component {

    componentDidMount() {

        this.props.getDishes();
        // console.log(this.props);

        //console.log(this.props.category);

    }

    render() {



        let cl = "white";
        let bgc = "crimson";
        const cate = this.props.category;
        const cati = this.props.dishes.map(item => this.props.dishes[item.id] == item ? item.category : "");

        var catag = cati.filter(value => Object.keys(value).length !== 0);
        var cat = catag.reduce((c, n) =>
            c.find(el => el == n) ? c : [...c, n], []);

        // console.log(medios);

        const dish = this.props.dishes.map(item => this.props.dishes[item.id].category == cate ? item : "");
        var di = dish.filter(value => Object.keys(value).length !== 0);
        // console.log(newArray);
        const isSelected = cat.some(item => item === this.props.category);
        const Selection = item => {

            if (isSelected) {
                this.props.selectCat(item);
            } else {
                this.props.selectCat(item);
            }
        }

        let dishe = this.props.dishes;
        if (isSelected) {
            dishe = di;
        } else {
            dishe = this.props.dishes;
        }



        return (

            <View style={styles.view} >

                <FlatList data={cat}
                    numColumns={3}
                    keyExtractor={item => item.toString()}
                    renderItem={({ item }) => (
                        <View style={{
                            flex: 1,
                            height: 40,
                            textAlign: "center",
                            alignItems: "center",
                        }}>
                            <Text style={{
                                marginRight: 16,
                                width: 90,
                                textAlign: "center",
                                borderWidth: 1,
                                borderColor: "red",
                                marginTop: 7,
                                borderRadius: 10,
                                backgroundColor: item == this.props.category ? "crimson" : "white",
                                color: item == this.props.category ? "white" : "crimson",

                            }}
                                onPress={() => Selection(item)}
                            >
                                {item}
                            </Text>
                        </View>
                    )}
                />
                <FlatList
                    numColumns={2}
                    data={dishe}
                    renderItem={({ item }) => (<HomeCard item={item}
                        selectDish={() =>
                            this.props.navigation.navigate("Dish Detail", { dish: item })} />
                    )}
                    keyExtractor={item => item.id.toString()}
                    style={{
                        marginBottom: 40,
                    }}
                />
                <Text></Text>
            </View>

        )
    }

}

const styles = StyleSheet.create({
    view: {
        marginHorizontal: 16,
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);