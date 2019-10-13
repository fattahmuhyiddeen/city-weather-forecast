
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import CompleteFlatList from 'react-native-complete-flatlist';
import { connect } from 'react-redux';
import { searchCities, getForecast, clearCities } from 'ducks/cities';
import { save } from 'ducks/persist/saved';

const onSearch = (keyword = '') => keyword === '' ? clearCities() : searchCities(keyword);

const cell = (data) => {
  const { forecast } = data;
  return (
    <View style={styles.itemContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text>{data.title}</Text>
          {data.isLoading && <ActivityIndicator />}
          {forecast && (
            <View>
              <Text style={{ color: 'grey' }}>{` Forecast on : ${forecast.applicable_date}`}</Text>
            </View>
          )}
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

const Search = props => (
  <CompleteFlatList
    backgroundStyles={styles.background}
    onSearch={keyword => onSearch(keyword)}
    refreshOnLoad={false}
    isRefreshing={props.cities.isLoading}
    extraData={props}
    data={props.cities.data}
    renderSeparator={null}
    renderItem={cell}
    placeholder="Search city name ..."
  />
);

const styles = StyleSheet.create({
  itemContainer: { padding: 10, margin: 5, borderRadius: 10, backgroundColor: 'white' },
  background: { backgroundColor: '#ddd' }
});

const mapStateToProps = state => ({
  cities: state.cities,
});

export default connect(mapStateToProps)(Search);
