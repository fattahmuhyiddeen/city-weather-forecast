import React from 'react';
import { Keyboard, Platform, SafeAreaView, StyleSheet } from 'react-native';
import Main from 'screens/main';
import * as deviceActions from 'ducks/device';
import Geolocation from 'react-native-geolocation-service';

class App extends React.PureComponent {
  componentDidMount() {
    Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      this.onKeyboardAppear
    );
    Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      this.onKeyboardHide
    );

    Geolocation.getCurrentPosition(
      (position) => deviceActions.setGPS({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  onKeyboardAppear = e =>
    deviceActions.setKeyboard({
      isKeyboardAppear: true,
      keyboardHeight: e.endCoordinates.height,
    });

  onKeyboardHide = () =>
    deviceActions.setKeyboard({ isKeyboardAppear: false, keyboardHeight: 0 });

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Main />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});
export default App;
