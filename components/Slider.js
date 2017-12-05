import React from 'react';
import {View, Text, Slider as NativeSlider, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {gray} from '../utils/colors';

const Slider = ({max, unit, step, value, onChange}) => (
  <View style={styles.row}>
    <NativeSlider
      style={{flex: 1}}
      step={step}
      value={value}
      maximumValue={max}
      minimumValue={0}
      onValueChange={onChange}
    />
    <View style={styles.metricCounter}>
      <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
      <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
    </View>
  </View>
);

Slider.propTypes = {
  max: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Slider;
