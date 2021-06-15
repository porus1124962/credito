import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Linking,
    Image,
    Dimensions
} from "react-native";
import {Button} from 'react-native-elements';
import {DrawerActions, createDrawerNavigator} from 'react-navigation';
import Header from '../../components/Header';

const {width,height} = Dimensions.get('window');

class AboutTerms extends Component {

    static navigationOptions = {
        drawerLabel: 'Terms & Privacy',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../../../drawables/images/sidebar/games.png')}
            style={[{tintColor: tintColor, width: 24, height : 24}]}
          />
        ),
    };

    render() {
        return (
            <View style={styles.container}>
                <Header propsRef={this.props} goBack={true} title="Terms & Privacy" />
                <View style={styles.subContainer}>
                    <Text style={styles.heading}>About Terms & Privacy</Text>
                    <Button title="Privacy Policy" buttonStyle={styles.btnContainer} onPress={()=>{
                        Linking.openURL("https://credito.flycricket.io/privacy.html").catch((err) => console.error('An error occurred', err));
                    }} />
                    <Button containerStyle={{marginTop: 20}} buttonStyle={styles.btnContainer} title="Terms & Conditions" onPress={()=>{
                        Linking.openURL("http://asz-credito.epizy.com/terms-condition.html").catch((err) => console.error('An error occurred', err));
                    }} />
                </View>
            </View>
        );
    }
}

export default AboutTerms;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000'
    },
    subContainer:{
        height: height*0.70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading:{
        color: '#fff',
        fontSize: 20,
        marginVertical: 10,
        fontWeight: 'bold',
        marginBottom: 50
    },
    btnContainer: {
        width: width*0.75,
        height: 45,
        borderColor: '#00f7d2',
        borderWidth: 2,
        borderRadius: 15
    },
});