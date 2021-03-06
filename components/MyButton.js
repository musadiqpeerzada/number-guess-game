import React from 'react';
import {Text, View,TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../constants/colors'
const MyButton = props => {
    return(
        <TouchableOpacity onPress={props.onPress} activeOpacity={.6}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor : Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius : 25
    },
    buttonText: {
        color : 'white',
        fontSize: 18
    }
})

export default MyButton;