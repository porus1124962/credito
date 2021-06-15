import React, {Component} from 'react';
import {
    View,
    ActivityIndicator,
} from 'react-native';
import styles from '../screens/styles/CStyle';
import * as firebase from 'react-native-firebase';

export default class AuthChecker extends Component{

    constructor(props) {
        super(props);
        this.selectScreen();
    }

    selectScreen = async () => {
        if(firebase.auth().currentUser === null){
            this.props.navigation.navigate("Intro",{navToHome: false});
        }else{
            this.props.navigation.navigate("Main");
        }
    };

    render(){
        return(
            <View style={{backgroundColor: '#fff' , flex: 1 , justifyContent: 'center'}}>
                <ActivityIndicator size="large" style={styles.loading} color='#62ef64' size={60}/>
            </View>
        );
    }
}