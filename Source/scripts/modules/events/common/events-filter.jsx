import React from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import UserFilter from '../common/user-filter.jsx';
import PeriodFilter from '../common/period-filter.jsx';
import TypeFilter from '../common/type-filter.jsx';
import DateRangeFilter from '../common/daterange-filter.jsx';

import {loadEventTypes} from '../../../actions/eventTypes-actions';
import {VisibilityFilters, changeFilter} from '../../../actions/filters-actions';
let {USER_FILTER, PERIOD_FILTER, TYPE_FILTER, DATEPICKER} = VisibilityFilters;

import {periodFilterTypes} from '../../../common/consts/period-filter-types';
import {getFilterValue} from '../utils/filter-func';

let _connect = state => {
   let uniqUsedPropTypes = _.chain(state.events.data).map(item => _.get(item, 'Type')).uniq().value();
   let filteredEventTypes = uniqUsedPropTypes => filter => uniqUsedPropTypes.some(x => x == filter.Id);

   return {
      filters: state.filters.filters,
      hasActiveFilters: state.filters.hasActiveFilters,
      showDateRangeFilter: state.filters.showDateRangeFilter,
      users: _.chain(state.events.data).map(item => _.get(item, 'User')).uniqBy('Id').value(),
      eventTypes: state.eventTypes.filter(filteredEventTypes(uniqUsedPropTypes))
   }
};

@connect(_connect)
export default class Filter extends React.Component {
   constructor(props, context) {
      super(props, context);
      this.state = {
         dialogShowFlag: false,
         startDate: null,
         endDate: null
      };
      Object.assign(this, props, context);
   }

   componentDidMount() {
      this.dispatch(loadEventTypes());
   }

   toggleDialog() {
      this.setState({dialogShowFlag: !this.state.dialogShowFlag});
   }

   changeStartDate(date) {
      this.dispatch(changeFilter(DATEPICKER, {startDate: date}));
   }

   changeEndDate(date) {
      this.dispatch(changeFilter(DATEPICKER, {endDate: date}));
   }

   changeFilters(nextFilter, param) {
      this.dispatch(changeFilter(nextFilter, param));
   }

   render() {
      const {dispatch, eventTypes, users, filters, hasActiveFilters, showDateRangeFilter} = this.props;
      let _getDateRangeValue = getEndDate => {
         let _value = getFilterValue(DATEPICKER, filters);
         if(!_value) return null;

         return getEndDate ? _value.endDate : _value.startDate;
      };

      let filterDot = <div className="filtered-dot"></div>;
      let optionsBlock = <div className="filter-options-list">
         <UserFilter users={users} currentValue={getFilterValue(USER_FILTER, filters)} changeFilter={::this.changeFilters} />
         <PeriodFilter currentValue={showDateRangeFilter ? periodFilterTypes.SELECTED_DATE : getFilterValue(PERIOD_FILTER, filters)} changeFilter={::this.changeFilters} />
         <TypeFilter eventTypes={eventTypes} currentValue={getFilterValue(TYPE_FILTER, filters)} changeFilter={::this.changeFilters} />

         <ReactCSSTransitionGroup transitionName="filter-datepicker" transitionAppear={true}>
            {showDateRangeFilter
               ? <DateRangeFilter
                     changeStartDate={::this.changeStartDate}
                     changeEndDate={::this.changeEndDate}
                     startDate={_getDateRangeValue()}
                     endDate={_getDateRangeValue(true)}
                  />
               : null}
         </ReactCSSTransitionGroup>
      </div>;

      return (
         <div className="filter-wrapper">
            <div className="filter-container">
               <div className="icon-button" onClick={::this.toggleDialog}>
                  {hasActiveFilters ? filterDot : null}
               </div>
               <ReactCSSTransitionGroup transitionName="filter-news" transitionAppear={true}>
                  {this.state.dialogShowFlag ? optionsBlock : null}
               </ReactCSSTransitionGroup>
            </div>
         </div>
      );
   }
}

Filter.propTypes = {
   handler: React.PropTypes.func,
   options: React.PropTypes.array
};
