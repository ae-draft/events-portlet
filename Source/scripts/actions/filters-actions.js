import {loadEvents} from '../actions/events-actions';
import {periodFilterTypes} from '../common/consts/period-filter-types';
let {SELECTED_DATE} = periodFilterTypes;

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const DEL_VISIBILITY_FILTER = 'DEL_VISIBILITY_FILTER';
export const SET_DATEPICKER_FILTER = 'SET_DATEPICKER_FILTER';
export const TOGGLE_DATERANGE_FILTER = 'TOGGLE_DATERANGE_FILTER';
export const VisibilityFilters = {
  PERIOD_FILTER: 'PERIOD_FILTER',
  USER_FILTER: 'USER_FILTER',
  TYPE_FILTER: 'TYPE_FILTER',
  DATEPICKER: 'DATEPICKER'
};

export function setVisibilityFilter(filter, param) {
   if(filter === VisibilityFilters.DATEPICKER)
      return { type: SET_DATEPICKER_FILTER, filter, param };
   else
      return { type: SET_VISIBILITY_FILTER, filter, param };
}

export function delVisibilityFilter(filter) {
   return { type: DEL_VISIBILITY_FILTER, filter };
}

export function toggleDateRangeFilter() {
   return { type: TOGGLE_DATERANGE_FILTER };
}

export function changeFilter(filter, param) {
   let needLoadEvents = false;
   return (dispatch, getState) => {
      if(param === SELECTED_DATE)
         dispatch(toggleDateRangeFilter());
      else {
         if(_.isEmpty(param)) {
            dispatch(delVisibilityFilter(filter));
            if(filter === VisibilityFilters.PERIOD_FILTER) {
               dispatch(toggleDateRangeFilter());
            }
         } else {
            if(filter === VisibilityFilters.PERIOD_FILTER && _.result(getState(), 'filters.showDateRangeFilter'))
               dispatch(toggleDateRangeFilter());

            dispatch(setVisibilityFilter(filter, param));
         }

         needLoadEvents = true;
      }

      if(needLoadEvents) dispatch(loadEvents());
   };
}
