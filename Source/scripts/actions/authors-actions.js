import { interaction } from '../common/server-interaction';

export const GET_AUTHORS = 'GET_AUTHORS';
export const LOAD_AUTHORS = 'LOAD_AUTHORS';

export function fetchAuthors() {
   return dispatch => {
      interaction.send('/events/authors', {}, {}, dispatch).done(req => {
         dispatch({
            type: LOAD_AUTHORS,
            recievedAuthors: req
         });
      });
   };
}

export function loadAuthors() {
   return dispatch => {
      return dispatch(fetchAuthors());
   };
}
