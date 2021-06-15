import React, { Component } from "react";
import { 
    View,
    Text,
    ScrollView,
    Dimensions,
    AsyncStorage
} from "react-native";
import styles from '../../styles/MathQStyle';
import Header from '../../components/Header';
import * as firebase from 'react-native-firebase';
import { CheckBox } from 'react-native-elements';
import {Button} from 'react-native-elements';
import * as C from '../../components/Common';
import * as AlertBox from '../../components/AlertBox';

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

class MathAskQ extends Component {
    constructor(props){
        super(props);
        this.state = {
            type: props.navigation.state.params.type,
            qNo: 0,
            question: "",
            option1: '0',
            check1: false,
            option2: '0',
            check2: false,
            option3: '0',
            check3: false,
            option4: '0',
            check4: false,
            totalQuestions: 0,
            rateFrom: 0,
            rateTo: 0,
            ans:"",
            coins: global.coins,
            addCoins: 0
        }
        this.next = this.next.bind(this);
        this.getRadioAns = this.getRadioAns.bind(this);
        this.setCheckBox = this.setCheckBox.bind(this);
    }


    componentWillMount(){
        var key = this.state.type == "Easy" ? "MathQuestionEasyNo" : "MathQuestionHardNo";
        AsyncStorage.getItem(key).then(value=>{
            try{
                var qNo = parseInt(value);
                this.setState({qNo: qNo});
            }catch(err){
                qNo = 0;
                C.showNetworkErrorAlert();
                C.Toast("Somthing Wrong! Restart Credito Err9404");
            }
        });
    }

    componentDidMount(){
        this.showQuestion();
    }

    getRadioAns(){
        var uAns = 0;
        switch(true){
            case this.state.check1:
                uAns = this.state.option1;
            break;
            case this.state.check2:
                uAns = this.state.option2;
            break;
            case this.state.check3:
                uAns = this.state.option3;
            break;
            case this.state.check4:
                uAns = this.state.option4;
            break;
            default:
                uAns = "Select a option to go next";
            break;
        }
        return uAns;
    }

    next(){
        const uAns = this.getRadioAns();
        if(uAns == "Select a option to go next"){
            C.Toast(uAns);
        }else{
            const ans = this.state.ans;
            if(uAns == ans){
                this.showQuestion();
                C.Toast("Right Answer");
                const qNoPassed = this.state.qNo + 1;
                this.setState({ qNo: qNoPassed});
                var key = this.state.type == "Easy" ? "MathQuestionEasyNo" : "MathQuestionHardNo";
                global.UserDataQueue.addData(key,qNoPassed);
                AsyncStorage.setItem(key,qNoPassed.toString());
                var n = this.state.type == "Easy" ? 9 : 10;
                const rateFrom = this.state.type == "Easy" ? global.controlRates.MathQ.easy.from : global.controlRates.MathQ.hard.from;
                const rateTo = this.state.type == "Easy" ? global.controlRates.MathQ.easy.to : global.controlRates.MathQ.hard.to;
                C.updateRandomCoinsV2(rateFrom,rateTo,n,(addCoins,b)=>{
                    this.setState({coins: global.coins});
                    global.active = true;
                    this.setState({addCoins:addCoins})
                });
            }else{
                C.Toast("Wrong Answer Try Again");
            }
        }
    }


