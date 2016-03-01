import { LOAD_EVENT_TYPES } from '../actions/eventTypes-actions';

export function eventTypes(state = [], action) {
   switch (action.type) {
      case LOAD_EVENT_TYPES:
         return [...state, ...action.recievedTypes];
      default:
         return state;
   }
}
