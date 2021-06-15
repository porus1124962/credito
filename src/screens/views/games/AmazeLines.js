import React, { Component } from "react";
import { 
    View,
    Text,
    Dimensions,
    AsyncStorage,
    Vibration
} from "react-native";
import styles from '../../styles/AmazeLineStyle';
import Header from '../../components/Header';
import * as firebase from 'react-native-firebase';
import * as C from '../../components/Common';
import SwipeGesture from '../../components/SwipeGesture';
import * as AmazeData from '../../components/AmazeLinesData';
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

// W = wall
// "" = khali rasta ball ky liye
// F = filled by ball
// B = Ball is here

class Square extends Component{
    render(){
        const 
            type = this.props.type,
            ballSize = this.props.ballSize,
            w = this.props.w,
            h = this.props.h;
        var color,ball = null,width = 0.2;
        switch(type){
            case "":
                color = "#fff";
                break;
            case "W":
                color = "#000";
                width = 0;
                break;
            case "F":
                color = "#0072B6";
                break;
            case "B":
                color = "#0072B6";
                ball = <Text style={{color:"#ff0",fontWeight: 'bold',textAlign: 'center',fontSize: ballSize,paddingBottom: ballSize*0.05}}>•</Text>;
                break;
        }
        return(
            <View style={{backgroundColor: color,width : w,height: h,borderWidth: width,borderColor: '#fff',justifyContent: 'center'}}>
                {ball}
            </View>
        );
    }
}

class AmazeLines extends Component {

    constructor(props){
        super(props);
        //stringyfy and parse to make a copy of board data
        const obj = JSON.parse(JSON.stringify(AmazeData.levels[props.navigation.state.params.lvlNo]));
        this.state = {
            // board : [
            //     ["W","W","W","W","W","W"],
            //     ["W","W","","","W","W"],
            //     ["W","W","W","","W","W"],
            //     ["W","W","B","","W","W"],
            //     ["W","W","W","W","W","W"]
            // ],
            loading: false,
            board: obj.board,
            ballSize: obj.ballSize,
            boxW: obj.boxW,
            boxH: obj.boxH,
            win: false,
            lvlNo: props.navigation.state.params.lvlNo,
            // coinData: {},
            coinsGiven: 0,
            unlockLevels: props.navigation.state.params.unlockLevels,
            isRewarded: false,
            coins: global.coins,
        }
        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
    }

    // componentDidMount(){
        // AsyncStorage.getItem("controlRates").then(res=>{
        //     var controlRates = {};
        //     try{
        //         controlRates = JSON.parse(res);
        //         this.setState({
        //             coinData: controlRates.AmazeLines
        //         });
        //     }catch(err){
        //         C.showNetworkErrorAlert();
        //         C.Toast("Somthing Wrong! Restart Credito If Problem Remains Please Re-Authenticate Your Account Err12404");
        //         C.Toast("Somthing Wrong! Restart Credito If Problem Remains Please Re-Authenticate Your Account Err12404");
        //     }
        // });
    // }

    LoadLevel(lvlNo){
        const level = JSON.parse(JSON.stringify(AmazeData.levels[lvlNo]));
        this.setState({
            board: level.board,
            ballSize: level.ballSize,
            boxW: level.boxW,
            boxH: level.boxH,
            loading: false
        });
    }

    // winning combinations
    isCompleted() {
        //check the board if completed
        const board = this.state.board;
        for(var i = 0; i < board.length; i++){
            for(var j = 0; j < board[i].length; j++){
                if(board[i][j] == ""){
                    return false;
                }
            }
        }
        return true;
    }

    getBallPosition(){
        const board = this.state.board;
        for(var i = 0; i < board.length; i++){
            for(var j = 0; j < board[i].length; j++){
                if(board[i][j] == "B"){
                    return {x: j,y: i};
                }
            }
        }
        return [0,0];
    }