    showQuestion(){
        var isEasy = this.state.type == "Easy" ? true : false;
        var options = [];
        var question = "";
        var a,b,c;
        var oper1 = "";
        var oper2 = "";
        if(isEasy){
            a = C.getRandomNo(5,20);
            b = C.getRandomNo(1,10);
            c = C.getRandomNo(4,9);

            switch(C.getRandomNo(1,3)){
                case 1:
                    oper1 = " + ";
                break;
                case 2:
                    oper1 = " - ";
                break;
                case 3:
                    oper1 = " * ";
                break;
            }
        }else{
            a = C.getRandomNo(20,40);
            b = C.getRandomNo(10,65);
            c = C.getRandomNo(34,90);

            switch(C.getRandomNo(1,4)){
                case 1:
                    oper1 = " + ";
                break;
                case 2:
                    oper1 = " - ";
                break;
                case 3:
                    oper1 = " * ";
                break;
                case 4:
                    oper1 = " / ";
                break;
            }
        }

        switch(C.getRandomNo(1,4)){
            case 1:
                oper2 = " + ";
            break;
            case 2:
                oper2 = " - ";
            break;
            case 3:
                oper2 = " * ";
            break;
            case 4:
                oper2 = " / ";
            break;
        }

        question = a + oper1 + b + oper2 + c;
        var answer = eval(question).toFixed(1);
        const no =C.getRandomNo(0,3);
        options[no] = answer;
        for(var i = 0; i < 4; i++){
            if(options[i] == null){
                if(C.getRandomNo(0,1) == 0){
                    //plus
                    const a = C.getRandomNo(1 , 15);
                    options[i] = (parseInt(answer) + a).toFixed(1);
                }else{
                    //minus
                    const a = C.getRandomNo(1 , 15);
                    options[i] = (parseInt(answer) - a).toFixed(1);
                }
            }
        }

        this.setState({
            question : question,
            ans: answer,
            option1: options[0],
            option2: options[1],
            option3: options[2],
            option4: options[3],
        });
        this.setCheckBox();
    }

    setCheckBox(){
        this.setState({
            check1: false,
            check2: false,
            check3: false,
            check4: false,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Header propsRef={this.props} coins={this.state.coins} goBack={true} title= {this.state.type + " Questions"} />
                <AlertBox.CoinsAlert coins = {this.state.addCoins}/>
                <ScrollView>
                <View style={styles.subContainer}>
                        
                    <View style={styles.question}>
                        <Text style={styles.no}>{"Question:   "}</Text>
                        <Text style={styles.option}>{this.state.question}</Text>
                    </View>

                    <View style={styles.option}>
                        <View style={styles.row}>
                            <CheckBox containerStyle={styles.chk}
                                checkedColor='#000'
                                center
                                title= {this.state.option1}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.check1} 
                                onPress={()=>{
                                    this.setCheckBox();
                                    this.setState({
                                        check1: true
                                    })
                                }}
                            />
                            <CheckBox containerStyle={styles.chk}
                                checkedColor='#000'
                                center
                                title= {this.state.option2}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.check2}
                                onPress={()=>{
                                    this.setCheckBox();
                                    this.setState({
                                        check2: true
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.row}>
                            <CheckBox containerStyle={styles.chk}
                                checkedColor='#000'
                                center
                                title= {this.state.option3}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.check3}
                                onPress={()=>{
                                    this.setCheckBox();
                                    this.setState({
                                        check3: true
                                    })
                                }}
                            />
                            <CheckBox containerStyle={styles.chk}
                                checkedColor='#000'
                                center
                                title= {this.state.option4}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.check4}
                                onPress={()=>{
                                    this.setCheckBox();
                                    this.setState({
                                        check4: true
                                    })
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.wordBtn}>
                        <Button title="   Skip   " buttonStyle={styles.btn} titleStyle={{color: '#00f7d2'}} type="outline" onPress={()=>{this.showQuestion()}}></Button>
                        <Button title="   Next   " buttonStyle={styles.btn} titleStyle={{color: '#00f7d2'}} type="outline" onPress={this.next}></Button>
                    </View>
                    <Banner
                        unitId="ca-app-pub-9879472653351292/2202044511"
                        //test id
                        unitId={__DEV__ ? "ca-app-pub-3940256099942544/6300978111" : "ca-app-pub-9879472653351292/9608002334"}
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
                </ScrollView>
            </View>
        );
    }
}
export default MathAskQ;