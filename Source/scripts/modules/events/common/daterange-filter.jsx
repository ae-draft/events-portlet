import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class DateRangeFilter extends React.Component {
   constructor(props, context) {
      super(props, context);
      Object.assign(this, props, context);
   }

   render() {
      const {startDate, endDate, changeStartDate, changeEndDate} = this.props;

      return (
         <div className="filter-option f-datepicker">
            <div className="f-datepicker-inner">
               <DatePicker
                  selected={startDate}
                  onChange={changeStartDate}
                  placeholderText="Начальная дата"
                  isClearable={true}
                  startDate={startDate}
                  endDate={endDate}
                  showYearDropdown
                  dateFormatCalendar="MMMM"
               />
               <DatePicker
                  selected={endDate}
                  onChange={changeEndDate}
                  placeholderText="Конечная дата"
                  isClearable={true}
                  startDate={startDate}
                  endDate={endDate}
                  showYearDropdown
                  dateFormatCalendar="MMMM"
               />
            </div>
         </div>
      );
   }
}
