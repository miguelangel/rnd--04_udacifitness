import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const DateHeader = ({ date }) => {
	return (
		<Text>
			{ date }
		</Text>
	);
};

DateHeader.propTypes = {
	date: PropTypes.string.isRequired
};

export default DateHeader;
