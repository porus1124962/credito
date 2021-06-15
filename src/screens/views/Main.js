import React, { Component } from "react";
import { 
    View,
    ScrollView,
    Text,
    NetInfo,
    Alert,
    BackHandler,
    Linking,
    AsyncStorage,
    Animated,
    TouchableOpacity,
    Dimensions
} from "react-native";
import {Button} from 'react-native-elements';
import styles from '../styles/MainStyle';
import MainBtn from '../components/MainBtn';
import Header from '../components/Header';
import * as firebase from 'react-native-firebase';
import * as C from '../components/Common';
import VersionNumber from 'react-native-version-number';
import AppSecurityChecker from '../components/AppSecurityChecker';
import SplashScreen from 'react-native-splash-screen';
import * as AlertBox from '../components/AlertBox';

let {width, height} = Dimensions.get('window');

const firestore = firebase.firestore();

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();

const instertialAd = firebase.admob().interstitial(__DEV__ ? "ca-app-pub-3940256099942544/1033173712" : "ca-app-pub-9879472653351292/9251466035");

// original id
const videoAd = firebase.admob().rewarded(__DEV__ ? 'ca-app-pub-3940256099942544/5224354917' : 'ca-app-pub-9879472653351292/1525019257');
// test id
// const videoAd = firebase.admob().rewarded('ca-app-pub-3940256099942544/5224354917');

