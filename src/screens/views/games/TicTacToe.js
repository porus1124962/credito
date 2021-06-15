import React, { Component } from "react";
import { 
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    AsyncStorage
} from "react-native";
import styles from '../../styles/TicTacToeStyles';
import Header from '../../components/Header';
import { Button } from "react-native-elements";
import * as firebase from 'react-native-firebase';
import * as C from '../../components/Common';
import * as AlertBox from '../../components/AlertBox';

let {width, height} = Dimensions.get('window');

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

var huPlayer = "P";
var aiPlayer = "C";
var iter = 0;
var round = 0;

class Square extends Component{
    render(){
        return(
            <TouchableOpacity style={styles.square} onPress={this.props.onPress} >
                <Text style={styles.squareText}>
                    {
                        Number.isInteger(this.props.type) ? null : this.props.type === "P" ? 'X' : 'O'
                    }
                </Text>
            </TouchableOpacity>
        );
    }
}

class TicTacToe extends Component {

    constructor(props){
        super(props);
        this.state = {
            board : [0, 1, 2, 3, 4, 5, 6, 7, 8],
            details: "Best Of Luck",
            // tieRate: {from: 0,to: 0},
            // winRate: {from: 0,to: 0},
            // loseRate: {from: 0,to: 0},
            coins: global.coins,
            addCoins:0
        }
        this.move = this.move.bind(this);
        this.reset = this.reset.bind(this);
        this.giveReward = this.giveReward.bind(this);
    }

    componentWillUnmount(){
        this.reset();
    }

    // componentDidMount(){
    //     AsyncStorage.getItem("controlRates").then(value=>{
    //         try{
    //             const data = JSON.parse(value).TicTacToe;
    //             const loseFrom = data.loseRate.from;
    //             const loseTo = data.loseRate.to;
    //             const winFrom = data.winRate.from;
    //             const winTo = data.winRate.to;
    //             const tieFrom = data.tieRate.from;
    //             const tieTo = data.tieRate.to;
    //             this.setState({
    //                 loseRate: {from : loseFrom, to : loseTo},
    //                 winRate: {from : winFrom, to : winTo},
    //                 tieRate: {from : tieFrom, to : tieTo}
    //             });
    //         }catch(err){
    //             C.showNetworkErrorAlert();
    //             C.Toast("Somthing Wrong! Restart Credito If Problem Remains Please Re-Authenticate Your Account Err3404");
    //             C.Toast("Somthing Wrong! Restart Credito If Problem Remains Please Re-Authenticate Your Account Err3404");
    //         }
    //     });
    // }

    giveReward(){
        const ref = this;
        setTimeout(()=>{
            const type = ref.state.details;
            try{
                const data = global.controlRates.TicTacToe;
                const loseFrom = data.loseRate.from;
                const loseTo = data.loseRate.to;
                const winFrom = data.winRate.from;
                const winTo = data.winRate.to;
                const tieFrom = data.tieRate.from;
                const tieTo = data.tieRate.to;
                switch(type){
                    case "TIE!":
                        C.updateRandomCoinsV2(tieFrom,tieTo,4,(addedCoins,totalCoins)=>{
                            this.setState({coins: global.coins})
                            global.active = true;
                            this.setState({addCoins:addedCoins})
                        });
                    break;
                    case "You Lose!":
                        C.updateRandomCoinsV2(loseFrom,loseTo,5,(addedCoins,totalCoins)=>{
                            this.setState({coins: global.coins})
                            global.active = true;
                            this.setState({addCoins:addedCoins})
                        });
                    break;
                    case "You Win!":
                        C.updateRandomCoinsV2(winFrom,winTo,3,(addedCoins,totalCoins)=>{
                            this.setState({coins: global.coins})
                            global.active = true;
                            this.setState({addCoins:addedCoins})
                        });
                    break;
                }
            }catch(err){
                C.showNetworkErrorAlert();
                C.Toast("Somthing Wrong! Restart Credito Err3404");
            }
        },500);
    }

    reset() {
        round = 0;
        this.setState({
            board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            details: "Best Of Luck"
        });
    }
  
    move(element, player) {
        var board = this.state.board;
        if (board[element] != "P" && board[element] != "C") {
            round++;
            board[element] = player;
            this.setState({
                board : board
            });
  
            if (this.winning(board, player)) {
                this.setState({
                    details: "You Win!"
                });
                this.giveReward();
                return;
            } else if (round > 8) {
                this.setState({
                    details: "TIE!"
                });
                this.giveReward();
                return;
            } else {
                round++;
                var index = this.minimax(board, aiPlayer).index;
                board[index] = aiPlayer;
                this.setState({
                    board : board
                });

                if (this.winning(board, aiPlayer)) {
                    this.setState({
                        details: "You Lose!"
                    });
                    this.giveReward();
                return;
                } else if (round === 0) {
                    this.setState({
                        details: "TIE!"
                    });
                    this.giveReward();
                return;
                }
            }
        }
    }
  
    minimax(reboard, player) {
        iter++;
        let array = this.avail(reboard);
        if (this.winning(reboard, huPlayer)) {
        return {
            score: -10
        };
        } else if (this.winning(reboard, aiPlayer)) {
        return {
            score: 10
        };
        } else if (array.length === 0) {
        return {
            score: 0
        };
        }
    
        var moves = [];
        for (var i = 0; i < array.length; i++) {
        var move = {};
        move.index = reboard[array[i]];
        reboard[array[i]] = player;
    
        if (player == aiPlayer) {
            var g = this.minimax(reboard, huPlayer);
            move.score = g.score;
        } else {
            var g = this.minimax(reboard, aiPlayer);
            move.score = g.score;
        }
        reboard[array[i]] = move.index;
        moves.push(move);
        }
    
        var bestMove;
        if (player === aiPlayer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
            }
        }
        } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
            }
        }
        }
        return moves[bestMove];
    }
  
    //available spots
    avail(reboard) {
        return reboard.filter(s => s != "P" && s != "C");
    }
  
    // winning combinations
    winning(board, player) {
        if (
            (board[0] == player && board[1] == player && board[2] == player) ||
            (board[3] == player && board[4] == player && board[5] == player) ||
            (board[6] == player && board[7] == player && board[8] == player) ||
            (board[0] == player && board[3] == player && board[6] == player) ||
            (board[1] == player && board[4] == player && board[7] == player) ||
            (board[2] == player && board[5] == player && board[8] == player) ||
            (board[0] == player && board[4] == player && board[8] == player) ||
            (board[2] == player && board[4] == player && board[6] == player)
        ) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Header propsRef={this.props} coins={this.state.coins} goBack={true} title="Tic Tac Toe" />
                <AlertBox.CoinsAlert coins = {this.state.addCoins}/>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.topText}>{this.state.details}</Text>
                    <View style={styles.squareParent}>
                        {
                            this.state.board.map((item,index)=>{
                                return(
                                    <Square type={item} key={index} onPress={()=> {
                                        this.state.details == 'Best Of Luck' ? 
                                        this.move(index,huPlayer) :
                                        C.Toast(this.state.details+ " Reset To Play Again")
                                        }} />
                                )
                            })
                        }
                    </View>
                    <Button title="Reset" onPress={this.reset} type="outline"
                        buttonStyle={styles.btnContainer}
                        titleStyle={{color : '#00f7d2'}}>
                    </Button>
                    <Banner
                        // unitId="ca-app-pub-9879472653351292/3838689698"
                        //test id
                        unitId={__DEV__ ? "ca-app-pub-3940256099942544/6300978111" : "ca-app-pub-9879472653351292/9608002334"}
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
export default TicTacToe;