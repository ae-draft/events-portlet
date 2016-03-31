import {
   SET_VISIBILITY_FILTER,
   DEL_VISIBILITY_FILTER,
   SET_DATEPICKER_FILTER,
   TOGGLE_DATERANGE_FILTER,
   VisibilityFilters
} from '../actions/filters-actions';

let _initialState = {filters: [], hasActiveFilters: false, showDateRangeFilter: false};
export function filters(state = _initialState, action) {
   let _filter, _oldFilter, _newFilters;
   let _getOldFilter = type => state.filters.find(f => f.Type === type);
   let _clearPeriodFilter = item => item.FType !== VisibilityFilters.PERIOD_FILTER;
   let _clearDatePicker = action => item => (action.filter === VisibilityFilters.PERIOD_FILTER) ? item.Type !== VisibilityFilters.DATEPICKER : true;
   let _checkActiveFilters = filtersCollection => filtersCollection.some(x => !_.isEmpty(x.Value));

   switch (action.type) {
      case TOGGLE_DATERANGE_FILTER:
         return {...state, showDateRangeFilter: action.activity};

      case SET_DATEPICKER_FILTER:
         _oldFilter = _getOldFilter(action.filter);
         _filter = Object.assign({}, _oldFilter,
            { Type: action.filter, Value: Object.assign(_oldFilter ? _oldFilter.Value : {}, action.param) }
         );
         _newFilters = [_filter, ...state.filters.filter(f => f.Type !== action.filter).filter(_clearPeriodFilter)];

         return {
            ...state,
            filters: _newFilters,
            hasActiveFilters: _checkActiveFilters(_newFilters)
         }

      case SET_VISIBILITY_FILTER:
         _filter = Object.assign({}, _getOldFilter(action.type),
            { Type: action.filter, Value: action.param }
         );
         _newFilters = [_filter, ...state.filters.filter(f => f.Type !== action.filter).filter(_clearDatePicker)];

         return {
            ...state,
            filters: _newFilters,
            hasActiveFilters: _checkActiveFilters(_newFilters)
         };

      case DEL_VISIBILITY_FILTER:
         _newFilters = state.filters.filter(f => f.Type !== action.filter).filter(_clearDatePicker(action));
         return {
            ...state,
            filters: _newFilters,
            hasActiveFilters: _checkActiveFilters(_newFilters)
         };

    default:
      return state;
  }
}
