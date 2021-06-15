import React, { Component } from "react";
import { 
    View,
    Image,
    ScrollView,
    Dimensions
} from "react-native";
import {DrawerActions, createDrawerNavigator} from 'react-navigation';
import styles from '../../styles/GamesStyle';
import Header from '../../components/Header';
import GamesButton from '../../components/GamesButton';
import * as firebase from 'react-native-firebase';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
// if(__DEV__){
//     //awais devices
//     request.addTestDevice('F1FEBC415DAECCF42E9948D48CF1BFCF');
//     request.addTestDevice('97F21EC64A29AC3DF6C64BFC93798E1D');
//     //awais Memu
//     request.addTestDevice('EE7C923BD5C4D38909F2B512A0769215');
//     //awais J5
//     request.addTestDevice('E38908D79098EAC9E3A76BDA52CC613B');
//     //awais J5
//     request.addTestDevice('E38908D79098EAC9E3A76BDA52CC613B');
//     //shafqat emulator
//     request.addTestDevice('1F430FFA07024F7445408D989AA86270');
//     //zeeshan device
//     request.addTestDevice('E2384E571AA22154CC887BCBB81225EC');
// }

class Games extends Component {

    static navigationOptions = {
        drawerLabel: 'Games',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../../../drawables/images/sidebar/games.png')}
            style={[{tintColor: tintColor, width: 24, height : 24}]}
          />
        ),
    };
    
    render() {
        return (
            <View>
                <Header propsRef={this.props} goBack={true} title="Games" />
                <ScrollView style={{backgroundColor: '#000'}}>
                    <View style={styles.paddingBottom}>

                        <GamesButton title="Amaze Lines"
                            img={require("../../../drawables/images/games/amazeLines.png")}
                            onPress={()=> this.props.navigation.navigate('AmazeLevels')}
                        />

                        <GamesButton title="Big Reward"
                            img={require("../../../drawables/images/games/bigReward.jpg")}
                            onPress={()=> this.props.navigation.navigate('BigReward')}
                        />

                        <GamesButton title="2048"
                            img={require("../../../drawables/images/games/2048.jpg")}
                            onPress={()=> this.props.navigation.navigate('Num2048')}
                        />

                        <GamesButton title="Tic Tac Toe" 
                            img={require("../../../drawables/images/games/tictac.jpg")}
                            onPress={()=> this.props.navigation.navigate('TicTacToe')}
                        />
                        {/* <Banner style={styles.ad}
                            unitId="ca-app-pub-9879472653351292/3562393499"
                            //test id
                            // unitId="ca-app-pub-3940256099942544/6300978111"
                            size={Math.floor(width)+"x100"}
                            request={request.build()}
                            // onAdLoaded={() => {
                            //     console.warn("ad loaded");
                            // }}
                            // onAdFailedToLoad={(err) => {
                            //     console.warn("fail to load"+err);
                            // }}
                        /> */}
                        <GamesButton title="Word Completion" 
                            img={require("../../../drawables/images/games/wordC.jpg")}
                            onPress={()=> this.props.navigation.navigate('WordCompletion')}
                        />
                        {/* <Banner style={styles.ad}
                            unitId="ca-app-pub-9879472653351292/3562393499"
                            //test id
                            // unitId="ca-app-pub-3940256099942544/6300978111"
                            size={Math.floor(width)+"x100"}
                            request={request.build()}
                            // onAdLoaded={() => {
                            //     console.warn("ad loaded");
                            // }}
                            // onAdFailedToLoad={(err) => {
                            //     console.warn("fail to load"+err);
                            // }}
                        /> */}
                        <GamesButton title="Love Calculator"
                            img={require("../../../drawables/images/games/loveC.jpg")}
                            onPress={()=> this.props.navigation.navigate('CountLove')}
                        />

                        <Banner style={styles.ad}
                            // unitId="ca-app-pub-9879472653351292/3562393499"
                            //test id
                            unitId={__DEV__ ?"ca-app-pub-3940256099942544/6300978111" : "ca-app-pub-9879472653351292/9608002334"}
                            size={Math.floor(width)+"x100"}
                            request={request.build()}
                            // onAdLoaded={() => {
                            //     console.warn("ad loaded");
                            // }}
                            // onAdFailedToLoad={(err) => {
                            //     console.warn("fail to load"+err);
                            // }}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}
export default Games;