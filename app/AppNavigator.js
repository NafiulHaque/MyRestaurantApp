import React, { Component } from "react";
import { View, Text } from "react-native"
import HomeScreen from "./screeens/HomeScreen";
import MenuScreen from "./screeens/MenuScreen";
import FavouritesScreen from "./screeens/FavouritesScreen";
import Login from "./screeens/LoginScreen";
import Logout from "./screeens/Logout";
import CheckOut from "./screeens/CheckOutScreen";
import Cart from "./screeens/Cart";
import DishDetailScreen from "./screeens/DishDetailScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from './components/Icon';
import { Switch, Route, Redirect, NativeRouter } from 'react-router-native';
import { useNavigation } from "@react-navigation/native";
import { connect } from 'react-redux';
import { authCheck } from './redux/authActionCreator';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const mapStateToProps = state => {
    return {
        token: state.token,
        categories: state.categories,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    }
}



const MenuStack = () => {

    const navigation = useNavigation();
    return (
        <Stack.Navigator
            screenOptions={{

                headerRight: () => (<Icon
                    action={() => navigation.toggleDrawer()}
                    name="ios-menu"
                    color="black"
                    size={24}
                    iconStyle={{ padding: 15 }} />),
                headerStyle: {
                    backgroundColor: '#f53b50',

                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}
        >
            <Stack.Screen name="Menu" component={MenuScreen} />
            <Stack.Screen name="Dish Detail" component={DishDetailScreen} options={(
                { route }) => ({ title: route.params.dish.name })
            } />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Checkout" component={CheckOut} />

        </Stack.Navigator>
    )

}

const FavStack = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator
            screenOptions={{

                headerRight: () => (<Icon
                    action={() => navigation.toggleDrawer()}
                    name="ios-menu"
                    color="black"
                    size={24}
                    iconStyle={{ padding: 15 }} />),
                headerStyle: {
                    backgroundColor: '#f53b50',

                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}
        >
            <Stack.Screen name="Favourites" component={FavouritesScreen} />
        </Stack.Navigator>
    )
}
const CardStack = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator
            screenOptions={{

                headerRight: () => (<Icon
                    action={() => navigation.toggleDrawer()}
                    name="ios-menu"
                    color="black"
                    size={24}
                    iconStyle={{ padding: 15 }} />),
                headerStyle: {
                    backgroundColor: '#f53b50',

                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}
        >
            <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
    )
}

const HomeStack = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator
            screenOptions={{

                headerRight: () => (<Icon
                    action={() => navigation.toggleDrawer()}
                    name="ios-menu"
                    color="black"
                    size={24}
                    iconStyle={{ padding: 15 }} />),
                headerStyle: {
                    backgroundColor: '#f53b50',

                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Dish Detail" component={DishDetailScreen} options={(
                { route }) => ({ title: route.params.dish.name })
            } />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Checkout" component={CheckOut} />
        </Stack.Navigator>
    )
}

class AppNavigator extends Component {

    componentDidMount() {
        this.props.authCheck();
        console.log(this.props, new Date());
        // console.log(this.props.userId);
    }
    render() {
        let routes = null;
        if (this.props.token == null) {
            routes = (
                // <Stack.Navigator>
                //     <Stack.Screen name="login" component={Login} />
                // </Stack.Navigator>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <Redirect to="/login" />
                </Switch>
                //<Login />
            )
        } else {
            routes = (
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Home" component={HomeStack} />
                    <Drawer.Screen name="Menu" component={MenuStack} />
                    <Drawer.Screen name="Favourites" component={FavStack} />
                    <Drawer.Screen name="Cart" component={CardStack} />
                    <Drawer.Screen name="Logout" component={Logout} />
                </Drawer.Navigator>

            )
        }

        return (

            <NativeRouter>
                {routes}
            </NativeRouter>
        )
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);