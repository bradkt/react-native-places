import React from 'react';
import {View, Text, Button } from 'react-native';
import startTabs from "../MainTabs/startMainTabs"

class AuthScreen extends React.Component {

    loginHandler = () => {
        startTabs();
    }
    render() {
        return (
            <View>
                <Text>Auth Screen</Text>
                <Button onPress={this.loginHandler} title="Login" />
            </View>
        )
    }
}

export default AuthScreen;