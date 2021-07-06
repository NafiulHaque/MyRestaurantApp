import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Platform, TextInput, Button } from "react-native"
import Constants from 'expo-constants';
import { connect } from "react-redux";
import { auth } from "../redux/authActionCreator";
import { Formik } from 'formik';


const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}



class Login extends Component {
    state = {
        mode: "Sign Up",
    }


    switchModeHandler = () => {
        this.setState({ mode: this.state.mode === "Sign Up" ? "LogIn" : "Sign Up" })
    }
    render() {
        return (
            <SafeAreaView style={styles.container} >
                <View style={styles.view}>
                    <Formik
                        initialValues={
                            {
                                email: "",
                                password: "",
                                passwordConfirm: "",
                            }

                        }
                        onSubmit={
                            (values) => {
                                this.props.auth(values.email, values.password, this.state.mode)
                            }
                        }
                        validate={(values) => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Required';

                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = 'Invalid email address';
                            }

                            if (!values.password) {
                                errors.password = 'Required';
                            } else if (values.password.length < 4) {
                                errors.password = 'Must be atleast 4 characters!';
                            }
                            if (this.state.mode === "Sign Up") {
                                if (!values.passwordConfirm) {
                                    errors.passwordConfirm = 'Required';

                                } else if (values.password !== values.passwordConfirm) {
                                    errors.passwordConfirm = 'Password field dose not match!'
                                }
                            }

                            // console.log(errors);
                            return errors;
                        }}

                    >

                        {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
                            <View>
                                <View style={styles.logindiv}>
                                    <Text style={styles.login}>{this.state.mode === "Sign Up" ? "Sign Up" : "Login"}</Text>
                                    <Text style={styles.signin}>Sign in to your account</Text>
                                </View>

                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    placeholder="  Enter your email"
                                    keyboardType="default"
                                    autoCompleteType="email"
                                />
                                <Text style={{ color: "red" }}>{errors.email}</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    placeholder="  Password"
                                    // placeholderTextColor="red"
                                    // inlineImageLeft='search_icon'
                                    keyboardType="numeric"
                                    blurOnSubmit={true}
                                // caretHidden={true}
                                />
                                <Text style={{ color: "red" }}>{errors.password}</Text>
                                {this.state.mode === "Sign Up" ? <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('passwordConfirm')}
                                    onBlur={handleBlur('passwordConfirm')}
                                    value={values.passwordConfirm}
                                    placeholder="  Confirm Password"
                                // placeholderTextColor="red"
                                // inlineImageLeft='search_icon'

                                // caretHidden={true}
                                /> : null}
                                <Text style={{ color: "red" }}>{errors.passwordConfirm}</Text>
                                <Text style={{
                                    textAlign: "right",
                                    marginRight: 16,
                                }}>Forgot password?</Text>
                                <View style={styles.button}>
                                    <Button
                                        //onPress={onPressLearnMore}
                                        title="Submit"
                                        color="crimson"
                                        onPress={handleSubmit}
                                    />

                                </View>
                                <Text style={styles.signup} onPress={this.switchModeHandler}>{this.state.mode === "Sign Up" ? "I have a account. Login" : "Don't have a account? Sign Up"}</Text>

                            </View>
                        )}

                    </Formik>
                </View>
            </SafeAreaView >
        )
    }
}

const styles = StyleSheet.create({
    view: {
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    login: {
        //flex: 3,
        fontSize: 40,
        color: "crimson",

        width: "100%",
        textAlign: "center",
        fontWeight: "800",

        // justifyContent: "center",
        // alignItems: "center",
    },
    logindiv: {
        // flex: 1,
        alignItems: "center"

    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,
    },
    button: {
        marginVertical: 16,

    },
    signup: {
        textAlign: "center"
    }
})


export default connect(null, mapDispatchToProps)(Login);
