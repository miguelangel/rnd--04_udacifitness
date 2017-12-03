import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { purple } from '../utils/colors';

const DateHeader = ({ date }) => {
	return (
		<Text style={{color: purple, fontSize: 25}}>
			{ date }
		</Text>
	);
};

DateHeader.propTypes = {
	date: PropTypes.string.isRequired
};

export default DateHeader;
