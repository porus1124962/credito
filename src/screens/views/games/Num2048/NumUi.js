import React, { Component } from "react";
import { 
    View,
    Text,
    Dimensions
} from "react-native";
import {Button} from 'react-native-elements';
import * as C from '../../../components/Common';
import SwipeGesture from '../../../components/SwipeGesture';
import styles from '../../../styles/NumUiStyle';
import Header from '../../../components/Header';
import * as firebase from 'react-native-firebase';
import * as AlertBox from '../../../components/AlertBox';

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

const width = Dimensions.get('window').width; //full width

class NumUi extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        board: null,
        score: 0,
        gameOver: false,
        message: null,
        // coinData: {},
        coins: global.coins,
        addCoins:0
      };
    }
    
    // Create board with two random coordinate numbers
    initBoard() {
      let board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
      board = this.placeRandom(this.placeRandom(board));
      this.setState({board, score: 0, gameOver: false, message: 'Join the numbers & get to the 2048 tile'});
    }
    
    // Get all blank coordinates from board
    getBlankCoordinates(board) {
      const blankCoordinates = [];
      
      for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[r].length; c++) {
          if (board[r][c] === 0) {blankCoordinates.push([r, c])}
        }
      }
              
      return blankCoordinates;
    }
    
    // Grab random start number
    randomStartingNumber() {
      const startingNumbers = [2,4];
      const randomNumber = startingNumbers[Math.floor(Math.random() * startingNumbers.length)];
      return randomNumber;
    }
    
    // Place random starting number on an empty coordinate
    placeRandom(board) {
      const blankCoordinates = this.getBlankCoordinates(board);
      const randomCoordinate = blankCoordinates[Math.floor(Math.random() * blankCoordinates.length)];
      const randomNumber = this.randomStartingNumber();
      board[randomCoordinate[0]][randomCoordinate[1]] = randomNumber;
      return board;
    }
    
    // Compares two boards to check for movement
    boardMoved(original, updated) {
      return (JSON.stringify(updated) !== JSON.stringify(original)) ? true : false;
    }
    
    // Moves board depending on direction and checks for game over
    move(direction) {
      if (!this.state.gameOver) {
        if (direction === 'up') {
          const movedUp = this.moveUp(this.state.board);
          if (this.boardMoved(this.state.board, movedUp.board)) {
            const upWithRandom = this.placeRandom(movedUp.board);
            
            if (this.checkForGameOver(upWithRandom)) {
              this.setState({board: upWithRandom, gameOver: true, message: 'Game over!'});
              this.giveReward();
            } else {
              this.setState({board: upWithRandom, score: this.state.score += movedUp.score});  
            }
          }
        } else if (direction === 'right') {
          const movedRight = this.moveRight(this.state.board);
          if (this.boardMoved(this.state.board, movedRight.board)) {
            const rightWithRandom = this.placeRandom(movedRight.board);
            
            if (this.checkForGameOver(rightWithRandom)) {
              this.setState({board: rightWithRandom, gameOver: true, message: 'Game over!'});
              this.giveReward();
            } else {
              this.setState({board: rightWithRandom, score: this.state.score += movedRight.score});  
            }
          }
        } else if (direction === 'down') {
          const movedDown = this.moveDown(this.state.board);
          if (this.boardMoved(this.state.board, movedDown.board)) {
            const downWithRandom = this.placeRandom(movedDown.board);
            
            if (this.checkForGameOver(downWithRandom)) {
              this.setState({board: downWithRandom, gameOver: true, message: 'Game over!'});
              this.giveReward();
            } else {
              this.setState({board: downWithRandom, score: this.state.score += movedDown.score});
            }
          }
        } else if (direction === 'left') {
          const movedLeft = this.moveLeft(this.state.board);
          if (this.boardMoved(this.state.board, movedLeft.board)) {
            const leftWithRandom = this.placeRandom(movedLeft.board);
            
            if (this.checkForGameOver(leftWithRandom)) {
              this.setState({board: leftWithRandom, gameOver: true, message: 'Game over!'});
              this.giveReward();
            } else {
              this.setState({board: leftWithRandom, score: this.state.score += movedLeft.score});
            }
          }
        }
      } else {
        this.setState({message: 'Game over. Please start a new game.'});
      }
    }
    
    moveUp(inputBoard) {
      let rotatedRight = this.rotateRight(inputBoard);
      let board = [];
      let score = 0;
  
      // Shift all numbers to the right
      for (let r = 0; r < rotatedRight.length; r++) {
        let row = [];
        for (let c = 0; c < rotatedRight[r].length; c++) {
          let current = rotatedRight[r][c];
          (current === 0) ? row.unshift(current) : row.push(current);
        }
        board.push(row);
      }
  
      // Combine numbers and shift to right
      for (let r = 0; r < board.length; r++) {
        for (let c = board[r].length - 1; c >= 0; c--) {
          if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
            board[r][c] = board[r][c] * 2;
            board[r][c - 1] = 0;
            score += board[r][c];
          } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
            board[r][c] = board[r][c - 1];
            board[r][c - 1] = 0;
          }
        }
      }
  
      // Rotate board back upright
      board = this.rotateLeft(board);
  
      return {board, score};
    }
    
    moveRight(inputBoard) {
      let board = [];
      let score = 0;
  
      // Shift all numbers to the right
      for (let r = 0; r < inputBoard.length; r++) {
        let row = [];      
        for (let c = 0; c < inputBoard[r].length; c++) {
          let current = inputBoard[r][c];
          (current === 0) ? row.unshift(current) : row.push(current);
        }
        board.push(row);
      }
  
      // Combine numbers and shift to right
      for (let r = 0; r < board.length; r++) {
        for (let c = board[r].length - 1; c >= 0; c--) {
          if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
            board[r][c] = board[r][c] * 2;
            board[r][c - 1] = 0;
            score += board[r][c];
          } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
            board[r][c] = board[r][c - 1];
            board[r][c - 1] = 0;
          }
        }
      }
  
      return {board, score};
    }
    
    moveDown(inputBoard) {
      let rotatedRight = this.rotateRight(inputBoard);
      let board = [];
      let score = 0;
  
      // Shift all numbers to the left
      for (let r = 0; r < rotatedRight.length; r++) {
        let row = [];      
        for (let c = rotatedRight[r].length - 1; c >= 0; c--) {
          let current = rotatedRight[r][c];
          (current === 0) ? row.push(current) : row.unshift(current);
        }
        board.push(row);
      }
  
      // Combine numbers and shift to left
      for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board.length; c++) {
          if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
            board[r][c] = board[r][c] * 2;
            board[r][c + 1] = 0;
            score += board[r][c];
          } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
            board[r][c] = board[r][c + 1];
            board[r][c + 1] = 0;
          }
        }
      }
  
      // Rotate board back upright
      board = this.rotateLeft(board);
  
      return {board, score};
    }
    
    moveLeft(inputBoard) {
      let board = [];
      let score = 0;
  
      // Shift all numbers to the left
      for (let r = 0; r < inputBoard.length; r++) {
        let row = [];      
        for (let c = inputBoard[r].length - 1; c >= 0; c--) {
          let current = inputBoard[r][c];
          (current === 0) ? row.push(current) : row.unshift(current);
        }
        board.push(row);
      }
  
      // Combine numbers and shift to left
      for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board.length; c++) {
          if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
            board[r][c] = board[r][c] * 2;
            board[r][c + 1] = 0;
            score += board[r][c];
          } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
            board[r][c] = board[r][c + 1];
            board[r][c + 1] = 0;
          }
        }
      }
      
      return {board, score};
    }
    
    rotateRight(matrix) {
      let result = [];
      
        for (let c = 0; c < matrix.length; c++) {
            let row = [];
            for (let r = matrix.length - 1; r >= 0; r--) {
                row.push(matrix[r][c]);
            }
        result.push(row);
        }
      
        return result;
    }
    
    rotateLeft(matrix) {
        let result = [];
  
      for (let c = matrix.length - 1; c >= 0; c--) {
        let row = [];
        for (let r = matrix.length - 1; r >= 0; r--) {
          row.unshift(matrix[r][c]);
        }
        result.push(row);
      }
  
      return result;
    }
    
    // Check to see if there are any moves left
    checkForGameOver(board) {
      let moves = [
        this.boardMoved(board, this.moveUp(board).board),
        this.boardMoved(board, this.moveRight(board).board),
        this.boardMoved(board, this.moveDown(board).board),
        this.boardMoved(board, this.moveLeft(board).board)
      ];
      
      return (moves.includes(true)) ? false : true;
    }
    
    componentWillMount() {
      this.initBoard();
    }

    onSwipePerformed = (action) => {
      switch(action){
        case 'left':
          this.move('left');
          break;
        case 'right':
          this.move('right');
          break;        
        case 'up':
          this.move('up');
          break;
        case 'down':
          this.move('down');
          break;
      }
    }

    // componentDidMount(){
    //   AsyncStorage.getItem("controlRates").then(value=>{
    //     try{
    //       const data = JSON.parse(value).Num2048;
    //       this.setState({
    //         coinData: data
    //       });
    //     }catch(err){
    //       C.showNetworkErrorAlert();
    //       C.Toast("Somthing Wrong! Restart Credito If Problem Remains Please Re-Authenticate Your Account Err2404");
    //       C.Toast("Somthing Wrong! Restart Credito If Problem Remains Please Re-Authenticate Your Account Err2404");
    //     }
    //   });
    // }

    giveReward(){
      try{
        const data = global.controlRates.Num2048;
        const score = this.state.score;
        var from,to;
        if(score >= 10 && score <= 100){
          from = data[10].from;
          to = data[10].to;
        }else if(score >= 100 && score <= 200){
          from = data[100].from;
          to = data[100].to;
        }else if(score >= 200 && score <= 500){
          from = data[200].from;
          to = data[200].to;
        }else if(score >= 500 && score <= 1000){
          from = data[500].from;
          to = data[500].to;
        }else if(score > 1000){
          from = data[1000].from;
          to = data[1000].to;
        }else{
          from = 0;
          to = 0;
        }
        C.updateRandomCoinsV2(from,to,2,(addCoins,b)=>{
          this.setState({coins: global.coins})
          global.active = true;
          this.setState({addCoins:addCoins})
        });
      }catch(err){
        C.showNetworkErrorAlert();
        C.Toast("Somthing Wrong! Restart Credito Err2404");
      }
    }

    render() {
      return (
        <View style={styles.container}>
          <Header propsRef={this.props} coins={this.state.coins} goBack={true} title="2048" />
          <AlertBox.CoinsAlert coins={this.state.addCoins}/>
          <SwipeGesture gestureStyle={styles.swipesGestureContainer}
              onSwipePerformed={this.onSwipePerformed}>
              <Text style={styles.scoreText}>Score: {this.state.score}</Text>
              <View style={styles.msgBtnRow}>
                <Text style={styles.msg}>{this.state.message}</Text>
                <Button title="New Game" buttonStyle={styles.btnContainer} onPress={() => {this.initBoard()}}/>
              </View>

              <View style={styles.mainSquare}>
                {this.state.board.map((row, i) => {
                    return(
                        <Row key={i} row={row} />
                    )
                })}
              </View>
          </SwipeGesture>
          <Banner
              // unitId="ca-app-pub-9879472653351292/3418679414"
              //test id
              unitId={__DEV__ ? "ca-app-pub-3940256099942544/6300978111" : "ca-app-pub-9879472653351292/9608002334"}
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
      );
    }
  };

  export default NumUi;

  class Row extends Component{
      render(){
          return(
            <View style={styles.sqRow}>
                {
                    this.props.row.map((cell, i) => {
                        return(
                            <Cell key={i} cellValue={cell} />
                        )
                    })
                }
            </View>
          );
      }
  }
  
  class Cell extends Component{
    getColor(){
      var colorClass = null;
      switch(this.props.cellValue){
        case 2:
          colorClass =  styles.C2;
        break;
        case 4:
          colorClass =  styles.C4;
        break;
        case 8:
          colorClass =  styles.C8;
        break;
        case 16:
          colorClass =  styles.C16;
        break;
        case 32:
          colorClass =  styles.C32;
        break;
        case 64:
          colorClass =  styles.C64;
        break;
        case 128:
          colorClass = styles.C128;
          break;
        case 256:
          colorClass = styles.C256;
          break;
        case 512:
          colorClass = styles.C512;
          break;
        case 1024:
          colorClass = styles.C1024;
          break;
        case 2048:
          colorClass = styles.C2048;
          break;
        default:
          colorClass = styles.CDefault;
          break;
      }
      return colorClass;
    }
  
    render(){
        const value = (this.props.cellValue === 0) ? '' : this.props.cellValue;
        return (
            <View style={[styles.square,this.getColor()]}>
                <Text style={styles.squareText}>{value}</Text>
            </View>
        );
    }
  };