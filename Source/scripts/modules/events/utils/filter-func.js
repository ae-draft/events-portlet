import {VisibilityFilters} from '../../../actions/events-actions';
import {periodFilterTypes} from '../../../common/consts/period-filter-types';
let {TODAY, YESTERDAY, WEEK, MONTH, YEAR, DATEPICKER} = periodFilterTypes;
moment.locale('ru');

export function _filterEvents(events, filters) {
   let periodFilter = (collection, period) => collection.filter(item => {
      let [itemDate, now] = [moment(item.Date), moment()];
      let yearConstraint = itemDate.get('year') === now.get('year');

      switch (period) {
         case TODAY:
            return yearConstraint && itemDate.dayOfYear() === now.dayOfYear();
         case YESTERDAY:
            return yearConstraint && itemDate.dayOfYear() === (now.dayOfYear() - 1);
         case WEEK:
            return yearConstraint && itemDate.week() === now.week();
         case MONTH:
            return yearConstraint && itemDate.month() === now.month();
         case YEAR:
            return yearConstraint;
         default:
            return true;
      }
   });

   let datepickerFilter = (collection, { startDate, endDate } = datesObj) => collection.filter(item => {
      let _itemDate = moment(item.Date);
      return (startDate ? _itemDate >= startDate : true) && (endDate ? _itemDate <= endDate : true);
   });

   let applyFilter = (collection, {filter, param} = filter) => {
      switch (filter) {
         case VisibilityFilters.PERIOD_FILTER:
            events = param ? periodFilter(collection, param) : collection;
            break;
         case VisibilityFilters.DATEPICKER:
            events = param ? datepickerFilter(collection, param) : collection;
            break;
         case VisibilityFilters.USER_FILTER:
            events = !!param ? collection.filter(item => item.User.Id == param) : collection;
            break;
         case VisibilityFilters.TYPE_FILTER:
            events = !!param ? collection.filter(item => item.Type == param) : collection;
            break;
      }
   };

   filters.forEach(filter => applyFilter(events, filter));
   return events;
}
