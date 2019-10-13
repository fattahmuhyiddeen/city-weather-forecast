
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import CompleteFlatList from 'react-native-complete-flatlist';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { searchCities, getForecast, clearCities } from 'ducks/cities';
import { save } from 'ducks/persist/saved';
import ActionButton from './components/actionButton';

const onSearch = (keyword = '') => keyword === '' ? clearCities() : searchCities(keyword);
const isSaved = (data, savedList) => !!savedList.find(i => i.woeid === data.woeid)



const Search = props => {
  const cell = (data) => {
    const { forecast } = data;
    return (
      <View style={styles.itemContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>{data.title}</Text>
            {!data.isLoading && forecast && (
              <View>
                <Text style={{ color: 'grey' }}>{`Forecast on ${forecast.applicable_date}`}</Text>
                <FastImage
                  source={{ uri: `https://www.metaweather.com/static/img/weather/png/64/${forecast.weather_state_abbr}.png` }}
                  style={{ width: 30, height: 30 }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={{ color: 'black' }}>{forecast.weather_state_name}</Text>
              </View>
            )}
          </View>
          <View>
            {isSaved(data, props.saved.data) ?
              <Text style={{ textAlign: 'center', marginBottom: 5 }}>Saved</Text> :
              <ActionButton color="green" onPress={() => save(data)} label="Save" />
            }
            {data.isLoading ? <ActivityIndicator /> : <ActionButton color="orange" onPress={() => getForecast(data.woeid)} label="Forecast" />}
          </View>
        </View>
      </View>
    );
  };
  return (
    <CompleteFlatList
      onSearch={keyword => onSearch(keyword)}
      refreshOnLoad={false}
      isRefreshing={props.cities.isLoading}
      extraData={props}
      data={props.cities.data}
      renderItem={cell}
      placeholder="Search city name ..."
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: { padding: 10, margin: 10 },
});

const mapStateToProps = state => ({
  cities: state.cities,
  saved: state.persist.saved,
});

export default connect(mapStateToProps)(Search);
