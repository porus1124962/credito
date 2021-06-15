import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    View,
    TextInput,
    AsyncStorage,
    Dimensions,
    Linking
} from 'react-native';
import {Button} from 'react-native-elements';
//Payment file css is enough for this activity
import styles from '../../styles/PaymentStyle';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import * as firebase from 'react-native-firebase';
import * as C from '../../components/Common';
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

let {width,height} = Dimensions.get('window');

export default  class ProCode extends Component{    
    constructor(){
        super()
        this.state = {
            value: "",
            loading: false,
            coins: global.coins,
            addCoins: 0
        }
        this.codeText = this.codeText.bind(this);
    }

    codeText(newText){
        this.setState({
            value : newText
        })
    }

    checkCode(){
        const userInput = this.state.value;
        if(userInput == "" || userInput == null || userInput.includes("|")){
            C.Toast("Please Enter Valid Code");
            this.setState({value: ''});
            return;
        }
        
        firebase.config().getValue('PromotionalCode').then((snap)=>{
            const promoCode = snap.val().toString();
            if(promoCode == "empty"){
                C.Toast("Invalid or Expired code!");
                this.setState({value: ''});
                return;
            }
            if(promoCode == "No value"){
                C.Toast("Internet Slow / Restart Credito");
                this.setState({value: ''});
                return;
            }
            if(promoCode.includes("|"+userInput+"|")){
                    AsyncStorage.getItem("usedPromo").then(val=>{
                    if(val == "empty" || !(val.includes(userInput) )){
                            //User is valid
                            const coinsKey = 'PromoCoins'+userInput;
                            firebase.config().getValue(coinsKey).then((snap)=>{
                                var addCoins;
                                try{
                                    addCoins = parseInt(snap.val().toString());
                                }catch(err){
                                    C.Toast('Something Went Wrong! Please Restart Credito Err355');
                                    this.setState({value: ''});
                                    return;
                                }
                                if(!Number.isNaN(addCoins)){
                                    var promolist = val == null ? "" : val;
                                    promolist += "|"+userInput+"|";
                                    global.UserDataQueue.addData("usedPromo",promolist);
                                    AsyncStorage.setItem('usedPromo',promolist);
                                    C.updateRandomCoinsV2(addCoins,addCoins,13,(addCoins,totalCoins)=>{
                                        C.Toast('Congrats! Code Is Valid');
                                        this.setState({coins: global.coins});
                                        global.active = true;
                                        this.setState({addCoins: addCoins})
                                        C.Toast('Keep using Facebook Page Credito Official! & Get Awesome Codes On Daily Basis.');
                                        C.Toast('Keep using Facebook Page Credito Official! & Get Awesome Codes On Daily Basis.');
                                        this.setState({value: ''});
                                    });
                                }else{
                                    C.Toast('Something Went Wrong! Please Restart Credito Err356');
                                    this.setState({value: ''});
                                    return;
                                }
                            });
                    }else{
                        C.Toast("Bonus Code is already used");
                        this.setState({value: ''});
                    }
                });
            }else{
                C.Toast("Invalid or Expired code!");
                this.setState({value: ''});
            }  
        }).catch(err=>{
            C.Toast('Something Went Wrong! Please Restart Credito Err357');
        })
    }

    render(){
        return( 
            <View style={styles.container}>
                <Header coins={this.state.coins} propsRef={this.props} goBack={true} title="Bonus Code" />
                <AlertBox.CoinsAlert coins = {this.state.addCoins}/>
                <Loading loading={this.state.loading} />
                <ScrollView>
                    <Text style={[styles.operatorText,{marginTop: 5}]}>Enter Bonus Code to Get Reward</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Type Code Here..."
                            placeholderTextColor="#00f7d2"
                            defaultValue = {this.state.value}
                            onChangeText = {this.codeText}
                        />
                        <Button title="Submit to Get Reward"
                            buttonStyle={styles.buttonContainer}
                            onPress = {()=> this.checkCode()}
                        />
                        <Text style={{color: '#fff',textAlign: 'center',fontSize: 16,lineHeight: 22,marginBottom: 12}}>
                            Like our facebook page (Credito Official) & stay tuned with new codes & offers. Use them before they get expired. Page Link: <Text style={{fontWeight: 'bold',textDecorationLine: 'underline'}} onPress={()=>{
                            Linking.canOpenURL('fb://page/112737633408957').then(supported=>{
                                if(supported){
                                    return Linking.openURL('fb://page/112737633408957');
                                }else{
                                    C.Toast('Facebook Not Installed! Opening Browser');
                                    return Linking.openURL('https://www.facebook.com/creditoofficial');
                                }
                            });
                        }}>https://www.facebook.com/creditoofficial</Text>
                        </Text>
                        <Banner
                            // unitId="ca-app-pub-9879472653351292/9614484309"
                            //test id
                            unitId={__DEV__ ? "ca-app-pub-3940256099942544/6300978111" : "ca-app-pub-9879472653351292/9608002334"}
                            size={Math.floor(width)+"x250"}
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