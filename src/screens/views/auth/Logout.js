import React, {Component} from 'react';
import {DrawerActions, createDrawerNavigator} from 'react-navigation';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements';
import * as firebase from 'react-native-firebase';
import Header from '../../components/Header';

var fullWidth = Dimensions.get('window').width;

export default class Logout extends Component{

    static navigationOptions = {
        drawerLabel: 'Logout',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../../../drawables/images/sidebar/logoutIcon.png')}
            style={[{tintColor: tintColor, width: 24, height : 24}]}
          />
        ),
    };

    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
    }

    openDrawer(){
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    }

    logout(){
        firebase.auth().signOut();
        AsyncStorage.clear().catch(()=>{});
        this.props.navigation.navigate("Login");
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <Header propsRef={this.props} />
                <View style={styles.container}>
                    <View style={{alignItems: 'center'}}>
                        <Icon name="power-settings-new" size={90}/>
                        <Text style={styles.logoutText}>
                            Hey, You are going to Logout!!! => Take Care
                        </Text>
                    </View>
                    <Button buttonStyle={styles.btnLogout} titleStyle={{color: '#21c424'}}
                        title="Log out" type="outline" onPress={this.logout} 
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    btnLogout: {
        width: fullWidth*0.8,
        height: 35,
        borderRadius: 14,
        borderColor: '#21c424'
    },
    logoutText: {
        marginTop: 15,
        fontWeight: 'bold'
    }
});