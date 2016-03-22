import { EVENTS_PAGE_SIZE } from '../common/consts/constants';
import { interaction } from '../common/server-interaction';
import {VisibilityFilters} from './filters-actions';
const {PERIOD_FILTER, USER_FILTER, TYPE_FILTER, DATEPICKER} = VisibilityFilters;
import {getFilterValue, getDateRange} from '../modules/events/utils/filter-func'

export const LOAD_EVENTS = 'LOAD_EVENTS';
export const LOAD_NEXT = 'LOAD_NEXT';

function buildComplexFilter(filters) {
   let dateRange = getDateRange(filters);

   return {
      AuthorId: getFilterValue(USER_FILTER, filters),
      EventTypeId: getFilterValue(TYPE_FILTER, filters),
      StartDate: dateRange.startDate,
      EndDate: dateRange.endDate
   };
}

function getRequestOptions(state) {
   let storedEventsTotal = _.result(state, 'events._total');
   let pageNumber = 1;
   let filters = _.result(state, 'filters.filters');
   let filter = buildComplexFilter(filters);

   return {pageNumber, pageSize: EVENTS_PAGE_SIZE, filter};
}

export function fetchEvents(action, pageNumber = 1) {
   return (dispatch, getState) => {
      interaction.send('/events', {...getRequestOptions(getState()), pageNumber}, {}, dispatch).done(req => {
         dispatch({type: action, recievedNews: req.Data, total: req.Count});
      });
   };
}

export function loadEvents() {
   return dispatch => dispatch(fetchEvents(LOAD_EVENTS));
}

export function loadNext() {
   return (dispatch, getState) => dispatch(fetchEvents(LOAD_NEXT, getPageNumber(getState())));
}

export function getPageNumber(state) {
   let storedEvents = _.result(state, 'events.data');
   if(!storedEvents) return 1;

   return storedEvents.length < EVENTS_PAGE_SIZE ? 1 : (storedEvents.length / EVENTS_PAGE_SIZE) + 1;
}
