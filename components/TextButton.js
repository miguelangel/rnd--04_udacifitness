import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const TextButton = ({children, onPress}) => (
	<TouchableOpacity onPress={onPress}>
		<Text>{children}</Text>
	</TouchableOpacity>
);

TextButton.propTypes = {
	children: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired
};

export default TextButton;
