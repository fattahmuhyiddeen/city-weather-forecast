
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import CompleteFlatList from 'react-native-complete-flatlist';
import { connect } from 'react-redux';
import { searchCities, getForecast } from 'ducks/cities';
import { save } from 'ducks/persist/saved';


// const data = [
//   { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
//   { name: 'Syah', status: 'Active', time: '9:14 PM', date: '1 Dec 2018' },
//   { name: 'Izzat', status: 'Active', time: '8:15 PM', date: '1 Jan 2018' },
//   { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
//   { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
//   { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
//   { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
//   { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
//   { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
//   { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
//   { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
//   { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
//   { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
//   { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
//   {
//     name: 'Muhyiddeen',
//     status: 'Blocked',
//     time: '10:10 PM',
//     date: '9 Feb 2018',
//   },
// ];

const onSearch = (keyword = '') => searchCities(keyword);

class Search extends Component {
  cell = (data, index) => {
    const { forecast } = data;
    return (
      <View style={styles.itemContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text>{data.title}</Text>
            {data.isLoading && <ActivityIndicator />}
            {forecast && <View>
              <Text style={{ color: 'grey' }}>{` Forecast on : ${forecast.applicable_date}`}</Text>
            </View>}
          </View>
          <View>
            <TouchableOpacity onPress={() => save(data)} style={{ borderRadius: 10, padding: 5, borderWidth: 1, alignItems: 'center', borderColor: 'green' }}>
              <Text style={{ color: 'green' }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getForecast(data.woeid)} style={{ borderRadius: 10, padding: 5, borderColor: 'orange', borderWidth: 1, marginTop: 5 }}>
              <Text style={{ color: 'orange' }}>Forecast</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { cities } = this.props;
    return (
      <CompleteFlatList
        backgroundStyles={{ backgroundColor: '#ddd' }}
        onSearch={keyword => onSearch(keyword)}
        refreshOnLoad={false}
        isRefreshing={cities.isLoading}
        extraData={this.props}
        data={cities.data}
        renderSeparator={null}
        renderItem={this.cell}
        placeholder="Search city name ..."
      />
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: { padding: 10, margin: 5, borderRadius: 10, backgroundColor: 'white' }
});

const mapStateToProps = (state) => ({
  cities: state.cities,
});

export default connect(mapStateToProps)(Search);