    setBoard(x,y,value){
        let newBoard = [...this.state.board];
        newBoard[y][x] = value;
        this.setState({
            board: newBoard
        });
    }

    moveUp(){
        const board = this.state.board;
        const ballPosition = this.getBallPosition();
        // C.Toast("y axis - "+ballPosition.y);
        for(var i = ballPosition.y - 1; i > -1; i--){
            // C.Toast("loop - "+i.toString());
            if(board[i][ballPosition.x] == "" && i > 0){
                this.setBoard(ballPosition.x,i,"F");
            }else if(board[i][ballPosition.x] == "W"){
                this.setBoard(ballPosition.x,ballPosition.y,"F");
                this.setBoard(ballPosition.x,i+1,"B");
                return;
            }else if(i == 0){
                this.setBoard(ballPosition.x,ballPosition.y,"F");
                this.setBoard(ballPosition.x,i,"B");
            }
        }
    }

    moveLeft(){
        const board = this.state.board;
        const ballPosition = this.getBallPosition();
        // C.Toast("x axis - "+ballPosition.x);
        for(var i = ballPosition.x - 1; i > -1; i--){
            // C.Toast("loop - "+i.toString());
            if(board[ballPosition.y][i] == "" && i > 0){
                this.setBoard(i,ballPosition.y,"F");
            }else if(board[ballPosition.y][i] == "W"){
                this.setBoard(ballPosition.x,ballPosition.y,"F");
                this.setBoard(i+1,ballPosition.y,"B");
                return;
            }else if(i == 0){
                this.setBoard(ballPosition.x,ballPosition.y,"F");
                this.setBoard(i,ballPosition.y,"B");
            }
        }
    }

    moveRight(){
        const board = this.state.board;
        const ballPosition = this.getBallPosition();
        // C.Toast("x axis - "+ballPosition.x);
        for(var i = ballPosition.x + 1; i < board[ballPosition.y].length; i++){
            // C.Toast("loop - "+i.toString());
            if(board[ballPosition.y][i] == "" && i != board[ballPosition.y].length - 1){
                this.setBoard(i,ballPosition.y,"F");
            }else if(board[ballPosition.y][i] == "W"){
                this.setBoard(ballPosition.x,ballPosition.y,"F");
                this.setBoard(i-1,ballPosition.y,"B");
                return;
            }else if(i == board[ballPosition.y].length - 1){
                this.setBoard(ballPosition.x,ballPosition.y,"F");
                this.setBoard(i,ballPosition.y,"B");
            }
        }
    }

    moveDown(){
        const board = this.state.board;
        const ballPosition = this.getBallPosition();
        // C.Toast("y axis - "+ballPosition.y);
        for(var i = ballPosition.y + 1; i < board.length; i++){
            // C.Toast("loop - "+i.toString());
            if(board[i][ballPosition.x] == "" && i != board.length - 1){
                this.setBoard(ballPosition.x,i,"F");
            }else if(board[i][ballPosition.x] == "W"){
                this.setBoard(ballPosition.x,ballPosition.y,"F");
                this.setBoard(ballPosition.x,i-1,"B");
                return;
            }else if(i == board.length - 1){
                this.setBoard(ballPosition.x,ballPosition.y,"F");
                this.setBoard(ballPosition.x,i,"B");
            }
        }
    }

