import React, { Component } from "react";
import { 
    View,
    Text,
    TextInput,
    Dimensions,
    ScrollView,
    AsyncStorage
} from "react-native";
import styles from '../../styles/loveStyle';
import * as C from '../../components/Common';
import Header from '../../components/Header';
import * as firebase from 'react-native-firebase';
const firestore = firebase.firestore();
import {Button} from 'react-native-elements';
import * as AlertBox from '../../components/AlertBox';

const {width,height} = Dimensions.get('window');

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

class LoveGame extends Component {
    constructor(props){
        super(props);
        this.state = {
            num : "",
            name1:'',
            name2:'',
            // rateFrom: 0,
            // rateTo: 0,
            coins: global.coins,
            addCoins:0
        }
        this.calculate = this.calculate.bind(this);
        this.love = this.love.bind(this);
    }

    // componentDidMount(){
    //     AsyncStorage.getItem("controlRates").then(value=>{
    //         try{
    //             //finding rates
    //             const controlRates = JSON.parse(value);
    //             const rateFrom = controlRates.LoveCalculator.from;
    //             const rateTo = controlRates.LoveCalculator.to;
    //             this.setState({
    //                 rateFrom : rateFrom,
    //                 rateTo : rateTo
    //             });
    //         }catch(err){
    //             C.showNetworkErrorAlert();
    //             C.Toast("Somthing Wrong! Restart Credito If Problem Remains Please Re-Authenticate Your Account Err7404");
    //             C.Toast("Somthing Wrong! Restart Credito If Problem Remains Please Re-Authenticate Your Account Err7404");
    //         }
    //     });
    // }

    componentWillUnmount(){
        this.state = {
            num : "",
            name1:'',
            name2:'',
        }
    }

    love(array) {
		var hold = [],
				result,
				newArray;
		if (array.length > 2) {
            newArray = array.map(function(item, index, array) {
                return item + array[index + 1];
            });
            newArray.forEach(function(item) {
                    if (typeof item === "number" && !isNaN(item)) {
                        if (item < 10) {
                            hold.push(item);
                        } else if (item > 9) {
                            hold.push(parseInt(item.toString()[0]));
                            hold.push(parseInt(item.toString()[1]));
                        }
                    }
            });
            this.love(hold);
		} else {
            var res = parseInt(array[0]+""+array[1]);
            if(res < 50){
                res = res + C.getRandomNo(25,50);
            }
            result = res + "%";
            this.setState({
                num: result,
                name1: '',
                name2: ''
            });
            try{
                //finding rates
                const rateFrom = global.controlRates.LoveCalculator.from;
                const rateTo = global.controlRates.LoveCalculator.to;
                C.updateRandomCoinsV2(rateFrom,rateTo,7,(addCoins,b)=>{
                    this.setState({coins: global.coins})
                    global.active = true;
                    this.setState({addCoins:addCoins})
                });
            }catch(err){
                C.showNetworkErrorAlert();
                C.Toast("Somthing Wrong! Restart Credito Err7404");
            }
            return result;
		}
    }

    calculate() {
        var input1 = this.state.name1,
            input2 = this.state.name2,
			loves = ["l", "o", "v", "e", "s"],
			countArray = [],
            count,
            names,
            jointNames;
		if (!input1 || !input2) {
				C.Toast("Please enter both names.");
		} else {
            names = "" + input1 + "" + input2 + "";
            jointNames = names.toLowerCase();
            countArray = loves.map(function(item) {
                    count = 0;
                    for (var i = 0; i < jointNames.length; i += 1) {
                            if (item === jointNames[i]) {
                                    count += 1;
                            }
                    }
                    return count;
            });
            this.love(countArray);
		}
    }

    render() {
        return (
            <View style={styles.container}>
                <Header coins={this.state.coins} propsRef={this.props} disSubHead={false} goBack={true} title="Love Calculator" />
                <AlertBox.CoinsAlert coins = {this.state.addCoins}/>
                <ScrollView>
                    <View style={styles.subContainer}>
                            <Text style={styles.head}>Enter Your Name</Text>
                            <TextInput style={[styles.box,styles.heading]} value={this.state.name1} onChangeText={(value)=>{
                                this.setState({
                                    name1:value
                                });
                            }} placeholder="Enter Here" placeholderTextColor="#000" />
                            <Text style={styles.head}>Enter Your Crush Name</Text>
                            <TextInput style={[styles.box,styles.heading]} value={this.state.name2} onChangeText={(value)=>{
                                this.setState({
                                    name2:value
                                });
                            }} placeholder="Enter Here" placeholderTextColor="#000" />
                        <Text style={styles.res}>{this.state.num}</Text>
                        <Button title=" Calculate Love "
                            buttonStyle={styles.btn} titleStyle={{color: '#00f7d2'}}
                            type="outline" onPress={this.calculate}>
                        </Button>
                        <Banner
                            // unitId="ca-app-pub-9879472653351292/1505886429"
                            //test id
                            unitId={__DEV__ ?"ca-app-pub-3940256099942544/6300978111" : "ca-app-pub-9879472653351292/9608002334"}
                            size={Math.floor(width)+"x300"}
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
export default LoveGame;