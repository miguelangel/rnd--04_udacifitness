import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';

const Steppers = ({unit, value, onIncrement, onDecrement}) => (
	<View>
		<View>
			<TouchableOpacity onPress={onDecrement}>
				<FontAwesome name='minus' size={30} color={'black'} />
			</TouchableOpacity>
			<TouchableOpacity onPress={onIncrement}>
				<FontAwesome name='plus' size={30} color={'black'} />
			</TouchableOpacity>
		</View>
		<View>
			<Text>{value}</Text>
			<Text>{unit}</Text>
		</View>
		<Text>Steppers</Text>
	</View>
);

Steppers.propTypes = {
	max: PropTypes.number.isRequired,
	unit: PropTypes.string.isRequired,
	step: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
	onIncrement: PropTypes.func.isRequired,
	onDecrement: PropTypes.func.isRequired
};

export default Steppers;
