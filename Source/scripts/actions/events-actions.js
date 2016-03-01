import { EVENTS_PAGE_SIZE } from '../common/consts/constants';
import { interaction } from '../common/server-interaction';
import {periodFilterTypes} from '../common/consts/period-filter-types';

export const LOAD_EVENTS = 'LOAD_EVENTS';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const DEL_VISIBILITY_FILTER = 'DEL_VISIBILITY_FILTER';
export const SET_DATEPICKER_FILTER = 'SET_DATEPICKER_FILTER';

export const VisibilityFilters = {
  PERIOD_FILTER: 'PERIOD_FILTER',
  USER_FILTER: 'USER_FILTER',
  TYPE_FILTER: 'TYPE_FILTER',
  DATEPICKER: 'DATEPICKER'
};

export function fetchEvents(pageNumber, pageSize) {
   return dispatch => {
      interaction.send('/events', {pageNumber, pageSize}, {}, dispatch).done(req => {
         dispatch({
            type: LOAD_EVENTS,
            recievedNews: req.Data,
            total: req.Count
         });
      });
   };
}

export function loadEvents() {
   return (dispatch, getState) => {
      let _state = getState();
      let storedEvents = _.result(_state, 'events.data');
      let storedEventsTotal = _.result(_state, 'events._total');
      let pageNumber = (storedEvents.length / EVENTS_PAGE_SIZE) + 1;

      if(_.isEmpty(storedEvents) || storedEvents.length < storedEventsTotal) {
         return dispatch(fetchEvents(pageNumber, EVENTS_PAGE_SIZE));
      }
   };
}

export function setVisibilityFilter(filter, param) {
   if(filter === VisibilityFilters.DATEPICKER)
      return { type: SET_DATEPICKER_FILTER, filter, param };
   else
      return { type: SET_VISIBILITY_FILTER, filter, param };
}

export function delVisibilityFilter(filter) {
   return { type: DEL_VISIBILITY_FILTER, filter };
}
