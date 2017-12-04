import React from 'react';
import {View, Platform, StatusBar as NativeStatusBar} from 'react-native';
import PropTypes from 'prop-types';
import {TabNavigator} from 'react-navigation';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {Constants} from 'expo';
import AddEntry from './components/AddEntry';
import History from './components/History';
import {purple, white} from './utils/colors';
import reducer from './reducers';

const StatusBar = ({backgroundColor, ... props}) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <NativeStatusBar translucent backgroundColor={backgroundColor} {...props}/>
  </View>
);

StatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired
};

const Tabs = TabNavigator({
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      // eslint-disable-next-line react/display-name, react/prop-types
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30}
        color={tintColor}/>
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      // eslint-disable-next-line react/display-name, react/prop-types
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30}
        color={tintColor}/>
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <StatusBar backgroundColor={purple} barStyle='light-content'/>
          <Tabs/>
        </View>
      </Provider>
    );
  }
}
