import React, { Component } from "react";
import { 
    View,
    Text,
    ScrollView,
    Dimensions,
    AsyncStorage
} from "react-native";
import {
    CheckBox,
    Button
} from 'react-native-elements';
import styles from '../../styles/MCQsStyle';
import Header from '../../components/Header';
import * as firebase from 'react-native-firebase';
import * as C from '../../components/Common';
import * as DATA from '../../components/MCQsData';
const firestore = firebase.firestore();
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

class MCQAsk extends Component {

    constructor(props){
        super(props);
        this.state = {
            categoryIndex: props.navigation.state.params.categoryIndex,
            qNo: 1,
            totalQuestions: 0,
            question: '',
            answer: '',
            option1: "0",
            check1: false,
            option2: "0",
            check2: false,
            option3: "0",
            check3: false,
            option4: "0",
            check4: false,
            coins: global.coins,
            addCoins:0
        }
        this.showQuestion = this.showQuestion.bind(this);
        this.resetCheckBox = this.resetCheckBox.bind(this);
        this.skip = this.skip.bind(this);
        this.next = this.next.bind(this);
        this.getRadioAns = this.getRadioAns.bind(this);
    }

    componentDidMount(){
        const catIndex = this.state.categoryIndex;
        const totalQuestions = DATA.MCQData[catIndex].questions.length;
        AsyncStorage.getItem("MCQ"+catIndex).then(res=>{
            var playedNo;
            try{
                playedNo = parseInt(res);
            }catch(err){
                playedNo = 0;
                C.showNetworkErrorAlert();
                C.Toast("Somthing Wrong! Restart Credito Err8404");
            }
            if(playedNo >= totalQuestions){
                playedNo = 0;
            }
            this.showQuestion(playedNo);
        }).catch(err=>{
            this.showQuestion(0);
        });
    }

    skip(callback = null){
        var currentQuestioNo = this.state.qNo;
        const catIndex = this.state.categoryIndex;
        const totalQuestions = DATA.MCQData[catIndex].questions.length;
        if(currentQuestioNo >= totalQuestions){
            currentQuestioNo = 0;
        }
        this.showQuestion(parseInt(currentQuestioNo));
        global.UserDataQueue.addData("MCQ"+catIndex,currentQuestioNo);
        AsyncStorage.setItem("MCQ"+catIndex,currentQuestioNo.toString(),()=>{
            if(callback != null){
                callback();
            }
        });
    }

    showQuestion(questionIndex){
        const catIndex = this.state.categoryIndex;
        const currentQuestion = DATA.MCQData[catIndex].questions[questionIndex];
        this.setState({
            qNo: questionIndex + 1,
            question: currentQuestion.q,
            answer: currentQuestion.ans,
            option1: currentQuestion.op.o1,
            option2: currentQuestion.op.o2,
            option3: currentQuestion.op.o3,
            option4: currentQuestion.op.o4,
        });
        this.resetCheckBox();
    }

    next(){
        const uAns = this.getRadioAns();
        if(uAns == "Select a option to go next"){
            C.Toast(uAns);
        }else{
            const ans = this.state.answer;
            if(uAns == ans){
                this.skip(()=>{
                    try{
                        const rateFrom = global.controlRates.MCQs.from;
                        const rateTo = global.controlRates.MCQs.to;
                        C.updateRandomCoinsV2(rateFrom,rateTo,8,(addCoins,b)=>{
                            this.setState({coins: global.coins});
                            global.active = true;
                            this.setState({addCoins:addCoins})
                        });
                    }catch(err){
                        C.showNetworkErrorAlert();
                        C.Toast("Somthing Wrong! Restart Credito Err8404");
                    }
                });
                C.Toast("Right Answer");
            }else{
                C.Toast("Wrong Answer Try Again");
            }
        }
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

    resetCheckBox(){
        this.setState({
            check1: false,
            check2: false,
            check3: false,
            check4: false,
        });
    }
    
    render() {
        return (
            <View style={styles.container} >
                <Header propsRef={this.props} coins={this.state.coins} goBack={true} title={DATA.MCQData[this.state.categoryIndex].name +" MCQs"} />
                <AlertBox.CoinsAlert coins = {this.state.addCoins}/>
                <ScrollView>
                    <View style={{flex: 1}}>

                        <View style={styles.questionP}>
                            <Text style={styles.no}>{"Q# " +this.state.qNo+ ":   "}</Text>
                            <Text style={styles.question}>{this.state.question}</Text>
                        </View>
    
                        <View>
                            <View style={styles.row}>
                                <CheckBox containerStyle={styles.chk}
                                    checkedColor='#000'
                                    center
                                    title= {this.state.option1}
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checked={this.state.check1} 
                                    onPress={()=>{
                                        this.resetCheckBox();
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
                                        this.resetCheckBox();
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
                                        this.resetCheckBox();
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
                                        this.resetCheckBox();
                                        this.setState({
                                            check4: true
                                        })
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.btnRow}>
                            <Button title="   Skip   " buttonStyle={styles.btn} titleStyle={{color: '#00f7d2'}} type="outline" onPress={()=>{this.skip();}}></Button>
                            <Button title="   Next   " buttonStyle={styles.btn} titleStyle={{color: '#00f7d2'}} type="outline" onPress={this.next}></Button>
                        </View>
                        <Banner
                            // unitId="ca-app-pub-9879472653351292/1408380163"
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
export default MCQAsk;