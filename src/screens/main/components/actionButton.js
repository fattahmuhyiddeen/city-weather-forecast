import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default props => (
  <TouchableOpacity onPress={props.onPress} style={[styles.container, { borderColor: props.color }]}>
    <Text style={{ color: props.color }}>{props.label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { borderRadius: 10, padding: 5, borderWidth: 1, alignItems: 'center', marginBottom: 5, width: 70 },
});
