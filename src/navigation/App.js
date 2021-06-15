import React from 'react';
import { 
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems,
  createAppContainer,
} from "react-navigation";
import {View , Image, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Main from '../screens/views/Main';
import Login from '../screens/views/auth/Login';
import SignUp from '../screens/views/auth/SignUp';
import Logout from '../screens/views/auth/Logout';
import AuthChecker from '../navigation/AuthChecker';
import Games from '../screens/views/games/Games';
import TicTacToe from '../screens/views/games/TicTacToe';
import WordCompletion from '../screens/views/games/WordCompletion';
import CountLove from '../screens/views/games/LoveGame';
import styles from '../screens/styles/AppStyle';
import MathQ from '../screens/views/MathQuestions/MathQ';
import MathAskQ from '../screens/views/MathQuestions/MathAskQ';
import MCQs from '../screens/views/MCQS/MCQs';
import MCQAsk from '../screens/views/MCQS/MCQAsk';
import Intro from '../screens/views/Intro/Intro';
import Num2048 from '../screens/views/games/Num2048/NumUi';
import AboutTerms from '../screens/views/Terms/AboutTerms';
import BigReward from '../screens/views/games/BigReward';
import AmazeLevels from '../screens/views/games/AmazeLevels';
import AmazeLines from '../screens/views/games/AmazeLines';
import BonusCodes from '../screens/views/FBPageBonusCodes/BonusCodes';
import AppMarket from '../screens/views/AppMarket/AppMarket';

const AppNavigator = createStackNavigator(
  {
    Main: Main,
    Games: Games,
    TicTacToe: TicTacToe,
    WordCompletion: WordCompletion,
    CountLove: CountLove,
    BigReward: BigReward,
    AmazeLevels: AmazeLevels,
    AmazeLines: AmazeLines,
    MathQ: MathQ,
    MathAskQ: MathAskQ,
    MCQs: MCQs,
    MCQAsk: MCQAsk,
    Intro2: Intro,
    Num2048: Num2048,
    BonusCodes: BonusCodes,
    AppMarket: AppMarket,
  },
  {
    initialRouteName : 'Main',

    defaultNavigationOptions : {
      header : null,
    },
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../drawables/images/sidebar/homeIcon.png')}
          style={[{tintColor: tintColor, width: 24, height : 24}]}
        />
      )
    }
  }
);

const customContentDrawer = (props) => (
  <View style={styles.container}>
    <View style={styles.subContainer}>

      <Text style={styles.Credito}>Credito</Text>
      <Icon style={styles.FaceIcon} name="user-circle" size={55}/>
      <View style={styles.subChildContainer1}>

        <View style={styles.subChildContainer2}>
          <Icon name="facebook-square" size={18} color="white"/>
          <Text style={{paddingStart: 5,color: 'white', fontWeight: 'bold'}}>facebook.com/ranag4u.awais</Text>
        </View>
        <View style={styles.subChildContainer2}>
          <Icon name="envelope" size={18} color="white"/>
          <Text style={{paddingStart: 5,color: 'white', fontWeight: 'bold'}}>aszcredito@gmail.com</Text>
        </View>

      </View>
    </View>
    <View>
      <DrawerItems {...props}/>
    </View>
  </View>
);

const drawerNavigator = createDrawerNavigator(
  {
    Home : AppNavigator,
    Games: Games,
    MCQs: MCQs,
    MathQ: MathQ,
    AboutTerms: AboutTerms,
    Logout : Logout,
  },
  {
    initialRouteName: 'Home',
    contentComponent: customContentDrawer
  }
);

export default createAppContainer(createSwitchNavigator(
  {
    AuthChecker: AuthChecker,
    Login: Login,
    SignUp: SignUp,
    Intro: Intro,
    Main: drawerNavigator
  },
  {
    initialRouteName: 'AuthChecker',

    defaultNavigationOptions: {
      header: null
    }
  }
));