import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { events } from '../reducers/events-reducers';
import { filters } from '../reducers/filters-reducer';
import { errors } from '../reducers/errors-reducer';
import { eventTypes } from '../reducers/eventTypes-reducer';
import { authors } from '../reducers/authors-reducer';
const _isProduction = process.env.NODE_ENV === 'production';
let _middlewaresArr = _isProduction ? [thunkMiddleware] : [createLogger(), thunkMiddleware];

const createStoreWithMiddleware = applyMiddleware(..._middlewaresArr)(createStore);

export default function configureStore(initialState) {
   return createStoreWithMiddleware(combineReducers({
      events, eventTypes, authors, filters, errors
   }), initialState);
}
