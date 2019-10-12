
import React, { Component } from 'react';
import { View, Text, Image, Platform, StatusBar } from 'react-native';
import CompleteFlatList from 'react-native-complete-flatlist';
import { connect } from 'react-redux';
import { searchCities } from 'ducks/cities';


const data = [
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Syah', status: 'Active', time: '9:14 PM', date: '1 Dec 2018' },
  { name: 'Izzat', status: 'Active', time: '8:15 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  {
    name: 'Muhyiddeen',
    status: 'Blocked',
    time: '10:10 PM',
    date: '9 Feb 2018',
  },
];

const onSearch = (keyword = '') => searchCities(keyword);

class Search extends Component {
  cell = (data, index) => {
    const item = data.cleanData ? data.cleanData : data;

    return <Text>{item.title}</Text>;
  }

  render() {
    const { cities } = this.props;
    return (
      <CompleteFlatList
        searchKey={['name', 'status', 'time', 'date']}
        onSearch={keyword => onSearch(keyword)}
        isRefreshing={cities.isLoading}
        extraData={this.props}
        data={cities.data}
        renderItem={this.cell}
        placeholder="Search city name ..."
      />
    );
  }
}

const mapStateToProps = (state) => ({
  cities: state.cities,
});

export default connect(mapStateToProps)(Search);
