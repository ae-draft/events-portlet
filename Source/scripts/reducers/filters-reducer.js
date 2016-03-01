import {
   SET_VISIBILITY_FILTER,
   DEL_VISIBILITY_FILTER,
   SET_DATEPICKER_FILTER,
   VisibilityFilters
} from '../actions/events-actions';

export function filters(state = [], action) {
   let _filter, _oldFilter;
   let _getOldFilter = type => state.find(f => f.filter === type);
   let _clearPeriodFilter = item => item.filter !== VisibilityFilters.PERIOD_FILTER;
   let _clearDatePicker = action => item => (action.filter === VisibilityFilters.PERIOD_FILTER) ? item.filter !== VisibilityFilters.DATEPICKER : true;

   switch (action.type) {
      case SET_DATEPICKER_FILTER:
         _oldFilter = _getOldFilter(action.filter);
         _filter = Object.assign({}, _oldFilter,
            { filter: action.filter, param: Object.assign(_oldFilter ? _oldFilter.param : {}, action.param), isFiltered: !!action.param }
         );

         return [_filter, ...state.filter(f => f.filter !== action.filter).filter(_clearPeriodFilter)];

      case SET_VISIBILITY_FILTER:
         _oldFilter = _getOldFilter(action.type);
         _filter = Object.assign({}, _oldFilter,
            { filter: action.filter, param: action.param, isFiltered: !!action.param }
         );

         return [_filter, ...state.filter(f => f.filter !== action.filter).filter(_clearDatePicker)];

      case DEL_VISIBILITY_FILTER:
         return state.filter(f => f.filter !== action.filter).filter(_clearDatePicker(action));

    default:
      return state;
  }
}
