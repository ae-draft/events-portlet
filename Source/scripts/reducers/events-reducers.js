import { LOAD_EVENTS, LOAD_NEXT, REQUEST_EVENTS } from '../actions/events-actions';

const _initialState = {
   data: [],
   _total: 0,
   _canLoadMore: true,
   isFetching: false
};

export function events(state = _initialState, action) {
   switch (action.type) {
      case REQUEST_EVENTS:
         return {...state, isFetching: true};

      case LOAD_EVENTS:
         return {
            data: action.recievedEvents,
            _total: action.total,
            _canLoadMore: action.recievedEvents.length !== action.total,
            isFetching: false
         };

      case LOAD_NEXT:
         let newEventsArray = [...state.data, ...action.recievedEvents];
         return {
            data: newEventsArray,
            _total: action.total,
            _canLoadMore: newEventsArray.length !== action.total,
            isFetching: false
         };

      default:
         return state;
   }
}
