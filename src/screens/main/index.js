import React from 'react';
import { TouchableOpacity, Keyboard, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ScrollableTabView } from '@valdio/react-native-scrollable-tabview'
import Search from './search';
import History from './history';

class App extends React.Component {
  render() {
    return (
      <ScrollableTabView>
        <Search tabLabel="Search" />
        <History tabLabel="Saved" />
      </ScrollableTabView>
    );
  }
}

export default connect((state) => ({
}))(App);
