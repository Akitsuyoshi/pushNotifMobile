import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Platform, Dimensions } from 'react-native';
import { Notifications } from 'expo';
import uniqueId from 'react-native-unique-id';

import { subscribe, unSubscribe, openByNotification } from './api';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width,
  },
  button: {
    width: width * 0.8,
    margin: 12,
  },
  spacer: {
    height: 18,
  },
});

type Props = {};

export default class App extends Component<Props> {
  state = {
    notification: [],
  };

  componentDidMount() {
    this.notificationSubscription = Notifications.addListener(this.handleNotification);
  }

  componentWillUnmount() {
    this.notificationSubscription = Notifications.removeListener(this.handleNotification);
  }

  handleNotification = notification => {
    this.setState({ notification });
    // User get notification when app is in background, and then open via notification
    if (notification.origin === 'selected') {
      this.sendNotifToServer();
    }
  };

  register = async () => {
    try {
      const deviceName = await uniqueId();
      const os = Platform.OS;

      return subscribe(deviceName, os);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  unRegister = async () => {
    try {
      const deviceName = await uniqueId();
      const os = Platform.OS;

      return unSubscribe(deviceName, os);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  sendNotifToServer = async () => {
    try {
      const deviceName = await uniqueId();
      console.log('heer');
      return openByNotification(deviceName, true);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  render() {
    const { notification } = this.state;
    return (
      <View style={styles.container}>
        <Text>Subscription Button</Text>
        <Text>Data: {JSON.stringify(notification.data)}</Text>
        <Button
          style={styles.button}
          raised
          icon={{ name: 'subscriptions' }}
          title="Subscribe"
          containerViewStyle={{
            width: 200,
            marginLeft: 0,
          }}
          onPress={this.register}
        />
        <View style={styles.spacer} />
        <Button
          style={styles.button}
          raised
          icon={{ name: 'unarchive' }}
          title="Unsubscribe"
          onPress={this.unRegister}
        />
      </View>
    );
  }
}
