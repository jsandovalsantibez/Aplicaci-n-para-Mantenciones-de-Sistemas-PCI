import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Boton = (props) => {
    const { onPress, text } = props

    return(
        <TouchableOpacity
        style={ style.buttonContainer }
        onPress = { onPress }
        >
            <Text style = { StyleSheet.buttonText }>
                { text }
            </Text>
        </TouchableOpacity>
    )
}
export default Boton;

const style = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#34434D',
        marginBottom: 10,
        paddingHorizontal: 150,
        paddingVertical: 15,
        borderRadius: 10,
        margin: 35,
    },

    buttonText: {
        color: '#f9f9f9'
    },
})
