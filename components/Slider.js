import React from 'react';
import { View, Text, Slider as NativeSlider } from 'react-native';
import PropTypes from 'prop-types';

const Slider = ({max, unit, step, value, onChange}) => (
	<View>
		<NativeSlider
			step={step}
			value={value}
			maximumValue={max}
			minimumValue={0}
			onValueChange={onChange}
		/>
		<View>
			<Text>{value}</Text>
			<Text>{unit}</Text>
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

export default Slider;
