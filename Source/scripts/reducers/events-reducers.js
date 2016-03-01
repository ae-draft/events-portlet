import { LOAD_EVENTS } from '../actions/events-actions';

export function events(state = {data: [], _total: 0, _canLoadMore: true}, action) {
   switch (action.type) {
      case LOAD_EVENTS:
         let eventsCollection = [...state.data, ...action.recievedNews];

         return {
            data: eventsCollection,
            _total: action.total,
            _canLoadMore: eventsCollection.length !== action.total
         };
      default:
         return state;
   }
}