    onSwipePerformed = (action) => {
        if(!this.state.win){
            switch(action){
                case 'left':
                    this.moveLeft();
                    break;
                case 'right':
                    this.moveRight();
                    break;        
                case 'up':
                    this.moveUp();
                    break;
                case 'down':
                    this.moveDown();
                    break;
            }
        }
        Vibration.vibrate(10);
        const res = this.isCompleted();
        this.setState({
            win: res,
            coinsGiven: 0,
        });
        if(res && !this.state.isRewarded){
            //give reward
            var data;
            try{
                data = global.controlRates.AmazeLines
            }catch(err){
                C.showNetworkErrorAlert();
                C.Toast("Somthing Wrong! Restart Credito Err12404");
            }
            try{
                var from,to;
                var rewardLevel = this.state.lvlNo + 1;
                if(rewardLevel < 16){
                    from = data[15].from;
                    to = data[15].to;
                }else if(rewardLevel < 31){
                    from = data[30].from;
                    to = data[30].to;
                }else if(rewardLevel < 51){
                    from = data[50].from;
                    to = data[50].to;
                }else{
                    from = data["after50"].from;
                    to = data["after50"].to;
                }
                if(this.state.unlockLevels < rewardLevel + 1){
                    global.UserDataQueue.addData("amazeLevels",rewardLevel);
                    AsyncStorage.setItem('amazeLevels',(rewardLevel).toString(),()=>{
                        C.updateRandomCoinsV2(from,to,12,(coinsGiven,totalCoins)=>{
                            this.setState({
                                coinsGiven: coinsGiven,
                                isRewarded: true,
                                coins: global.coins
                            });
                        });
                    });
                }else{
                    C.updateRandomCoinsV2(from,to,12,(coinsGiven,totalCoins)=>{
                        this.setState({
                            coinsGiven: coinsGiven,
                            isRewarded: true,
                            coins: global.coins
                        });
                    });
                }
            }catch(err){
                C.Toast("Connection is Slow / Not Working! Restart Credito");
            }
        }
    }

    componentWillUnmount(){
        if(this.state.unlockLevels < this.state.lvlNo + 1){
            this.props.navigation.state.params.onBackPress(this.state.lvlNo + 1);
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Header propsRef={this.props} coins={this.state.coins} goBack={true} title="Amaze Lines" />
                {
                    this.state.win == true ? 
                    <AlertBox.AmazeAlert coins={this.state.coinsGiven}
                        onRestart={()=>{
                            this.setState({win: false});
                            this.LoadLevel(this.state.lvlNo);
                        }}
                        onNext={()=>{
                            const newLvlNo = this.state.lvlNo + 1;
                            if(AmazeData.levels.length > newLvlNo){
                                this.setState({win: false,lvlNo: newLvlNo,isRewarded: false});
                                this.LoadLevel(newLvlNo);
                            }else{
                                C.Toast("Sorry No More Level! You Are The Winner Of Amaze Lines.");
                                C.Toast("Check For Update Maybe New Levels Added In Update");
                            }
                        }}
                    />
                    : null
                }
                <SwipeGesture gestureStyle={styles.container}
                    onSwipePerformed={this.onSwipePerformed}>
                    <Text style={{color: "#fff", textAlign: 'center',fontWeight: '800',fontSize: 26,marginVertical: 12}}>Level - {this.state.lvlNo + 1}</Text>
                    <View style={{display: 'flex',alignSelf: 'center'}}>
                        {
                            this.state.board.map((item,index)=>{
                                return(
                                    <View key={index} style={{flexDirection:'row'}}>
                                        {
                                            item.map((item1,index1)=>{
                                                return(
                                                    <Square key={index1} type={item1}
                                                        ballSize={this.state.ballSize} 
                                                        w={this.state.boxW} h={this.state.boxH}
                                                    />
                                                )
                                            })
                                        }
                                    </View>
                                )
                            })
                        }
                    </View>
                    <Text style={{color: "#fff", textAlign: 'center',fontSize: 12,marginVertical: 12}}>Swipe To Fill Out The White Space & Win The Game.</Text>
                    <Banner
                        // unitId="ca-app-pub-9879472653351292/1343499583"
                        //test id
                        unitId={__DEV__ ? "ca-app-pub-3940256099942544/6300978111" : "ca-app-pub-9879472653351292/9608002334"}
                        size={Math.floor(width)+"x100"}
                        request={request.build()}
                    />
                </SwipeGesture>
                
            </View>
        );
    }
}
export default AmazeLines;