import {THROW_NEW_ERROR, CLEAR_ERROR, CLEAR_ALL_ERROR} from '../actions/errors-actions';

function newError(state, type, part, error) {
   if(_.isUndefined(state[type])) {
      if(part) state[type] = {[part]: [error]};
      else state[type] = [error];
   } else {
      if(part && state[type][part]) {
         state[type][part].push(error);
      }
      else if (part && !state[type][part]) {
         state[type][part] = [error];
      }
      else if (!part) {
         state[type] = [error];
      }
      else {
         console.error("unexpected case");
      }
   }
   
   return state;
}

function clearError(state, type, part) {
   if(part) state[type][part] = [];
   else state[type] = {};

   return state;
}

var defState = { auth: {}};

export function errors(state = defState, action) {
   switch (action.type) {
      case THROW_NEW_ERROR:
         return newError(state, action.err_type, action.part, action.error);
      case CLEAR_ERROR:
         return clearError(state, action.err_type, action.part);
      case CLEAR_ALL_ERROR:
         return defState;
      default:
         return state;
   }
}
