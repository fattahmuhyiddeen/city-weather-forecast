import React from 'react';
import { TouchableOpacity, Keyboard, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'
import Search from './search';
import History from './history';

class App extends React.Component {
  render() {
    return (
      <ScrollableTabView
        onChangeTab={({ i }) => this.setState({ selectedTabIndex: i })}
      >
        <Search tabLabel="Search" />
        <History tabLabel="History" />
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'red' }
});

export default connect((state) => ({
}))(App);
