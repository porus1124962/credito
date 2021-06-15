import React, { Component } from "react";
import { 
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    FlatList,
    AsyncStorage
} from "react-native";
import styles from '../../styles/AmazeLineStyle';
import Header from '../../components/Header';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import * as AmazeData from '../../components/AmazeLinesData';
import * as C from '../../components/Common';
import Loading from '../../components/Loading';

class LevelsButtons extends Component{
    render(){
        var iconName = this.props.lock == true ? "lock" : "unlock-alt";
        return(
            <TouchableOpacity style={styles.buttonContainer} onPress={()=>{this.props.onPress(this.props.lock,this.props.index)}}>
                <Text style={styles.buttonHeading}>{"Level " + (parseInt(this.props.index) + 1)}</Text>
                <FaIcon name={iconName} size={20} color="#00f7d2"/>
            </TouchableOpacity>
        );
    }
}

class AmazeLevels extends Component {

    constructor(props){
        super(props);
        this.state = {
            unlockLevels: 1,
            loading: true,
            levelsList: [],
        };
        this.ListMaker = this.ListMaker.bind(this);
    }

    IsLoading(loading){
        this.setState({loading})
    }

    componentDidMount(){
        this.ListMaker();
    }

    ListMaker(newLvlNo = null){
        if(newLvlNo != null){
            //prepare list
            var list = [];
            for(var i = 0; i < AmazeData.levels.length; i++){
                if(i < newLvlNo){
                    list.push(0);
                }else{
                    list.push(1);
                }
            }
            this.setState({
                unlockLevels : newLvlNo,
                levelsList: list
            })
            return;
        }
        AsyncStorage.getItem("amazeLevels").then(val=>{
            var levelsPlayed;
            try{
                levelsPlayed = parseInt(val) + 1;
            }catch(err){
                C.Toast("Something Wrong! Err344");
                return;
            }
            //prepare list
            var list = [];
            for(var i = 0; i < AmazeData.levels.length; i++){
                if(i < levelsPlayed){
                    list.push(0);
                }else{
                    list.push(1);
                }
            }
            this.setState({
                unlockLevels : levelsPlayed,
                levelsList: list,
                loading: false
            })
        });
    }

    renderItem = ({ item , index }) => (
        <LevelsButtons index={index} lock={item == 0 ? false : true} onPress={(locked,index)=>{
            if(locked == true){
                C.Toast("Win The Previous Level To Play This!");
            }else{
                //open that level
                this.props.navigation.navigate('AmazeLines',{lvlNo : index,unlockLevels: this.state.unlockLevels,onBackPress: this.ListMaker});
            }
        }}/>
    )

    keyExtractor = (item, index) => index.toString();
    
    render() {
        return (
            <View style={{flex: 1,backgroundColor: '#000'}}>
                <Header propsRef={this.props} goBack={true} title="Amaze Lines" />
                <Loading loading={this.state.loading}/>
                <Text style={{color: "#fff", textAlign: 'center',fontSize: 11,marginVertical: 3}}>More The Level You Reach Most Of The Coins Will Be Rewarded!</Text>
                <ScrollView style={{backgroundColor: '#000'}}>
                    <View style={styles.paddingBottom}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.levelsList}
                            renderItem={this.renderItem}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}
export default AmazeLevels;