import React, {useState} from 'react';
import { View,
     Text, 
     StyleSheet, 
     Button, 
     TouchableWithoutFeedback, 
     Keyboard,
     ScrollView,
     Alert, 
     KeyboardAvoidingView } from 'react-native';
import Colors from '../constants/colors'
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberConatiner';
import MyButton from '../components/MyButton';
const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                "Invalid Number", 
                "Enter a Number between 1 to 99", 
                [{text: 'OK', style: 'destructive'  , onPress : resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(parseInt(enteredValue))
        setEnteredValue('');
        Keyboard.dismiss();
    }
    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.sumarryContainer}>
                <Text> Choosen Number : {selectedNumber}</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MyButton onPress={()=>{props.onStartGame(selectedNumber)}}>
                    START GAME
                </MyButton>
                {/* <Button title='START GAME' onPress={()=>{props.onStartGame(selectedNumber)}}/> */}
            </Card>
        )
    }
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback  onPress={()=> {
            Keyboard.dismiss()
        }}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start A New Game</Text>
            <Card style={styles.inputContainer}>
                <Text>Select A Number</Text>
                <Input 
                    style={styles.input} 
                    blurOnSubmit 
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="number-pad"
                    maxLength={2}
                    onChangeText={numberInputHandler}
                    value={enteredValue}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.btn}><Button title="Reset" onPress={resetInputHandler} color={Colors.accent} /></View>
                    <View style={styles.btn}><Button title="Start" onPress={confirmInputHandler} color={Colors.primary} /></View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center'
    },
    btn: {
        width: 80
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    sumarryContainer : {
        marginTop: 20,
        alignItems: 'center'
    }
})

export default StartGameScreen;