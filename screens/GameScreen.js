import React, { useState, useRef, useEffect } from "react";
import {View, StyleSheet, Text, Alert, Dimensions, FlatList} from 'react-native';

import {Ionicons} from '@expo/vector-icons'
import Card from "../components/Card";
import NumberContainer from "../components/NumberConatiner";
import MyButton from "../components/MyButton";
const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomInt = Math.floor(Math.random() * (max - min)) + min;
    if (randomInt === exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    else {
        return randomInt; 
    }
}

const renderListItem = (listLength , itemData) => {
    return (
        <View style={styles.listItem}>
            <Text>#{listLength - itemData.index}</Text>
            <Text>{itemData.item }</Text>
        </View>
    )
}
const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses ] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    
    const {userChoice, onGameOver} = props;
    useEffect(() => {
        if (currentGuess === userChoice) {
            props.onGameOver(pastGuesses.length);
        }
    }, [currentGuess, onGameOver, userChoice])
    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t Lie!', 
                'You know this is wrong', 
                [{text: 'Sorry', style: 'cancel'}]);
            return;     
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        }
        else {
            currentLow.current = currentGuess + 1
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setNumberOFRounds(curRounds => curRounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
    }
    return (
        <View style={styles.screen}>
            <Text> Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MyButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MyButton>
                <MyButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white"/>
                </MyButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList 
                    keyExtractor={item => item} 
                    data={pastGuesses} 
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: Dimensions.get('window').width * .8,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10
    },
    listItem: {
        borderColor : '#ccc',
        borderWidth : 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection : "row",
        justifyContent: 'space-around',
        width : '60%'
    },
    listContainer : {
        flex: 1,
        width : Dimensions.get('window').width > 300 ? '80%' : '90%'
    },
    list: {
        flexGrow : 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})


export default GameScreen;