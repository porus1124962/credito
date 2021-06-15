import React, { Component } from "react";
import { 
    View,
    Text,
    Image,
    TouchableOpacity
} from "react-native";
import styles from '../styles/GamesStyle';

class GamesButton extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.buttonContainer} onPress={this.props.onPress}>
                <Image source={
                    this.props.img
                } style={styles.buttonImage}/>
                <Text style={styles.buttonHeading}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}
export default GamesButton;