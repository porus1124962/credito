import React, { Component } from "react";
import { 
    View,
    StatusBar,
    TouchableOpacity,
    Text,
    NetInfo,
    AsyncStorage,
    Dimensions,
    Animated
} from "react-native";
import styles from '../styles/HeaderStyle';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import {DrawerActions, createDrawerNavigator} from 'react-navigation';
import * as C from '../components/Common';

let {width,height} = Dimensions.get('window');

class Header extends Component {

    _didFocusSubscription;

    constructor(props){
        super(props);
        this.state = {
            coins : props.coins,
            isConnected : true,
            conversionRate: 1,
            progressStatus: 0,
            level: 1,
        };
        this.anim = new Animated.Value(this.state.progressStatus);
        this._didFocusSubscription = this.props.propsRef.navigation.addListener('didFocus', payload =>{
            var per = parseInt((((global.totalCoins - global.requireCoins) / global.passCoins) * 100));
            if(per >= 100){
                per = 100
            }
            if(Number.isNaN(per)){
                per = 0;
            }
            this.setState({coins: global.coins,progressStatus: per,level: global.level});
        });
    }

    componentWillReceiveProps(props){
        if(this.state.coins != props.coins || global.per == null){
            var per = parseInt((((global.totalCoins - global.requireCoins)/ global.passCoins) * 100));
            if(per >= 100){
                per = 100;
                this.handleVersionChanged();
            }
            if(Number.isNaN(per)){
                per = 0;
            }
            if(global.per == null){
                global.per = per;
                this.setState({coins: global.coins,level: global.level,conversionRate: global.conversionRates});
                this.onAnimate(per);
            }else{
                global.per = per;
                this.setState({coins: global.coins,progressStatus: per});
            }
        }
    }

    handleVersionChanged(){
        const newLevel = global.level+1;
        C.Toast("Welcome To New Level " + newLevel.toString());
        // const rewardCoins = controlRates.levelAccToCoins['level'+global.level].rewardCoins;
        // C.updateRandomCoinsV2(rewardCoins,rewardCoins,14,(a,b)=>{
        //     this.setState({coins: global.coins})
        // });

        C.getUpdateControlRateAccToLevel(newLevel,(controlRates)=>{
            global.UserDataQueue.addData("level",newLevel);
            AsyncStorage.setItem("level",newLevel.toString());

            const requireCoins = controlRates.levelAccToCoins['level'+newLevel].requireCoins;
            global.requireCoins = requireCoins;

            const passCoins = controlRates.levelAccToCoins['level'+newLevel].passCoins;
            global.passCoins = passCoins;
            global.level = newLevel;

            var per = parseInt((((global.totalCoins - requireCoins) / passCoins) * 100));
            if(per > 100){
                //some error
                per = 0;
            }
            if(Number.isNaN(per)){
                per = 0;
            }
            global.per = per;
            this.setState({
                level: newLevel,
                progressStatus: per
            })
        });
    }

    onAnimate = (progressPercentage) =>
    {
        this.anim.addListener(({value})=>{  
            this.setState({progressStatus: parseInt(value,10)});
        });  
        Animated.timing(this.anim,{ 
            toValue: progressPercentage,
            duration: 2500,  
            useNativeDriver: true
        }).start();
    }

    componentWillMount(){
        if(global.per != null){
            this.setState({progressStatus: global.per,conversionRate:global.conversionRates,level: global.level});
        }
    }

    componentDidMount(){
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this._handleConnectivityChange
        );

        NetInfo.isConnected.fetch().then(
            (isConnected) => { this.setState({isConnected}); }
        );
    }

    componentWillUnmount(){
        this.anim.removeAllListeners();
        this._didFocusSubscription && this._didFocusSubscription.remove();
        NetInfo.isConnected.removeEventListener(
            'connectionChange',
            this._handleConnectivityChange
        );
    }

    _handleConnectivityChange = (isConnected) => {
        this.setState({
            isConnected,
        });
    };

    render() {
        var coinBarColor;
        if(this.state.isConnected){
            coinBarColor = "#00f7d2";
        }else{
            coinBarColor = "#FF6A6A";
        }
        return (
            <View>
                <StatusBar backgroundColor="#00f7d2" barStyle="dark-content" />
                <View style={styles.container}>
                
                    <View style={styles.row1}>
                        {
                            this.props.goBack ? 
                            <TouchableOpacity onPress={()=>{
                                this.props.propsRef.navigation.goBack();
                            }}>
                                <FaIcon name="arrow-left" size={30} color="#000"/>
                            </TouchableOpacity> : 
                            <TouchableOpacity onPress={()=>{
                                this.props.propsRef.navigation.dispatch(DrawerActions.openDrawer());
                            }}>
                                <FaIcon name="bars" size={30} color="#000"/>
                            </TouchableOpacity>
                        }
                        <Text style={styles.heading}>
                        {
                            this.props.title ? this.props.title : "Credito"
                        }
                        </Text>
                    </View>

                    {/*{*/}
                    {/*    this.props.disSubHead ? null :*/}
                    {/*    <View style={[styles.row2,{backgroundColor : coinBarColor}]}>*/}
                    {/*        {*/}
                    {/*            this.state.isConnected == true ?*/}
                    {/*            <Text style={styles.subLine}>*/}
                    {/*                You have {this.state.coins} Coins {this.state.conversionRate == 1 ? null : "/ " + (Number.isNaN(this.state.coins / this.state.conversionRate) == true ? 0 : this.state.coins / this.state.conversionRate).toFixed(3) + " PKR (May Differ)" }*/}
                    {/*            </Text> :*/}
                    {/*            <Text style={styles.subLine}>*/}
                    {/*                You are Offline*/}
                    {/*            </Text>*/}
                    {/*        }*/}
                    {/*    </View>*/}
                    {/*}*/}

                    <View style={{backgroundColor: '#CCFFF8',justifyContent: 'center'}}>
                        <View style={[styles.progresBar, {width: (width / 100) * this.state.progressStatus}]} />
                        <Text style={{color: '#000',fontWeight: '500',fontSize: 12,position: 'absolute',alignSelf: 'center'}}>Level {this.state.level}</Text>
                    </View>

                </View>
            </View>
        );
    }
}
export default Header;