import { LOAD_EVENTS, LOAD_NEXT } from '../actions/events-actions';

export function events(state = {data: [], _total: 0, _canLoadMore: true}, action) {
   switch (action.type) {
      case LOAD_EVENTS:
         return {
            data: action.recievedNews,
            _total: action.total,
            _canLoadMore: action.recievedNews.length !== action.total
         };
      case LOAD_NEXT:
         return {
            data: [...state.data, ...action.recievedNews],
            _total: action.total,
            _canLoadMore: action.recievedNews.length !== action.total
         };
      default:
         return state;
   }
}
