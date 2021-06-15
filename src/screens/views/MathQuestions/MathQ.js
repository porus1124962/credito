import React, { Component } from "react";
import { 
    View,
    Image,
    Dimensions
} from "react-native";
import styles from '../../styles/MathQStyle';
import Header from '../../components/Header';
import GamesButton from '../../components/GamesButton';
import {DrawerActions, createDrawerNavigator} from 'react-navigation';
import * as firebase from 'react-native-firebase';

const width = Dimensions.get('window').width; //full width

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

class MathQ extends Component {

    static navigationOptions = {
        drawerLabel: 'Math Questions',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../../../drawables/images/sidebar/calc.png')}
            style={[{tintColor: tintColor, width: 24, height : 24}]}
          />
        ),
    };

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Header propsRef={this.props} goBack={true} title="Math Questions" />
                <GamesButton title="Easy" 
                    img={require("../../../drawables/images/easy.jpg")}
                    onPress={()=> this.props.navigation.navigate('MathAskQ',{ type : 'Easy'})}
                 />
                 <GamesButton title="Hard" 
                    img={require("../../../drawables/images/hard.jpg")}
                    onPress={()=> this.props.navigation.navigate('MathAskQ',{ type : 'Hard'})}
                 />
                 <Banner
                        // unitId="ca-app-pub-9879472653351292/4289694375"
                        //test id
                        unitId={__DEV__ ?"ca-app-pub-3940256099942544/6300978111" : "ca-app-pub-9879472653351292/9608002334"}
                        size={Math.floor(width)+"x200"}
                        request={request.build()}
                        // onAdLoaded={() => {
                        //     console.warn("ad loaded");
                        // }}
                        // onAdFailedToLoad={(err) => {
                        //     console.warn("fail to load"+err);
                        // }}
                    />
            </View>
        );
    }
}
export default MathQ;


