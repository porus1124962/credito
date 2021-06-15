import React, { Component } from "react";
import {StatusBar,View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import SplashScreen from 'react-native-splash-screen';

const slides = [
    {
        key: '1',
        title: 'Welcome',
        text: 'Credito!\nEntertenment/Learning',
        textStyle:{
            fontWeight: "bold",
            fontSize: 20,
        },
        image: require('../../../drawables/images/intro/credito.png'),
        imageStyle:  {
            width: 250,
            height: 325,
            resizeMode: 'contain'
        },
        backgroundColor: '#2c7bf9',
    },
    {
        key: '3',
        title: 'Entertainment',
        text: 'A lot of entertainment and learning',
        textStyle:{
            fontWeight: "bold",
            fontSize: 17
        },
        image: require('../../../drawables/images/intro/entertainment.png'),
        imageStyle:  {
            width: 250,
            height: 325,
            resizeMode: 'contain'
        },
        backgroundColor: '#f230a7',
    },
    {
        key: '2',
        title: 'Learning',
        text: "Solve MCQ's & More...",
        textStyle:{
            fontWeight: "bold",
            fontSize: 20
        },
        image: require('../../../drawables/images/intro/rs.png'),
        imageStyle:  {
            width: 250,
            height: 325,
            resizeMode: 'contain'
        },
        backgroundColor: '#008000',
    },
  ];

export default class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            navToHome: props.navigation.state.params.navToHome
        }
        this._onDone = this._onDone.bind(this);
    }

    _onDone = () => {
        if(this.state.navToHome == true){
            this.props.navigation.navigate("Main");
        }else{
            this.props.navigation.navigate("Login");
        }
    }

    componentDidMount(){
        SplashScreen.hide();
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="#000" barStyle="light-content" />
                <AppIntroSlider slides={slides} onDone={this._onDone}
                doneLabel="Start"/>
            </View>
        )
    }
}