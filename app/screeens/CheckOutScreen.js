import React from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, CheckBox } from "react-native"
import { Formik } from 'formik';
import { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

const mapStateToProps = state => {
    return {
        cart: state.cart,
        userId: state.userId,
        token: state.token,


    }
}


const mapDispatchToProps = dispatch => {
    return {

    }
}



class CheckOut extends Component {
    state = {
        checkbox: "Cash on Delivery",
        checked: true,
    }

    switchcheckHandler = () => {
        this.setState({ checkbox: this.state.checkbox === "Cash on Delivery" ? "BCash" : "Cash on Delivery" })
    }


    render() {
        console.log(this.state.checkbox);




        return (

            <View style={styles.view}>
                <Formik
                    initialValues={
                        {
                            delivaryAddress: "",
                            phoneNumber: "",
                            paymentType: this.state.checkbox,
                        }

                    }



                    onSubmit={
                        (values) => {
                            const order = {
                                cart: this.props.cart,
                                userId: this.props.userId,
                                customer: values,
                                orderTime: new Date(),
                                totalPrice: this.props.route.params,

                            };
                            console.log(order);
                            axios.post("https://myapp-c3e74-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth=" + this.props.token, order)
                                .then(response => {
                                    if (response.status == 200) {
                                        console.log("order success");
                                    } else {
                                        console.log("unsuccessfull");
                                    }
                                })


                        }
                    }
                    validate={(values) => {
                        const errors = {};
                        if (!values.delivaryAddress) {
                            errors.delivaryAddress = 'Required';

                        }

                        if (!values.phoneNumber) {
                            errors.phoneNumber = 'Required';
                        } else if (values.phoneNumber.length < 11) {
                            errors.phoneNumber = 'Must be atleast 11 characters!';
                        }


                        // console.log(errors);
                        return errors;

                    }}

                >

                    {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
                        <View>
                            <View style={styles.pricediv}>
                                <Text style={styles.price}>Total Price</Text>
                                <Text style={styles.price}>{this.props.route.params} ৳</Text>
                            </View>

                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                style={styles.inputaddress}
                                onChangeText={handleChange('delivaryAddress')}
                                onBlur={handleBlur('delivaryAddress')}
                                value={values.delivaryAddress}
                                placeholder="  Enter your delivaryAddress"
                                keyboardType="default"
                                autoCompleteType="street-address"
                            />
                            <Text style={{ color: "red" }}>{errors.delivaryAddress}</Text>

                            <TextInput
                                style={styles.inputphoneNumber}
                                onChangeText={handleChange('phoneNumber')}
                                onBlur={handleBlur('phoneNumber')}
                                value={values.phoneNumber}
                                placeholder="  Phone Number"
                                // placeholderTextColor="red"
                                // inlineImageLeft='search_icon'
                                keyboardType="numeric"
                                blurOnSubmit={true}
                                autoCompleteType="tel"
                            />
                            <Text style={{ color: "red" }}>{errors.phoneNumber}</Text>
                            <Text>Payment Method:</Text>
                            <TouchableOpacity style={styles.checkboxdiv}
                                onPress={(this.switchcheckHandler)}
                            >
                                <Text style={styles.checkboxtext} onPress={this.switchcheckHandler}>Cash On delivery</Text>
                                <CheckBox
                                    title='value1'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    value={this.state.checkbox === "Cash on Delivery" ? true : false}
                                    // checked={this.state.checked}
                                    //onPress={() => this.setState({ radioButton: 'value1' })}
                                    onPress={this.switchcheckHandler}
                                />
                                {/* <CheckBox
                            // checkedIcon={<Image source={require('../checked.png')} />}
                            // uncheckedIcon={<Image source={require('../unchecked.png')} />}
                            // checked={this.state.checked}
                            // onPress={() => this.setState({ checked: !this.state.checked })}
                            /> */}

                            </TouchableOpacity>
                            <TouchableOpacity style={styles.checkboxdiv} onPress={this.switchcheckHandler}>
                                <Text style={styles.checkboxtext} onPress={this.switchcheckHandler}>BCash</Text>
                                <CheckBox
                                    title='value1'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    value={this.state.checkbox === "BCash" ? true : false}
                                    // checked={this.state.checked}
                                    // onPress={() => this.setState({ checked: false })}
                                    //checked={this.state.radioButton === 'value1'}
                                    onPress={() => this.switchcheckHandler}
                                />

                            </TouchableOpacity>

                            <Text style={{ color: "red" }}>{errors.paymentType}</Text>

                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text
                                    style={styles.btntext}

                                > Submit</Text>

                            </TouchableOpacity>


                        </View>
                    )}

                </Formik>
            </View>

        )

    }


}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        marginHorizontal: 16,
    },
    pricediv: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 2,
        borderColor: "grey",
        marginBottom: 10,
    },
    price: {
        fontSize: 20,
        fontWeight: "800",
    },
    inputaddress: {
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        height: 70,
        paddingLeft: 10,
    },
    inputphoneNumber: {
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        padding: 5,
        paddingLeft: 10,
    },
    checkboxdiv: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 10,
        elevation: 1,
        padding: 7,
        marginVertical: 5,
        width: "100%",
        zIndex: 5,
    },
    checkboxtext: {
        // width: "80%",
    },
    button: {
        backgroundColor: "crimson",
        width: "100%",
        // fontWeight: "900",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 150,
    },
    btntext: {
        fontWeight: "900",
        fontSize: 18,
        padding: 5,
        color: "white",
    }


})

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);