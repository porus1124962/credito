import React, { Component } from "react";
import { 
    View,
    Text,
    TouchableOpacity
} from "react-native";
import styles from '../styles/MainStyle';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

class MainBtn extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} delayLongPress={this.props.delayLongPress} onLongPress={this.props.onLongPress}>
                <View style={styles.container}>
                    <FaIcon name={this.props.iconName} size={50} color="#00f7d2"/>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: this.props.fontSize}}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
export default MainBtn;