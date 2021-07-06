import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Platform } from "react-native"
import Constants from 'expo-constants';

const CheckOut = () => {
    return (
        <SafeAreaView>
            <View style={styles.view}>
                <Text>CheckOut</Text>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    view: {
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    }
})

export default CheckOut;