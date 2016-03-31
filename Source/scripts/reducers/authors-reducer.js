import { LOAD_AUTHORS } from '../actions/authors-actions';

export function authors(state = [], action) {
   switch (action.type) {
      case LOAD_AUTHORS:
         return [...state, ...action.recievedAuthors];
      default:
         return state;
   }
}
