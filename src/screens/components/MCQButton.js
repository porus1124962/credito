import React, { Component } from "react";
import { 
    View,
    Text,
    Image,
    TouchableOpacity
} from "react-native";
import styles from '../styles/MCQsStyle';

class MCQButton extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.buttonContainer} onPress={this.props.onPress}>
                {
                    Number.isInteger(this.props.fontSize) ? 
                    <Text style={[styles.buttonHeading,{fontSize: this.props.fontSize}]}>{this.props.title}</Text> : 
                    <Text style={styles.buttonHeading}>{this.props.title}</Text>
                }
            </TouchableOpacity>
        );
    }
}
export default MCQButton;