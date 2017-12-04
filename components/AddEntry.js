import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Platform,
	StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { addEntry } from '../actions';
import Slidder from './Slider';
import Steppers from './Steppers';
import DateHeader from './DateHeader';
import TextButton from './TextButton';
import { getMetricMetaInfo, timeToString,
	getDailyReminderValue } from '../utils/helpers';
import { submitEntry, removeEntry } from '../utils/api';
import { white, purple} from '../utils/colors';

const SubmitBtn = ({ onPress }) => (
	<TouchableOpacity
		style={Platform.OS === 'ios'
			? styles.iosSubmitBtn
			: styles.androidSubmitBtn}
		onPress={onPress}>
			<Text style={styles.submitBtnText}>SUBMIT</Text>
	</TouchableOpacity>
);

SubmitBtn.propTypes = {
	onPress: PropTypes.func.isRequired
};

class AddEntry extends Component {
	static propTypes = {
		alreadyLogged: PropTypes.bool,
		dispatch: PropTypes.func.isRequired
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
		this.props.dispatch(addEntry({
			[key]: entry
		}));

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

		this.props.dispatch(addEntry({
			[key]: getDailyReminderValue()
		}));
		// TODO: Navigate to home

		removeEntry(key);
	};

	render() {
		const metricMetaInfo = getMetricMetaInfo();

		if (this.props.alreadyLogged) {
			return (
				<View style={styles.center}>
					<Ionicons size={100}
						name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}/>
					<Text>You already logged your information for today</Text>
					<TextButton style={{padding:10}} onPress={this.reset}>
						Reset
					</TextButton>
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<DateHeader date={(new Date()).toLocaleDateString()}/>
				{ Object.keys(metricMetaInfo).map((key) => {
					const { getIcon, type, ...rest } = metricMetaInfo[key];
					const value = this.state[key];

					return (
						<View key={key} style={styles.row}>
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: white
	},
	row: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center'
	},
	iosSubmitBtn: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40
	},
	androidSubmitBtn: {
		backgroundColor: purple,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		borderRadius: 2,
		height: 45,
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center'
	},
	submitBtnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center'
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 30,
		marginRight: 30
	}
});

const mapStateToProps = (state) => {
	const key = timeToString();

	return {
		alreadyLogged: state[key] && typeof state[key].today === 'undefined'
	};
};

export default connect(mapStateToProps)(AddEntry);
