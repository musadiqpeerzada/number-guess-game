import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image, ScrollView} from 'react-native';
import Colors from '../constants/colors'
import MyButton from '../components/MyButton';
const GameOverScreen = props => {
    return(
        <ScrollView>
        <View style={styles.screen}>
            <Text>The Game is Over</Text>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    // source={{uri: 'https://www.hdwallpaper.nu/wp-content/uploads/2017/11/mr_robot-11.jpg'}}
                    source={require('../assets/images/success.png')}
                    resizeMode="cover"
                />
            </View>
            <Text>Your phone needed 
                <Text style={styles.highlight}> {props.rounds} </Text> 
                attempts to guess the Number 
                <Text style={styles.highlight}> {props.userNumber} </Text>
            </Text>
            <MyButton onPress={props.onRestart}>
                RESTART
            </MyButton>
            {/* <Button title="RESTART" onPress={props.onRestart}/> */}
        </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height/ 30
    },
    image : {
        width: '100%',
        height: '100%',
    },
    highlight : {
        color: Colors.primary
    }
})

export default GameOverScreen;