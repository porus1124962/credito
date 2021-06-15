import React, { Component } from "react";
import { 
    View,
    ScrollView,
    Dimensions,
    Linking
} from "react-native";
import styles from '../../styles/AppMarketStyle';
import AppMarketButton from '../../components/AppMarketButton';
import Header from '../../components/Header';
import * as firebase from 'react-native-firebase';

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
let {width,height} = Dimensions.get('window');

// if(__DEV__){
//     //awais devices
//     request.addTestDevice('F1FEBC415DAECCF42E9948D48CF1BFCF');
//     request.addTestDevice('97F21EC64A29AC3DF6C64BFC93798E1D');
//     //awais Memu
//     request.addTestDevice('E94E27E5C98A2274AE9CCFF600FB4FD5');
//     //awais J5
//     request.addTestDevice('E38908D79098EAC9E3A76BDA52CC613B');
//     //awais J5
//     request.addTestDevice('E38908D79098EAC9E3A76BDA52CC613B');
//     //shafqat emulator
//     request.addTestDevice('1F430FFA07024F7445408D989AA86270');
//     //zeeshan device
//     request.addTestDevice('E2384E571AA22154CC887BCBB81225EC');
// }
export default class AppMarket extends Component {

    constructor(props){
        super(props);
        this.state = {
            coins: global.coins
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header propsRef={this.props} coins={this.state.coins} goBack={true} title="App Store"/>
                <ScrollView>
                    <AppMarketButton imageUri='https://lh3.googleusercontent.com/4_O4DWQRkTFyP_L_OXihJ86RnVNLvnTkmf3vEA7w3OFsxNEc_vGDIKdvTdrkm3-DtX-t=s180-rw'
                        titleSize = {25} iconName="dollar-sign" title="Amazy" corpName="RanaG 4 U" appRate="Rating : 5"version="Version 1.0"
                        detail="This game will AMAZE you! Swipe to move the ball and paint - You’ve got to color and paint your way across
                        the AMAZY Colors puzzles. " 
                        onPress={()=>{
                            Linking.openURL("https://play.google.com/store/apps/details?id=com.amazy").catch((err) => console.error('An error occurred', err));
                        }}
                    />
                    <AppMarketButton imageUri='https://lh3.googleusercontent.com/cBj5qhOBwCjbs2wNGRLO9WOZ6Ozuy31824SPJ3HzjGwjt5eDmYrGEZHPSgeHYrdAdg=s180-rw'
                        titleSize = {25} iconName="dollar-sign" title="2048-Target" corpName="RanaG 4 U" appRate="Rating : 5" version="Version 1.0"
                        detail="Nice Challenging Game 2048. Join the Tiles and Reach To 2048.
                                1) Nice & Simple User Interface
                                2) Beautiful Design
                                3) Smooth Playing
                                4) HD Graphics
                                5) Changing Backgrounds
                                6) Swipe To Play
                                7) & Much more to get excited

                                We hope you will like it." 
                        onPress={()=>{
                            Linking.openURL("https://play.google.com/store/apps/details?id=com.ranag4u.g2048").catch((err) => console.error('An error occurred', err));
                        }}
                    />

                    <Banner
                        // unitId="ca-app-pub-9879472653351292/1408380163"
                        //test id
                        unitId= {__DEV__ ? "ca-app-pub-3940256099942544/6300978111" : "ca-app-pub-9879472653351292/9608002334"}
                        size={Math.floor(width)+"x300"}
                        request={request.build()}
                        // onAdLoaded={() => {
                        //     console.warn("ad loaded");
                        // }}
                        // onAdFailedToLoad={(err) => {
                        //     console.warn("fail to load"+err);
                        // }}
                    />
                </ScrollView>
            </View>
        );
    }
}