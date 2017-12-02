import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import Slidder from './Slider';
import Steppers from './Steppers';
import DateHeader from './DateHeader';
import TextButton from './TextButton';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import { submitEntry, removeEntry } from '../utils/api';

const SubmitBtn = ({ onPress }) => (
	<TouchableOpacity
		onPress={onPress}>
			<Text>SUBMIT</Text>
	</TouchableOpacity>
);

SubmitBtn.propTypes = {
	onPress: PropTypes.func.isRequired
};

export default class AddEntry extends Component {
	static propTypes = {
		alreadyLogged: PropTypes.bool
	};

	state = {
		run: 0,
		bike: 0,
		swim: 0,
		sleep: 0,
		eat: 0
	};

	increment = (metric) => {
		const { max, step } = getMetricMetaInfo(metric);

		this.setState((state) => {
			const count = state[metric] + step;

			return {
				[metric]: Math.min(count, max)
			};
		});
	};

	decrement = (metric) => {
		this.setState((state) => {
			const count = state[metric] - getMetricMetaInfo(metric).step;

			return {
				[metric]: Math.max(count, 0)
			};
		});
	};

	slide = (metric, value) => {
		this.setState(() => ({
			[metric]: value
		}));
	};

	submit = () => {
		const key = timeToString();
		const entry = this.state;

		// TODO: Update redux
		this.setState(() => ({
			run: 0,
			bike: 0,
			swim: 0,
			sleep: 0,
			eat: 0
		}));

		// TODO: Navigate to home

		submitEntry({key, entry});

		// TODO: Clear local notification
	};

	reset = () => {
		const key = timeToString();

		// TODO: Update redux

		// TODO: Navigate to home

		removeEntry(key);
	};

	render() {
		const metricMetaInfo = getMetricMetaInfo();

		if (this.props.alreadyLogged) {
			return (
				<View>
					<Ionicons name='ios-happy-outline' size={100}/>
					<Text>You already logged your information for today</Text>
					<TextButton onPress={this.reset}>Reset</TextButton>
				</View>
			);
		}

		return (
			<View>
				<DateHeader date={(new Date()).toLocaleDateString()}/>
				{ Object.keys(metricMetaInfo).map((key) => {
					const { getIcon, type, ...rest } = metricMetaInfo[key];
					const value = this.state[key];

					return (
						<View key={key}>
							{ getIcon() }
							{ type === 'slider'
								? <Slidder
										value={value}
										onChange={(value) => this.slide(key, value)}
										{...rest}/>
								: <Steppers
										value={value}
										onIncrement={() => this.increment(key)}
										onDecrement={() => this.decrement(key)}
										{...rest}/>
							}
						</View>
					);
				})}
				<SubmitBtn onPress={this.submit}/>
			</View>
		);
	}
}
