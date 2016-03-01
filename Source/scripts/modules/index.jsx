import '../../styles/main.scss';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import Events from './events/containers/events.jsx';
import configureStore from '../store/store';
import {STORED_STATE_KEY} from '../common/consts/constants';
const _isProduction = process.env.NODE_ENV === 'production';

class Entry extends React.Component {
  render() {
    return (
      <div id="events-wrapper">
       <div id="childrens">
         {this.props.children}
       </div>
      </div>
    );
  }
}

let _getInitState = () => {
   let _initState = JSON.parse(sessionStorage.getItem(STORED_STATE_KEY));
   if(_initState) sessionStorage.removeItem(STORED_STATE_KEY);
   return _initState || {};
};

let _configuredStore = configureStore(_getInitState());

function saveStateHandler() {
   sessionStorage.setItem(STORED_STATE_KEY, JSON.stringify(_configuredStore.getState()));
}

if(_isProduction) PostbackAdapter.subscribe('events', saveStateHandler);

render((
   <Provider store={_configuredStore}>
      <Events />
  </Provider>
), document.getElementById('events-holder'));
