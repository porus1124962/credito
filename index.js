import {AppRegistry} from 'react-native';
import App from './src/navigation/App';
import {name as appName} from './app.json';
import { setJSExceptionHandler } from "react-native-exception-handler";
import { Sentry } from 'react-native-sentry';
import * as firebase from 'react-native-firebase';
const user = firebase.auth().currentUser;

if(!(__DEV__)){
    Sentry.config('https://23f9f4ca7e8940d185831ca69ed7ae1d@sentry.io/1493353').install();
}

if(user != null){
    try{
        // set the user context
        Sentry.setUserContext({
            UserName: user.displayName == null ? "Unknown User" : user.displayName,
            Email: user.email,
            UserID: user.uid
        });
        
        // set the tag context
        Sentry.setTagsContext({
            "UserName": user.displayName == null ? "Unknown User" : user.displayName,
            "UserID": user.uid
        });
    }catch(Exception){
        
    }
}

if(!(__DEV__)){
    setJSExceptionHandler((error, isFatal) => {
        alert("Critical Error Occurred! We sincerely appologize for this. Our Team is informed."+error);
    },false);
}

AppRegistry.registerComponent(appName, () => App);