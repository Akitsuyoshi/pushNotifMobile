import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {};

export default class App extends Component<Props> {
  componentDidMount() {
    console.log('here is invoked after render is finished');
  }

  click = () => {
    Alert.alert('use click now');
    console.log('log for clicking');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Code Chrysalis super cool guys</Text>
        <Button title="this is the button" onPress={this.click} />
      </View>
    );
  }
}
