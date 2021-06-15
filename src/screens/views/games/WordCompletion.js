import React, { Component } from "react";
import { 
    View,
    ScrollView,
    Text,
    TextInput,
    Dimensions,
    AsyncStorage
} from "react-native";
import styles from '../../styles/WordStyle';
import * as C from '../../components/Common';
import Header from '../../components/Header';
import * as firebase from 'react-native-firebase';
const firestore = firebase.firestore();
import {Button} from 'react-native-elements';
import * as WORDDATA from '../../components/WordCompletionData';
import * as AlertBox from '../../components/AlertBox';

let {width,height} = Dimensions.get('window');

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

export default class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            word: '',
            ans: '',
            qNo: 0,
            maxQ: 0,
            solve: '',
            coins: global.coins,
            addCoins: 0
        }
        this.renderText = this.renderText.bind(this);
        this.showQuestion = this.showQuestion.bind(this);
        // this.skip = this.skip.bind(this);
        this.next = this.next.bind(this);
    }

    componentDidMount(){
        AsyncStorage.getItem("wordCompletionNo").then(value=>{
            var questionNo;
            try{
                questionNo = parseInt(value) + 1;
                this.setState({
                    maxQ: WORDDATA.WCData.length,
                });
            }catch(err){
                questionNo = 1;
                C.showNetworkErrorAlert();
                C.Toast("Somthing Wrong! Restart Credito Err6404");
            }
            this.showQuestion(questionNo);
        });
    }

    skip(callback = null){
        const qNo = this.state.qNo;
        var max = this.state.maxQ;
        if(qNo >= max){
            this.showQuestion(1);
            global.UserDataQueue.addData("wordCompletionNo",0);
            AsyncStorage.setItem("wordCompletionNo",'0',()=>{
                if(callback != null){
                    callback();
                }
            });
        }else{
            this.showQuestion(qNo + 1);
            global.UserDataQueue.addData("wordCompletionNo",qNo);
            AsyncStorage.setItem("wordCompletionNo",qNo.toString(),()=>{
                if(callback != null){
                    callback();
                }
            });
        }
    }

    replaceAll(string, search, replacement) {
        return string.replace(new RegExp(search, 'g'), replacement);
    };

    next(){
        const word = this.state.word;
        const solve = this.state.solve;
        const ans = this.state.ans;
        const solveWord = this.replaceAll(word, "_", solve);
        if(ans == solveWord){
            this.skip(()=>{
                try{
                    //finding rates
                    const rateFrom = global.controlRates.WordCompletion.from;
                    const rateTo = global.controlRates.WordCompletion.to;
                    C.updateRandomCoinsV2(rateFrom,rateTo,6,(a,b)=>{
                        this.setState({coins: global.coins});
                        global.active = true;
                        this.setState({addCoins: a})
                    });
                }catch(err){
                    C.showNetworkErrorAlert();
                    C.Toast("Somthing Wrong! Restart Credito Err6404");
                }
            });
            C.Toast("Guessed Write");
        }else{
            C.Toast("Wrong Filling Try Again");
        }
    }

    showQuestion(qNo){
        const currentWord = WORDDATA.WCData[qNo-1];
        this.setState({
            word: currentWord.word,
            ans: currentWord.ans,
            qNo: qNo,
            solve: ''
        });
    }

    renderText(){
        var data = [];
        const word = this.state.word;
        for(let i = 0; i < word.length; i++){
            if(word[i] == "_"){
                data.push(
                    <TextInput style={[styles.textBox,styles.inputBox]} key={i} autoCapitalize='none' 
                        maxLength={1} value={this.state.solve}
                        onChangeText={(value)=>{
                            this.setState({
                                solve: value
                            });
                        }} 
                    />
                );
            }else{
                data.push(
                    <Text style={styles.textBox} key={i}>{word[i]}</Text>
                );
            }
        }
        return data;
    }

    render() {
        return (
            <View style={{backgroundColor: '#000',flex: 1}}>
                <AlertBox.CoinsAlert coins={this.state.addCoins}/>
                <Header coins={this.state.coins} propsRef={this.props} disSubHead={false} goBack={true} title="Word Game" />
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.heading}>Guess The Word</Text>
                        <View style={styles.subContainer}>
                            {
                                this.renderText()
                            }
                        </View>
                        <View style={styles.wordBtn}>
                            <Button title="   Skip   " buttonStyle={styles.btn} titleStyle={{color: '#00f7d2'}} type="outline" onPress={()=>{this.skip();}}></Button>
                            <Button title="   Next   " buttonStyle={styles.btn} titleStyle={{color: '#00f7d2'}} type="outline" onPress={this.next}></Button>
                        </View>
                        <Banner style={styles.ad}
                            // unitId="ca-app-pub-9879472653351292/5636703120"
                            //test id
                            unitId={__DEV__ ? "ca-app-pub-3940256099942544/6300978111" :"ca-app-pub-9879472653351292/9608002334"}
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