export default class Main extends Component {

    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props){
        super(props);
        this.state = {
            rewardCoins: { from : 0, to : 0},
            watchTimes: 1,
            timeInMin: 0,
            showAdDialog: false,
            dialogMsg: 'Loading...',
            dialogBtn: false,
            instertialTime: 45,
            backClickCount: 0,
            coins: global.coins,
            addCoins: 0
        }
        this.springValue = new Animated.Value(100);
        this.openVideoAd = this.openVideoAd.bind(this);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>{
            this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress.bind(this));
        });
    }

    checkSignature(){
        firebase.config().getValue('signatureByPass').then((snap)=>{
            //TODO: Working
            if(snap.val().toString() == "false"){
                AppSecurityChecker.appSignatureChecker((result)=>{
                    C.Toast(result.toString());
                    if(result == "Fail" || result == "WrongSig"){
                        // this.killApp();
                    }
                });
            }
        }).catch((err)=>{});
    }

    killApp(){
        firestore.collection("SignatureChanged").doc(C.UId()).set({
            sigChanged: true
        }).then(()=>{
            AppSecurityChecker.appKiller();
        }).catch((exception)=>{
            C.Toast("Connection Is Slow / Not Working!");
        });
    }

    checkAdBlocker(){
        AppSecurityChecker.adBlockChecker((result)=>{
            if(result == true){
                firestore.collection("AdBlockerUsers").doc(C.UId()).set({
                    using: true
                }).catch((exception)=>{
                    C.Toast("Connection Is Slow / Not Working!");
                });
                Alert.alert(
                    'Alert!',
                    'Hey! You are using adblocker. Please disable your adblocker to use Credito.',
                    [
                      {text: 'Exit', onPress: () => BackHandler.exitApp() },
                    ],
                    {cancelable: false},
                );
            }
        },
        (result)=>{
            alert(result)
        });
    }

    checkNetwork(){
        NetInfo.isConnected.fetch().then(isConnected => {
            if(!isConnected){
                C.showNetworkErrorAlert();
            }
        });
    }

    getAllRemoteConfigs(){
        if (__DEV__) {
            firebase.config().enableDeveloperMode();
        }
        
        // Set default values
        firebase.config().setDefaults({
            latestVersionFeatures: '',
            updatedVersions: '',
            needUpdateVersions: '',
            stoppedVersions: '',
            signatureByPass: 'false',
            maintenance: 'false',
            PromotionalCode: 'No value',
            easyload:'true',
            easypaisa:'Internet Problem Plz Restart Credito!',
            jazzcash:'Internet Problem Plz Restart Credito!',
            closeDialogTime: 2500,
            closeDialogTimeWithBtn: 5000
        });
        
        firebase.config().fetch(900).then(() => {
            firebase.config().activateFetched();
            this.checkServerMaintanence();
            this.checkAppVersion();
        }).catch((err)=>{
            C.Toast("Connection Is Slow / Not Working!");
        });
    }

    getDataDocOfUser(){
        firestore.collection("data").doc(C.UId()).get().then((snap)=>{
            C.Toast("Loading...",true);
            const data = snap.data();
            let MathQuestionEasyNo,MathQuestionHardNo,amazeLevels,wordCompletionNo,isMaintenence,maintenanceMsg,level,lastAdTime,
                lastAdCount,coinsHistoryLength,MCQ0,MCQ1,MCQ2,coins,totalCoins,usedPromo;
            try{
                amazeLevels = data.amazeLevels.toString();
            }catch(err){
                amazeLevels = "0";
            }
            try{
                wordCompletionNo = data.wordCompletionNo.toString();
            }catch(err){
                wordCompletionNo = "0";
            }
            try{
                isMaintenence = data.maintenance.toString();
                maintenanceMsg = data.maintenanceMsg.toString();
            }catch(err){
                isMaintenence = "false";
                maintenanceMsg = "";
            }
            try{
                level = data.level.toString();
            }catch(err){
                level = "1";
            }
            try{
                lastAdTime = data.lastAdTime.toString();
                lastAdCount = data.lastAdCount.toString();
            }catch(err){
                lastAdTime = 'empaty';
                lastAdCount = 'empaty';
            }
            try{
                coinsHistoryLength = data.coinsHistoryLength.toString();
            }catch(err){
                coinsHistoryLength = '0';
            }
            try{
                MathQuestionEasyNo = data.MathQuestionEasyNo.toString();
            }catch(err){
                MathQuestionEasyNo = '0';
            }
            try{
                MathQuestionHardNo = data.MathQuestionHardNo.toString();
            }catch(err){
                MathQuestionHardNo = '0';
            }
            try{
                MCQ0 = data.MCQ0.toString();
            }catch(err){
                MCQ0 = '0';
            }
            try{
                MCQ1 = data.MCQ1.toString();
            }catch(err){
                MCQ1 = '0';
            }
            try{
                MCQ2 = data.MCQ2.toString();
            }catch(err){
                MCQ2 = '0';
            }
            try{
                coins = data.coins.toString();
                try{
                    totalCoins = data.totalCoins.toString();
                }catch(err){
                    totalCoins = '1';
                    global.UserDataQueue.addData("totalCoins",1);
                    global.UserDataQueue.addData("level",1);
                }
            }catch(err){
                coins = '0';
                totalCoins = '0';
            }

            try{
                usedPromo = data.usedPromo.toString();
            }catch(err){
                usedPromo = "empty";
            }

            if(isMaintenence == true){
                //maintenence is going on
                Alert.alert(
                    'Alert!',
                    maintenanceMsg,
                    [
                        {text: 'Exit', onPress: () => BackHandler.exitApp() },
                    ],
                    {cancelable: false},
                );
                return;
            }
            
            global.level = parseInt(level);
            global.coins = coins;
            global.totalCoins = totalCoins;

            C.getUpdateControlRateAccToLevel(level,(data)=>{
                this.setDataToState(data);
            });

            AsyncStorage.multiSet([['usedPromo',usedPromo],['totalCoins',totalCoins],['coins',coins],['MCQ0',MCQ0],['MCQ1',MCQ1],['MCQ2',MCQ2],['MathQuestionHardNo',MathQuestionHardNo],['MathQuestionEasyNo',MathQuestionEasyNo],['coinsHistoryLength',coinsHistoryLength],['lastAdTime',lastAdTime],['lastAdCount',lastAdCount],['level',level],['amazeLevels',amazeLevels],['wordCompletionNo',wordCompletionNo]]).catch((err)=>{
                C.Toast("Somthing Went Wrong! Restart Credito");
                C.Toast("Somthing Went Wrong! Restart Credito");
                C.showNetworkErrorAlert();
            });
        }).catch((err)=>{
            C.Toast("Connection Is Slow / Not Working! Restart Credito");
            C.Toast("Connection Is Slow / Not Working! Restart Credito");
            C.showNetworkErrorAlert();
        });
    }

    checkAppVersion(){
        var version = VersionNumber.appVersion;
        firebase.config().getValues(["latestVersionFeatures","updatedVersions","needUpdateVersions","stoppedVersions"]).then(snap=>{
            const latestVersionFeatures = snap.latestVersionFeatures.val().toString();
            const updatedVersions = snap.updatedVersions.val().toString();
            const needUpdateVersions = snap.needUpdateVersions.val().toString();
            const stoppedVersions = snap.stoppedVersions.val().toString();
            try{
                if(!updatedVersions.includes(version)){
                    if(needUpdateVersions.includes(version)){
                        Alert.alert(
                            'Alert',
                            'You are using old version ('+version+') of Credito. New Version is released.\nFeatures:\n'+latestVersionFeatures,
                            [
                                {text: 'Update Now', onPress: () => 
                                    {
                                        BackHandler.exitApp();
                                        Linking.openURL("https://play.google.com/store/apps/details?id=com.credito").catch((err) => console.error('An error occurred', err));
                                    }
                                },
                                {text: 'Ok', onPress: () =>{} },
                            ],
                            {cancelable: false},
                        );
                    }else if(stoppedVersions.includes(version)){
                        Alert.alert(
                            'Alert',
                            'You are using '+version+' which is now obsolete. Click update to update your app or Click Exit.',
                            [
                                {text: 'Update Now', onPress: () => 
                                    {
                                        BackHandler.exitApp();
                                        Linking.openURL("https://play.google.com/store/apps/details?id=com.credito").catch((err) => console.error('An error occurred', err));
                                    }
                                },
                                {text: 'Exit', onPress: () => BackHandler.exitApp() },
                            ],
                            {cancelable: false},
                        );
                    }
                }
            }catch(err){}
        }).catch(err=>{
            C.Toast("Connection Is Slow / Not Working!");
        });
    }

    checkServerMaintanence(){
        firebase.config().getValue("maintenance").then(snap=>{
            const val = snap.val().toString();
            if(val != "false"){
                Alert.alert(
                    'Alert!',
                    val,
                    [
                        {text: 'Exit', onPress: () => BackHandler.exitApp() },
                    ],
                    {cancelable: false},
                );
            }
        }).catch(err=>{C.Toast("Connection Is Slow / Not Working!");});
    }

    setDataToState(controlRates){
        SplashScreen.hide();
        const cKey = "level" + global.level;
        const passCoins = controlRates.levelAccToCoins[cKey].passCoins;
        const requireCoins = controlRates.levelAccToCoins[cKey].requireCoins;
        const conversionRates = controlRates.Payment.conversionOf1RS;
        global.passCoins = passCoins;
        global.requireCoins = requireCoins;
        global.conversionRates = conversionRates;
        this.setState({
            coins: coins,
            rewardCoins : {
                from : controlRates.VideoReward.RewardCoins.from,
                to : controlRates.VideoReward.RewardCoins.to,
            },
            watchTimes: controlRates.VideoReward.WatchTimes,
            timeInMin: controlRates.VideoReward.timeInMin,
            instertialTime : controlRates.InstertialTimeInSec,
        });
        this.handleUserDataRefresh = C.pushUserDataToServer(controlRates.refreshUserDataInSec);
    }

    componentWillMount(){
        C.Toast("Loading.",true);
        global.UserDataQueue = new UserDataQueue();
        this.checkNetwork();
        this.getAllRemoteConfigs();
        //user acc menantance msg work done in below func
        this.getDataDocOfUser();
        this.checkAdBlocker();
        // this.checkSignature();
    }

    componentWillUnmount(){
        clearInterval(this.handleInstertialInterval);
        clearInterval(global.controlRatesInterval);
        clearInterval(this.handleUserDataRefresh);
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    handleBackPress = () => {
        if(this.state.backClickCount == 1){
            C.forcePushUserDataToServer((res)=>{
                this.killApp();
                return true;
            });
        }else{
            this._spring();
            return true;
        }
    };

    _spring() {
        this.setState({backClickCount: 1}, () => {
            Animated.sequence([
                Animated.spring(
                    this.springValue,
                    {
                        toValue: -.15 * height,
                        friction: 5,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    this.springValue,
                    {
                        toValue: 100,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),

            ]).start(() => {
                this.setState({backClickCount: 0});
            });
        });
    }
    
    componentDidMount(){
        firebase.admob().initialize("ca-app-pub-9879472653351292~2170384804");
        // if(!(__DEV__)){
        //     this.handleInstertialInterval = C.handleInstertial(this.state.instertialTime);
        // }
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>{
            this.backHandler.remove();
        });
    }

    openVideoAd(){
        const ref = this;
        this.setState({
            showAdDialog: true,
            dialogMsg: 'Loading...',
            dialogBtn: false
        });
        const currentDateTime = new Date();
        const waitInMs = this.state.timeInMin*60*1000;
        AsyncStorage.multiGet(["lastAdTime","lastAdCount"]).then((value)=>{
            var lastAdCount,lastAdTime;
            try{
                lastAdTime = value[0][1];
                lastAdCount = value[1][1];
            }catch(err){
                lastAdCount = 5;
                lastAdTime = 0;
            }
            if(lastAdTime == 'empaty' || lastAdCount == 'empaty'){
                lastAdTime = currentDateTime.getTime();
                lastAdCount = 0;
                ref.openVideoAdHelper2(lastAdCount,currentDateTime);
            }else if(parseInt(lastAdCount) < parseInt(ref.state.watchTimes)){
                ref.openVideoAdHelper2(lastAdCount,currentDateTime);
            }else if(currentDateTime.getTime() < lastAdTime){
                //this is error must reset it
                lastAdTime = currentDateTime.getTime();
                lastAdCount = 0;
                ref.openVideoAdHelper2(lastAdCount,currentDateTime);
            }else if((currentDateTime.getTime() - lastAdTime) >= waitInMs){
                ref.openVideoAdHelper2(lastAdCount,currentDateTime);
            }else{
                const remWaitInMs = waitInMs - (currentDateTime.getTime() - lastAdTime);
                C.Toast("You can Watch Ad After " + ref.msToHMS(remWaitInMs));
                ref.setState({
                    showAdDialog: false,
                });
            }
        }).catch(err=>{
            ref.openVideoAdHelper2(0,currentDateTime);
        });
    }

    msToHMS( ms ) {
        var seconds = ms / 1000;
        const hours = parseInt( seconds / 3600 );
        seconds = seconds % 3600;
        const minutes = parseInt( seconds / 60 );
        seconds = parseInt(seconds % 60);
        return (hours == 0 ? " " : hours +" hours and ") + (minutes == 0 ? " " : minutes +" minutes and ") + seconds+" seconds!";
    }

    openVideoAdHelper2(lastAdCounting,currentDateTime){
        var lastAdCount = parseInt(lastAdCounting);
        const ref = this;
        videoAd.loadAd(request.build());

        videoAd.on('onAdLoaded', () => {
            if (videoAd.isLoaded()) {
                videoAd.show();
            }
        });

        videoAd.on('onAdFailedToLoad', ()=>{
            C.Toast("Ad Not Available");
            this.setState({
                showAdDialog: false,
            });
        });

        videoAd.on('onRewarded', (event) => {
            //success ad shown
            const saveCount = lastAdCount >= ref.state.watchTimes ? 0 : lastAdCount + 1;
            AsyncStorage.multiSet([['lastAdTime',currentDateTime.getTime().toString()],['lastAdCount',saveCount.toString()]]);
            global.UserDataQueue.addData("lastAdTime",currentDateTime.getTime());
            global.UserDataQueue.addData("lastAdCount",saveCount);

            videoAd.on('onAdClosed', () => {
                setTimeout(()=>{
                    this.setState({
                        showAdDialog: true,
                        dialogBtn: true,
                        dialogMsg: 'Congratulations'
                    });
                },500);
            });
        });
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <AlertBox.CoinsAlert coins={this.state.addCoins}/>
                <Header propsRef={this.props} coins={this.state.coins}/>
                <Animated.View style={[styles.animatedView, {transform: [{translateY: this.springValue}]}]}>
                    <Text style={styles.exitTitleText}>Press back again to exit the app</Text>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => BackHandler.exitApp()}
                    >
                        <Text style={styles.exitText}>Exit</Text>
                    </TouchableOpacity>

                </Animated.View>
                {
                    this.state.showAdDialog == true ?
                    <View style={styles.adAlertContainer}>
                        <View style={styles.adAlertSubContainer} >
                            {
                                this.state.dialogBtn == false ?
                                <Button buttonStyle={styles.dialogClose} titleStyle={{color: '#000'}} title="X" type="solid"
                                    onPress={()=>{
                                        this.setState({
                                            showAdDialog: false
                                        })
                                    }}
                                /> : null
                            }
                            <Text style={styles.adDialogMsg}>{this.state.dialogMsg}</Text>
                            {
                                this.state.dialogBtn == true ? 
                                <Button buttonStyle={styles.adDialogBtn} titleStyle={{color: '#fff'}}
                                    type="outline" title="Get Reward"
                                    onPress={()=>{
                                        C.updateRandomCoinsV2(this.state.rewardCoins.from,this.state.rewardCoins.to,11,(addCoins)=>{
                                            this.setState({coins: global.coins});
                                            global.active = true;
                                            this.setState({addCoins:addCoins})
                                        });
                                        this.setState({
                                            showAdDialog: false,
                                            dialogBtn: false,
                                            dialogMsg: 'Loading...'
                                        });
                                    }}
                                />
                                : null
                            }
                        </View>
                    </View>
                    : null
                }
                <ScrollView>
                    <View style={styles.subContainer}>
                        <MainBtn iconName="gamepad" title="Games" onPress={()=>{
                            this.showInterstitial();
                            this.props.navigation.navigate("Games");
                        }} />
                        <MainBtn iconName="scroll" title="MCQS" onPress={()=>{
                            this.showInterstitial();
                            this.props.navigation.navigate("MCQs");
                        }} />
                        <MainBtn iconName="calculator" title="Math Questions" onPress={()=>{
                            this.showInterstitial();
                            this.props.navigation.navigate("MathQ");
                        }} />
                        <MainBtn iconName="coins" title="Quick Video" onPress={()=>{
                            this.openVideoAd();
                        }} />
                        <MainBtn iconName="play" title="More Apps" onPress={()=>{
                            this.showInterstitial();
                            this.props.navigation.navigate("AppMarket");
                        }} />
                        <MainBtn iconName="hands-helping" title="About Us" onPress={()=>{
                            this.showInterstitial();
                            C.Toast("Coming Soon...");
                        }} />
                        <Banner
                            // unitId="ca-app-pub-9879472653351292/2202044511"
                            //test id
                            unitId={__DEV__ ? "ca-app-pub-3940256099942544/6300978111" : "ca-app-pub-9879472653351292/9608002334"}
                            size="SMART_BANNER"
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

    showInterstitial(){
        let isLoaded = false;
        instertialAd.loadAd(request.build());

        instertialAd.on('onAdLoaded', () => {
            isLoaded = true;
        });

        if(isLoaded){
            instertialAd.show();
        }else{
            instertialAd.loadAd(request.build());
            instertialAd.show();
        }
    }

}

class UserDataQueue{
    constructor(){
        this.map = {};
    }

    addData(key,value){
        this.map[key] = value;
    }

    getAllData(){
        return this.map;
    }

    empty(){
        this.map = {};
    }
}