import React, { Component } from "react";
import { 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    AsyncStorage,
    Dimensions,
    StatusBar
} from "react-native";
import styles from '../../styles/AuthStyle';
import cStyles from '../../styles/CStyle';
import {Button} from 'react-native-elements';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import * as C from '../../components/Common';
import * as firebase from 'react-native-firebase';

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            email: '',
            pswd: '',
        }
    }

    componentDidMount(){
        AsyncStorage.clear();
    }

    signInWithEmail(){
        const ref = this;
        this.setState({
            loading: true
        });
        const email = this.state.email;
        const pswd = this.state.pswd;

        if(email == "" || !email.includes("@") || !email.includes(".")){
            C.Toast("Email is Blank or Wrong Email Format");
            this.setState({
                loading: false
            });
        }else if(pswd == ""){
            C.Toast("Plz Fillout the Password Field");
            this.setState({
                loading: false
            });
        }else{
            firebase.auth().signInWithEmailAndPassword(email,pswd)
            .then(
                (user)=> {
                    const uId = user.user.uid;
                    AsyncStorage.setItem("UId",uId);
                    AsyncStorage.setItem("Email",email);
                    AsyncStorage.setItem("Pswd",pswd);
                    firebase.firestore().collection('data').doc(uId).get().then((obj)=>{
                        const data = obj.data();
                        const name = data.userInfo.Name;
                        const ph = data.userInfo.Ph;
                        AsyncStorage.setItem("Name",name);
                        AsyncStorage.setItem("Ph",ph);
                    }).catch((exception)=>{});
                    this.setState({
                        loading: false
                    });
                    C.Toast("Successfullay Signed In");
                    C.Toast("Welcome");
                    this.props.navigation.navigate("Main");
                },
                (err)=> {
                    ref.setState({
                        loading: false
                    });
                    C.Toast(""+err);
                }
            );
        }
    }

    coming(){
        C.Toast("Coming Soon!");
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#66FF99" barStyle="dark-content"/>
                <ScrollView style={{backgroundColor: "#66FF99"}}>
                    {
                        this.state.loading ? <ActivityIndicator style={cStyles.loading} size={50} color="#fff"/> : null
                    }
                    <View style={[styles.panalLog,{width:fullWidth,height: fullHeight-25,}]}>
                        <Text style={styles.headingLog}>CREDITO</Text>
                        <Text style={styles.paraLog}>Welcome to Credito.</Text>
                        <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="#000"
                        type="email-address"  keyboardType="email-address" onChangeText={(value)=> this.setState({email:value})}
                        value={this.state.email} autoCapitalize="none" />
                        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#000"
                        type="password"  keyboardType="visible-password" onChangeText={(value)=> this.setState({pswd:value})}
                        value={this.state.pswd} autoCapitalize="none" />
                        <Button title='Sign In' type="outline" buttonStyle={styles.btnBg} titleStyle={styles.btnText} onPress={()=> this.signInWithEmail()}/>
                        <TouchableOpacity style={styles.regParent} onPress={()=> {
                            this.props.navigation.navigate('SignUp');
                        }}>
                            <Text style={styles.reg}>Don't Have Account? SignUp here</Text>
                        </TouchableOpacity>
                        <Text style={styles.iconRowHeading}>Sign In With Social Sites</Text>
                        <View style={styles.iconRow}>
                            <TouchableOpacity style={styles.icon} onPress={this.coming}>
                                <FAIcon name="facebook-square" size={50} color="#fff"/>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.icon} onPress={this.coming}>
                                <FAIcon name="google" size={50} color="#fff"/>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.icon} onPress={this.coming}>
                                <FAIcon name="phone-square" size={50} color="#fff"/>
                            </TouchableOpacity>
                        </View>
                    </View>
               </ScrollView>
               
            </View>
        );
    }
}
export default Login;