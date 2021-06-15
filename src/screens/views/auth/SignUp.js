import React, { Component } from "react";
import { 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    ActivityIndicator,
    StatusBar,
    Linking
} from "react-native";
import styles from '../../styles/AuthStyle';
import cStyles from '../../styles/CStyle';
import {Button} from 'react-native-elements';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import * as C from '../../components/Common';
import firebase from 'react-native-firebase';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = ({
            name: '',
            email: '',
            pswd: '',
            ph: '',
            loading: false
        });

        this.signUpWithEmail = this.signUpWithEmail.bind(this);
    }

    coming(){
        C.Toast("Coming Soon!");
    }

    componentDidMount(){
        AsyncStorage.clear();
    }

    signUpWithEmail(){
        const ref = this;
        this.setState({
            loading: true
        });
        const name = this.state.name;
        const email = this.state.email;
        const pswd = this.state.pswd;
        const ph = this.state.ph;

        if(name == ""){
            C.Toast("Plz Fillout the name field");
            this.setState({
                loading: false
            });
        }else if(email == "" || !email.includes("@") || !email.includes(".")){
            C.Toast("Email is Blank or Wrong Email Format");
            this.setState({
                loading: false
            });
        }else if(pswd == ""){
            C.Toast("Plz Fillout the Password Field");
            this.setState({
                loading: false
            });
        }else if(ph == ""){
            C.Toast("Plz Fillout the Phone Field");
            this.setState({
                loading: false
            });
        }else{
            firebase.auth().createUserWithEmailAndPassword(email,pswd)
            .then(
                (user)=> {
                    const uId = user.user.uid;
                    const name = this.state.name;
                    const email = this.state.email;
                    const pswd = this.state.pswd;
                    const ph = this.state.ph;
                    
                    AsyncStorage.setItem("UId",uId);
                    AsyncStorage.setItem("Name",name);
                    AsyncStorage.setItem("Email",email);
                    AsyncStorage.setItem("Pswd",pswd);
                    AsyncStorage.setItem("Ph",ph);

                    firebase.firestore().collection("data").doc(uId).set({
                        userInfo:{
                            UId : uId,
                            Name : name,
                            Email : email,
                            Pswd : pswd,
                            Ph : ph
                        },
                        coins: 1,
                        totalCoins: 1
                    }).then(()=> {
                        ref.setState({
                            loading: false
                        });
                        C.Toast("Signed Up Successfullay...");
                        ref.props.navigation.navigate("Main");
                    },(err)=>{
                        ref.setState({
                            loading: false
                        });
                        C.Toast("Some Error Occurred! Please SignUp Again");
                        this.logout();
                    });
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

    logout(){
        firebase.auth().signOut();
        AsyncStorage.clear().catch(()=>{});
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#66FF99" barStyle="dark-content"/>
                <ScrollView style={{backgroundColor: "#66FF99"}}>
                    <View style={styles.panalLog}>
                        {
                            this.state.loading ? <ActivityIndicator style={cStyles.loading} size={50} color="#fff"/> : null
                        }
                        <Text style={styles.headingLog}>CREDITO</Text>
                        <Text style={styles.paraLog}>Welcome to Credito, Free Sign Up.</Text>
                        <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#000"
                            type="name" keyboardType="default" onChangeText={(value)=> this.setState({name : value})} value={this.state.name}/>
                        <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="#000"
                            type="email-address" keyboardType="email-address" onChangeText={(value)=> this.setState({email : value})} value={this.state.email}
                            autoCapitalize="none"
                        />
                        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#000"
                            type="password"  keyboardType="visible-password" onChangeText={(value)=> this.setState({pswd : value})} value={this.state.pswd} 
                            autoCapitalize="none"
                        />
                        <TextInput style={styles.input} placeholder="Mobile No." placeholderTextColor="#000"
                            type="phone"  keyboardType="phone-pad" onChangeText={(value)=> this.setState({ph : value})} value={this.state.ph} />
                        <Button title='Sign Up' type="outline" buttonStyle={styles.btnBg} titleStyle={styles.btnText} onPress={() => this.signUpWithEmail()} />
                        <TouchableOpacity style={styles.regParent} onPress={()=> {
                            this.props.navigation.navigate('Login');
                        }}>
                            <Text style={styles.reg}>Have An Account? SignIn Here</Text>
                        </TouchableOpacity>
                        
                        <Text style={styles.note}  onPress={()=>{
                            Linking.openURL("https://credito.flycricket.io/privacy.html").catch((err) => console.error('An error occurred', err));
                        }}>By SignUp You are agree to our Terms & Privacy</Text>

                        <Text style={styles.iconRowHeading}>Sign In With Social Sites</Text>
                        <View style={styles.iconRow}>
                            <TouchableOpacity style={styles.icon} onPress={this.coming} >
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
export default SignUp;
