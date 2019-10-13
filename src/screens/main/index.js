import React from 'react';
import { connect } from 'react-redux';
import { ScrollableTabView } from '@valdio/react-native-scrollable-tabview'
import Search from './search';
import History from './history';

const App = ({ saved }) => {
  const numOfSaved = saved.data.length;
  return (
    <ScrollableTabView>
      <Search tabLabel="Search" />
      <History tabLabel={`Saved ${numOfSaved ? ` (${numOfSaved})` : ''}`} />
    </ScrollableTabView>
  );
}

export default connect((state) => ({ saved: state.persist.saved }))(App);
