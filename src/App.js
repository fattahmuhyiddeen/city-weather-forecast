import React from 'react';
import { Keyboard, Platform, SafeAreaView, StyleSheet } from 'react-native';
import Main from 'screens/main';
import * as deviceActions from 'ducks/device';

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
