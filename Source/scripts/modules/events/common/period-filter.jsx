import React from 'react';
import {VisibilityFilters} from '../../../actions/events-actions';
let {PERIOD_FILTER} = VisibilityFilters;
import {periodFilterTypes} from '../../../common/consts/period-filter-types';
let {TODAY, YESTERDAY, WEEK, MONTH, YEAR, SELECTED_DATE } = periodFilterTypes;

export default class PeriodFilter extends React.Component {
   constructor(props, context) {
      super(props, context);
      Object.assign(this, props, context);
   }

   render() {
      const {currentValue, changeFilter} = this.props;

      return (
         <div className="filter-option f-period">
            <select className="form-control input-sm" value={currentValue} onChange={e => changeFilter(PERIOD_FILTER, e.target.value)}>
               <option value=''>За все время</option>
               <option value={TODAY}>Сегодня</option>
               <option value={YESTERDAY}>Прошедшие сутки</option>
               <option value={WEEK}>Неделю</option>
               <option value={MONTH}>Месяц</option>
               <option value={YEAR}>Год</option>
               <option value={SELECTED_DATE}>Диапазон дат</option>
            </select>
         </div>
      );
   }
}
