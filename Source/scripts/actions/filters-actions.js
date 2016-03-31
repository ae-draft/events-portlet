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

export function toggleDateRangeFilter(activity = false) {
   return { type: TOGGLE_DATERANGE_FILTER, activity };
}

function changePeriodFilter(filter, param) {
   return (dispatch, getState) => {
      if(param === SELECTED_DATE) {
         dispatch(toggleDateRangeFilter(true));
      }
      else if(_.isEmpty(param)) {
            dispatch(delVisibilityFilter(filter));
            dispatch(toggleDateRangeFilter(false));
         } else {
            if(_.result(getState(), 'filters.showDateRangeFilter')) dispatch(toggleDateRangeFilter(false));
            dispatch(setVisibilityFilter(filter, param));
         }
   };
}

export function changeFilter(filter, param) {
   let needLoadEvents = false;
   return (dispatch, getState) => {
      if(filter === VisibilityFilters.PERIOD_FILTER) {
         dispatch(changePeriodFilter(filter, param));
         if(param !== SELECTED_DATE) needLoadEvents = true;
      } else {
         if(_.isEmpty(param)) dispatch(delVisibilityFilter(filter));
         else dispatch(setVisibilityFilter(filter, param));
         needLoadEvents = true;
      }

      if(needLoadEvents) dispatch(loadEvents());
   };
}
