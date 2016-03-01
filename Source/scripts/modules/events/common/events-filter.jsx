import React from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import UserFilter from '../common/user-filter.jsx';
import PeriodFilter from '../common/period-filter.jsx';
import TypeFilter from '../common/type-filter.jsx';

import {loadEventTypes} from '../../../actions/eventTypes-actions';
import {setVisibilityFilter, delVisibilityFilter, VisibilityFilters} from '../../../actions/events-actions';
let {USER_FILTER, PERIOD_FILTER, TYPE_FILTER, DATEPICKER} = VisibilityFilters;

import {periodFilterTypes} from '../../../common/consts/period-filter-types';
let {SELECTED_DATE} = periodFilterTypes;

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

let _connect = state => {
   let uniqUsedPropTypes = _.chain(state.events.data).map(item => _.get(item, 'Type')).uniq().value();
   let filteredEventTypes = uniqUsedPropTypes => filter => uniqUsedPropTypes.some(x => x == filter.Id);

   return {
      filters: state.filters,
      users: _.chain(state.events.data).map(item => _.get(item, 'User')).uniq('Id').value(),
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
      this.dispatch(setVisibilityFilter(DATEPICKER, {startDate: date}));
   }

   changeEndDate(date) {
      this.dispatch(setVisibilityFilter(DATEPICKER, {endDate: date}));
   }

   changeFilters(nextFilter, param) {
      if(param === SELECTED_DATE)
         this.dispatch(setVisibilityFilter(DATEPICKER, {}));
      else
         _.isEmpty(param)
            ? this.dispatch(delVisibilityFilter(nextFilter))
            : this.dispatch(setVisibilityFilter(nextFilter, param));
   }

   render() {
      const {dispatch, eventTypes, users, filters} = this.props;
      let showDatePicker = filters.some(x => x.filter === DATEPICKER);
      let _filterValue = type => _.result(filters.find(x => x.filter === type), 'param');

      let filterDot = <div className="filtered-dot"></div>;
      let dateRangeBlock = showDatePicker ? <div className="filter-option f-datepicker">
         <div className="f-datepicker-inner">
            <DatePicker
               selected={_filterValue(DATEPICKER).startDate}
               onChange={::this.changeStartDate}
               placeholderText="Начальная дата"
               isClearable={true}
               startDate={_filterValue(DATEPICKER).startDate}
               endDate={_filterValue(DATEPICKER).endDate}
               showYearDropdown
               dateFormatCalendar="MMMM"
            />
            <DatePicker
               selected={_filterValue(DATEPICKER).endDate}
               onChange={::this.changeEndDate}
               placeholderText="Конечная дата"
               isClearable={true}
               startDate={_filterValue(DATEPICKER).startDate}
               endDate={_filterValue(DATEPICKER).endDate}
               showYearDropdown
               dateFormatCalendar="MMMM"
            />
         </div>
      </div> : null;

      let optionsBlock = <div className="filter-options-list">
         <UserFilter users={users} currentValue={_filterValue(USER_FILTER)} changeFilter={::this.changeFilters} />
         <PeriodFilter currentValue={_filterValue(PERIOD_FILTER)} changeFilter={::this.changeFilters} />
         <TypeFilter eventTypes={eventTypes} currentValue={_filterValue(TYPE_FILTER)} changeFilter={::this.changeFilters} />

         <ReactCSSTransitionGroup transitionName="filter-datepicker" transitionAppear={true}>
            {dateRangeBlock}
         </ReactCSSTransitionGroup>
      </div>;

      return (
         <div className="filter-wrapper">
            <div className="filter-container">
               <div className="icon-button" onClick={::this.toggleDialog}>
                  {this.props.filters.some(x => x.isFiltered) ? filterDot : null}
               </div>
               <ReactCSSTransitionGroup transitionName="filter-news" transitionAppear={true}>
                  { this.state.dialogShowFlag ? optionsBlock : null }
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
