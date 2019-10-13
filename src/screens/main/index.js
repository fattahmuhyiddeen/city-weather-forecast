import React from 'react';
import { Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { ScrollableTabView } from '@valdio/react-native-scrollable-tabview'
import Search from './search';
import Saved from './saved';

const App = ({ saved, cities }) => {
  const numOfSaved = saved.data.length;
  const numOfCities = cities.data.length;
  const shouldShowNumOfCities = numOfCities > 1 || (numOfCities === 1 && !cities.data[0].showEmptyRow)
  return (
    <ScrollableTabView onChangeTab={Keyboard.dismiss}>
      <Search tabLabel={`Search  ${shouldShowNumOfCities ? ` (${numOfCities})` : ''}`} />
      <Saved tabLabel={`Saved ${numOfSaved ? ` (${numOfSaved})` : ''}`} />
    </ScrollableTabView>
  );
};

export default connect((state) => ({
  saved: state.persist.saved,
  cities: state.cities,
}))(App);
