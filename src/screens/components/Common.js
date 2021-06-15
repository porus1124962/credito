import React from 'react';
import {ToastAndroid,AsyncStorage,Alert,BackHandler} from 'react-native';
import * as firebase from 'react-native-firebase';

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
// const instertialAd = firebase.admob().interstitial(__DEV__ ? "ca-app-pub-3940256099942544/1033173712" : "ca-app-pub-9879472653351292/7289843293");

export function Toast(msg,isShort = false){
    if(isShort){
        ToastAndroid.show(msg,ToastAndroid.SHORT);
    }else{
        ToastAndroid.show(msg,ToastAndroid.LONG);
    }
}

export function UId(){
    return firebase.auth().currentUser.uid;
}

export function getRandomNo(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// export function handleInstertial(time){
//     var isLoaded = false;
//     instertialAd.loadAd(request.build());
//
//     instertialAd.on('onAdLoaded', () => {
//         isLoaded = true;
//     });
//
//     instertialAd.on('onAdClosed', () => {
//         isLoaded = false;
//         setTimeout(()=>{
//             instertialAd.loadAd(request.build());
//         },1000);
//     });
//
//     instertialAd.on('onAdFailedToLoad', () => {
//         isLoaded = false;
//         setTimeout(()=>{
//             instertialAd.loadAd(request.build());
//         },1000);
//     });
//
//     return setInterval(()=>{
//         if(isLoaded){
//             instertialAd.show();
//         }else{
//             instertialAd.loadAd(request.build());
//             instertialAd.show();
//         }
//     },time*1000);
// }

export function getUpdateControlRateAccToLevel(levelNo,callback){
    try{
        clearInterval(global.controlRatesInterval);
    }catch(err){}
    const ref = this;
    firebase.config().getValue("lvlToRate").then((snap)=>{
        const data = snap.val().toString().split('"').join('');
        const key = "level" + levelNo;
        const lvlIndex = data.indexOf(key);
        if(lvlIndex != -1){
            const strStart = lvlIndex + key.length + 1;
            const strEnd = data.indexOf("|",strStart);
            var rate;
            if(strEnd == -1){
                rate = data.substring(strStart,data.length);
            }else{
                rate = data.substring(strStart,strEnd);
            }
            global.rate = rate;

            var waitTime;
            try{
                waitTime = parseInt(global.controlRates.refreshTimeInMin);
            }catch(err){
                waitTime = 15;
            }

            global.controlRatesInterval = ref.controlRatesInterval(waitTime,(data)=>{
                callback(data);
            });

        }else{
            //unknown level
            this.Toast("Slow Internet! Or Some Error Occurred! Must Restart Credito Err754");
            this.Toast("Slow Internet! Or Some Error Occurred! Must Restart Credito Err754");
            this.showNetworkErrorAlert();
        }
    }).catch(err=>{
        this.Toast("Slow Internet! Or Some Error Occurred! Must Restart Credito Err966");
        this.Toast("Slow Internet! Or Some Error Occurred! Must Restart Credito Err966");
        this.showNetworkErrorAlert();
    });
}

export function controlRatesInterval(waitTime,callback){
    const ref = this;
    function helper(){
        firebase.firestore().collection("control").doc(global.rate).get().then((snap)=>{
            global.controlRates = snap.data();
            callback(snap.data());
        }).catch((err)=>{
            ref.Toast("Slow Internet! Or Some Error Occurred! Must Restart Credito Err439");
            ref.Toast("Slow Internet! Or Some Error Occurred! Must Restart Credito Err439");
            ref.showNetworkErrorAlert();
        });
    }
    helper();
    return setInterval(helper,waitTime*60000);
}

export function showNetworkErrorAlert(){
    Alert.alert(
        'Alert',
        'Credito can not work without internet. Plz check your internet connectivity.',
        [{text: 'Exit', onPress: () => BackHandler.exitApp() }],
        {cancelable: false},
    );
}

// export function addUserDataInQueue(key,value,callBack = null){
//     if(key != null && value != null){
//         AsyncStorage.getItem("TaskQueue").then((res)=>{
//             var obj = {};
//             if(res != null){
//                 try{
//                     obj = JSON.parse(res);
//                 }catch(err){
//                     obj = {};
//                 }
//             }
//             obj[key] = value;
//             AsyncStorage.setItem("TaskQueue",JSON.stringify(obj)).then(()=>{if(callBack != null){callBack(true);}}).catch(err=>{if(callBack != null){callBack(false);}});
//         }).catch(err=>{
//             //make obj again
//             var obj = {[key]:value};
//             AsyncStorage.setItem("TaskQueue",JSON.stringify(obj)).then(()=>{if(callBack != null){callBack(true);}}).catch(err=>{if(callBack != null){callBack(false);}});
//         });
//     }else{
//         if(callBack != null){callBack(false);}
//     }
// }

export function forcePushUserDataToServer(callback = null){
    this.pushDataHelper(callback);
}

export function pushUserDataToServer(wait){
    var myWait;
    try{
        myWait = parseInt(wait);
    }catch(err){myWait = 30;}
    return setInterval(()=>{this.pushDataHelper(null);},myWait*1000);
}

export function pushDataHelper(callback = null){
    //TODO: do the coins verification here if needed
    const data = global.UserDataQueue.getAllData();
    if(data != null && data != {} && Object.keys(data).length > 0){
        firebase.firestore().collection("data").doc(this.UId()).update(data).then(()=>{
            global.UserDataQueue.empty();
            if(callback != null){
                callback(true);
            }
        }).catch(err=>{
            this.Toast("Internet Connection Error Err643");
            //remove data because maybe user is offline
            global.UserDataQueue.empty();
            if(callback != null){
                callback(false);
            }
        });
    }else{
        if(callback != null){
            callback(true);
        }
    }
}

export function manageCoinHistory(coin,msg,callBack = null){
    AsyncStorage.getItem('coinsHistoryLength').then((res)=>{
        var value,pushAfterLength;
        try{
            pushAfterLength = global.controlRates.pushCoinHistoryAfterLength;
        }catch(err){
            pushAfterLength = 30;
        }
        try{
            value = parseInt(res);
        }catch(err){
            this.Toast("Something Went Wrong! Must Restart Credito! Err573");
            this.showNetworkErrorAlert();
            return;
        }
        AsyncStorage.getItem('coinHistory').then((result)=>{
            var oldHistory = {};
            try{
                oldHistory = JSON.parse(result);
                if(result == null || oldHistory == null){
                    oldHistory = {};
                }
            }catch(err){
                oldHistory = {};
            }
            const key = value + 1;
            oldHistory[key] = {
                coinsGiven: coin,
                message: msg ,
                time: new Date()
            };
            AsyncStorage.multiSet([['coinHistory',JSON.stringify(oldHistory)],['coinsHistoryLength',key.toString()]]).then(()=>{
                global.UserDataQueue.addData('coinsHistoryLength',key.toString());
                callBack();
                if(Object.keys(oldHistory).length > pushAfterLength){
                    this.pushCoinHistoryToServer();
                }
            });
        }).catch(err=>{this.Toast("Something Wrong! Err799")});
    });
}

export function pushCoinHistoryToServer(){
    AsyncStorage.getItem("coinHistory").then(res=>{
        var data = {};
        try{
            data = JSON.parse(res);
        }catch(err){
            this.Toast("Something Went Wrong! Err523");
            return;
        }
        if(Object.keys(data).length > 0){
            firebase.firestore().collection("coinHistory").doc(this.UId()).set(data,{merge: true}).then(()=>{
                AsyncStorage.setItem('coinHistory',JSON.stringify({}));
            });
        }
    }).catch(err=>{});
}

export function updateRandomCoinsV2(from , to , msg , callBackForGivenCoins = null){
    const addCoins = this.getRandomNo(from,to);
    // this.Toast("You Have Awarded "+addCoins+" Coins.");
    if(Number.isInteger(addCoins)){
        try{
            const coins = parseInt(global.coins);
            const totalCoins = parseInt(global.totalCoins);
            const newCoins = coins + addCoins;
            const totalNewCoins = totalCoins + addCoins;
            global.coins = newCoins;
            global.totalCoins = totalNewCoins;
            if(callBackForGivenCoins != null){
                callBackForGivenCoins(addCoins,newCoins);
            }
            this.manageCoinHistory(addCoins,msg,()=>{
                global.UserDataQueue.addData("coins",newCoins);
                global.UserDataQueue.addData("totalCoins",totalNewCoins);
                AsyncStorage.multiSet([["coins",newCoins.toString()],["totalCoins",totalNewCoins.toString()]]);
            });
        }catch(err){}
    }
}