import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { setData } from 'ducks/persist/saved';
import { connect } from 'react-redux';

class Saved extends Component {

  state = {
    data: [...Array(20)].map((d, index) => ({
      key: `item-${index}`,
      label: index,
      backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
    }))
  }

  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: isActive ? 'blue' : item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onLongPress={move}
        onPressOut={moveEnd}
      >
        <Text style={{
          fontWeight: 'bold',
          color: 'white',
          fontSize: 32,
        }}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <DraggableFlatList
          style={{ backgroundColor: 'red' }}
          data={this.props.saved.data}
          renderItem={this.renderItem}
          extraData={this.props}
          keyExtractor={(_, index) => `draggable-item-${index}`}
          scrollPercent={5}
          onMoveEnd={({ data }) => setData(data)}
        />
      </View>
    )
  }
}
const mapStateToProps = (state) => ({
  saved: state.persist.saved,
});

export default connect(mapStateToProps)(Saved);
