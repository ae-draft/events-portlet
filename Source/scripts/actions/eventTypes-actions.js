import { interaction } from '../common/server-interaction';

export const GET_EVENT_TYPES = 'GET_EVENT_TYPES';
export const LOAD_EVENT_TYPES = 'LOAD_EVENT_TYPES';

export function fetchEventTypes(pageNumber, pageSize) {
   return dispatch => {
      interaction.send('/eventtypes', {}, {}, dispatch).done(req => {
         dispatch({
            type: LOAD_EVENT_TYPES,
            recievedTypes: req
         });
      });
   };
}

export function loadEventTypes() {
   return dispatch => {
      return dispatch(fetchEventTypes());
   };
}
