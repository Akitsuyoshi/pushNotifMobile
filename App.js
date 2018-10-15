import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Platform, Dimensions, Image } from 'react-native';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';

import { Notifications } from 'expo';
import uniqueId from 'react-native-unique-id';
import io from 'socket.io-client';
import { subscribe, unSubscribe, openByNotification } from './api';

const socket = io('http://10.74.119.41:8001', { transports: ['websocket'] });
const ham = require('./img/hamtarou.gif');

const slideAnimation = new SlideAnimation({
  toValue: 0,
  slideFrom: 'bottom',
  useNativeDriver: true,
});

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
    const { notification } = this.state;
    console.log(JSON.stringify(notification.data));
    this.notificationSubscription = Notifications.addListener(this.handleNotification);
    this.socket = socket.on('disconnect', () => console.log('disconnect'));
  }

  componentWillUnmount() {
    this.notificationSubscription = Notifications.removeListener(this.handleNotification);
    this.socket = socket.on('connection', () => console.log('new client connect'));
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

      const isSubscribed = await subscribe(deviceName, os);

      return isSubscribed ? '' : this.popupDialog.show();
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  unRegister = async () => {
    try {
      const deviceName = await uniqueId();
      const os = Platform.OS;

      this.socket.emit('update subscriber', {
        name: deviceName,
        os,
        isSubscribed: false,
      });

      return unSubscribe(deviceName, os);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  sendNotifToServer = async () => {
    try {
      const deviceName = await uniqueId();

      return openByNotification(deviceName, true);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Subscription Button</Text>
        <Button
          style={styles.button}
          raised
          icon={{ name: 'subscriptions' }}
          title="Subscribe"
          containerViewStyle={{
            width: 200,
            marginLeft: 0,
          }}
          // onPress={this.register}
          onPress={() => this.register() && this.popupDialog.show()}
        />
        <View style={styles.spacer} />
        <Button
          style={styles.button}
          raised
          icon={{ name: 'unarchive' }}
          title="Unsubscribe"
          onPress={this.unRegister}
        />
        <PopupDialog
          dialogAnimation={slideAnimation}
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
          dialogTitle={<DialogTitle title="Subscribed" />}
        >
          <View style={{ width: '100%' }}>
            <Image
              style={{
                margin: 'auto',
                width: '100%',
                height: 'auto',
                minHeight: '100%',
              }}
              source={ham}
            />
          </View>
        </PopupDialog>
      </View>
    );
  }
}
