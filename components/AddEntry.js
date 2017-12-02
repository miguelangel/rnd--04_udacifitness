import React, { Component } from 'react';
import { View } from 'react-native';
import Slidder from '../components/Slider';
import Steppers from '../components/Steppers';
import DateHeader from '../components/DateHeader';
import { getMetricMetaInfo } from '../utils/helpers';

export default class AddEntry extends Component {
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

	render() {
		const metricMetaInfo = getMetricMetaInfo();
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
			</View>
		);
	}
}
