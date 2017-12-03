import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,
	Platform } from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { white, gray, purple } from '../utils/colors';

const Steppers = ({unit, value, onIncrement, onDecrement}) => (
	<View style={[styles.row, {justifyContent: 'space-between'}]}>
		{ Platform.OS === 'ios'
			?	<View style={{flexDirection: 'row'}}>
					<TouchableOpacity
						style={[styles.iosBtn,
							{borderTopRightRadius: 0, borderBottomRightRadius:0}]}
						onPress={onDecrement}>
						<Entypo name='minus' size={30} color={purple} />
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.iosBtn,
							{borderTopLeftRadius: 0, borderBottomLeftRadius:0}]}
						onPress={onIncrement}>
						<Entypo name='plus' size={30} color={purple} />
					</TouchableOpacity>
				</View>
			:	<View style={{flexDirection: 'row'}}>
					<TouchableOpacity
						style={[styles.androidBtn,
							{borderTopRightRadius: 0, borderBottomRightRadius:0}]}
						onPress={onDecrement}>
						<FontAwesome name='minus' size={30} color={white} />
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.androidBtn,
							{borderTopLeftRadius: 0, borderBottomLeftRadius:0}]}
						onPress={onIncrement}>
						<FontAwesome name='plus' size={30} color={white} />
					</TouchableOpacity>
				</View>
		}
		<View style={styles.metricCounter}>
			<Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
			<Text style={{fontSize: 18, color: gray}}>{unit}</Text>
		</View>
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

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center'
	},
	iosBtn: {
		backgroundColor: white,
		borderColor: purple,
		borderWidth: 1,
		borderRadius: 3,
		padding: 5,
		paddingLeft: 25,
		paddingRight:25
	},
	androidBtn: {
		backgroundColor: purple,
		borderRadius: 2,
		padding: 10,
		margin: 5
	},
	metricCounter: {
		width: 85,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default Steppers;
