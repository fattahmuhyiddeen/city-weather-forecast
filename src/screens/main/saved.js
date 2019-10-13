import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { setData, removeCity } from 'ducks/persist/saved';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import ActionButton from './components/actionButton';
import { getForecast } from 'ducks/cities';

const deleteConfirmation = (data) => Alert.alert(
  'Are you sure?', `You want to delete ${data.title} from saved list?`,
  [
    { text: 'Delete', style: 'cancel', onPress: () => removeCity(data) },
    { text: 'Cancel' },
  ],
);

const renderItem = ({ item: data, index, move, moveEnd, isActive }) => {
  const { forecast } = data;
  return (
    <TouchableOpacity
      style={[
        styles.rowContainer, styles.shadow,
        { backgroundColor: isActive ? '#888' : 'white' }
      ]}
      onLongPress={move}
      onPressOut={moveEnd}
    >
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
          <ActionButton color={isActive ? 'white' : 'red'} onPress={() => deleteConfirmation(data)} label="Delete" />
          {data.isLoading ? <ActivityIndicator /> : <ActionButton color={isActive ? 'white' : 'orange'} onPress={() => getForecast(data.woeid)} label="Forecast" />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Saved = (props) => (
  <View style={{ flex: 1, backgroundColor: '#eee' }}>
    <Text style={styles.info}>{props.saved.data.length ? 'Press, hold and drag to re arrange the list' : 'No saved data. Please go to search tab to search and save more cities'}</Text>
    <DraggableFlatList
      data={props.saved.data}
      renderItem={renderItem}
      extraData={props}
      keyExtractor={(_, index) => `draggable-item-${index}`}
      scrollPercent={5}
      onMoveEnd={({ data }) => setData(data)}
    />
  </View>
)

const styles = StyleSheet.create({
  rowContainer: { margin: 5, padding: 10, borderRadius: 10, backgroundColor: 'white' },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  actionButtonContainer: { borderRadius: 10, padding: 5, borderWidth: 1, alignItems: 'center', marginBottom: 5, width: 70 },
  info: { textAlign: 'center', marginHorizontal: 10, marginVertical: 14, fontStyle: 'italic', color: 'grey' }
});

const mapStateToProps = state => ({
  saved: state.persist.saved,
});

export default connect(mapStateToProps)(Saved);
