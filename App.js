import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import * as Font from 'expo-font'
import {AppLoading} from 'expo'

const fetchFonts = () => {
	Font.loadAsync({
		'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf')
	})
}
export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [guessRounds, setGuessRounds] = useState(0);
	// const [dataLoaded, setDataLoaded] = useState(false);
	
	// if (!dataLoaded) {
	// 	return (
	// 		<AppLoading 
	// 			startAsync={fetchFonts} 
	// 			onFinish={()=> {setDataLoaded(true)}}
	// 			onError={(err) => {console.log(err)}}
	// 		/>
	// 	)
	// }
	const configureNewGameHandler = () => {
		setGuessRounds(0);
		setUserNumber(null);
	}

	const startGameHandler = (selectedNumber) => {
		setUserNumber(selectedNumber);
		setGuessRounds(0);
	}
	const gameOverHandler = numberOfRounds => {
		setGuessRounds(numberOfRounds);
	}
	let content = <StartGameScreen onStartGame={startGameHandler} />
	if (userNumber && guessRounds <= 0) {
		content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
	}
	else if (guessRounds > 0) {
		content = <GameOverScreen onRestart={configureNewGameHandler} userNumber={userNumber} rounds={guessRounds}/>
	}
	return (
		<View style={styles.screen}>
			<Header title={"Guess a Number"} />
			{content}
			<StatusBar style="auto" />

		</View>
	);
}
const styles = StyleSheet.create({
	screen: {
		flex: 1
	},
});
