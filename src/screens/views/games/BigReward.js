import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    ScrollView,
    AsyncStorage
} from 'react-native';
import {Button} from 'react-native-elements';
import styles from '../../styles/BigRewardStyle';
import Header from '../../components/Header';
import * as C from '../../components/Common';
import * as firebase from 'react-native-firebase';
import * as AlertBox from '../../components/AlertBox';

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


// Test id
// const instertialAd = firebase.admob().interstitial("ca-app-pub-3940256099942544/1033173712");
// original id
const instertialAd = firebase.admob().interstitial(__DEV__ ? "ca-app-pub-3940256099942544/1033173712" :"ca-app-pub-9879472653351292/5110766507");

const width = Dimensions.get('window').width; //full width

class BigReward extends Component {
    constructor(props){
        super(props)
        this.state = {
            v1: 0,
            v2: 0,
            v3: 0,
            btnTitle: "Start",
            // coinData: {},
            canStop: false,
            coins: global.coins,
            addCoins:0
        }
        this.handleStartStopBtn = this.handleStartStopBtn.bind(this);
        this.calculatorHelper = this.calculatorHelper.bind(this);
    }

    handleStartStopBtn(){
        const ref = this;
        const type = this.state.btnTitle;

        if(type == "Start"){
            //start code goes here
            this.setState({canStop: false,btnTitle: 'Stop'});
            instertialAd.loadAd(request.build());
            instertialAd.on('onAdLoaded', () => {
                instertialAd.show();
            });

            this.interval = setInterval(()=>{
                var num = C.getRandomNo(10,999);
                
                //split no and set to state
                ref.calculatorHelper(num);

                if(ref.state.btnTitle == "Start"){
                    clearInterval(this.interval);
                }
            },30);
            const wait = C.getRandomNo(5,8);
            setTimeout(() => {
                this.setState({canStop: true});
            }, wait*1000);
        }else if(this.state.canStop){
            this.setState({canStop: false,btnTitle: 'Start'});
            var result;
            //code for probablity
            var no = C.getRandomNo(1,100);
            if(no < 95){
                result = C.getRandomNo(10,500);
            }else{
                result = C.getRandomNo(500,999);
            }
            //split no and set to state
            ref.calculatorHelper(result);

            const rewardType = result < 500 ? false : true;
            //give coins to user
            ref.giveReward(rewardType);
        }else{
            C.Toast("Please Wait Some Seconds To Stop!");
        }
    }

    //split no and set to state
    calculatorHelper(no){
        var noDiv = [];
        if(no < 100){
            var splited = no.toString().split("");
            noDiv[0] = 0;
            noDiv[1] = splited[0];
            noDiv[2] = splited[1];
        }else{
            noDiv = no.toString().split("");
        }
        this.setState({
            v1: noDiv[0],
            v2: noDiv[1],
            v3: noDiv[2]
        });
    }

    giveReward(rewardType){
        var data;
        try{
            data = global.controlRates.BigReward;
        }catch(err){
            C.showNetworkErrorAlert();
            C.Toast("Somthing Wrong! Restart Credito Err1404");
        }
        try{
            var from,to;
            if(rewardType){
                from = data[1000].from;
                to = data[1000].to;
            }else{
                from = data[500].from;
                to = data[500].to;
            }
            C.updateRandomCoinsV2(from,to,1,(addCoins,b)=>{
                this.setState({coins: global.coins})
                global.active = true;
                this.setState({addCoins:addCoins})
            });
        }catch(exception){
            C.Toast("Connection Is Slow / Not Working!");
        }
    }

    // componentDidMount(){
    //     AsyncStorage.getItem("controlRates").then(value=>{
    //         try{
    //             const data = JSON.parse(value).BigReward;
    //             this.setState({
    //                 coinData: data
    //             });
    //         }catch(err){
    //             C.showNetworkErrorAlert();
    //             C.Toast("Somthing Wrong! Restart Credito If Problem Remains Please Re-Authenticate Your Account Err1404");
    //             C.Toast("Somthing Wrong! Restart Credito If Problem Remains Please Re-Authenticate Your Account Err1404");
    //         }
    //     });
    // }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
            <AlertBox.CoinsAlert coins = {this.state.addCoins}/>
                <View style={styles.container}>
                    <Header propsRef={this.props} coins={this.state.coins} disSubHead={false} goBack={true} title="Big Reward" />
                    <Text style={styles.heading}>Play To Get Free Reward</Text>
                    <View style={styles.textGroup}>
                        <Text style={styles.textBox}>{this.state.v1}</Text>
                        <Text style={styles.textBox}>{this.state.v2}</Text>
                        <Text style={styles.textBox}>{this.state.v3}</Text>
                    </View>
                    <Button title={this.state.btnTitle}
                        buttonStyle={styles.btn}
                        titleStyle={{color: '#00f7d2'}}
                        type="outline"
                        onPress={this.handleStartStopBtn}
                    />
                    <Banner
                        // unitId="ca-app-pub-9879472653351292/4114924192"
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
        );
    }
}
export default BigReward;