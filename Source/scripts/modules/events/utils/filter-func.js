import {VisibilityFilters} from '../../../actions/filters-actions';
import {periodFilterTypes} from '../../../common/consts/period-filter-types';
let {TODAY, YESTERDAY, WEEK, MONTH, YEAR, DATEPICKER} = periodFilterTypes;
moment.locale('ru');

export function getFilterValue(type, filters) {
   return _.result(filters.find(x => x.Type === type), 'Value');
}

export function getDateRange(filters) {
   const formatDate = date => date.format("YYYY-MM-DD");
   let dateRange = getFilterValue(VisibilityFilters.DATEPICKER, filters);

   if(!_.isEmpty(dateRange))
      return {
         startDate: dateRange.startDate ? formatDate(dateRange.startDate) : null,
         endDate: dateRange.endDate ? formatDate(dateRange.endDate) : null
      };

   let period = getFilterValue(VisibilityFilters.PERIOD_FILTER, filters);
   let now = moment();

   switch (period) {
      case TODAY:
         return {
            startDate: formatDate(moment().startOf('day')),
            endDate: null
         };
      case YESTERDAY:
         let yesterday = moment().add(-1, 'days');
         return {
            startDate: formatDate(yesterday.startOf('day')),
            endDate: formatDate(now.startOf('day'))
         };
      case WEEK:
         return {
            startDate: formatDate(now.startOf('week')),
            endDate: formatDate(now.endOf('week'))
         };
      case MONTH:
         return {
            startDate: formatDate(now.startOf('month')),
            endDate: formatDate(now.endOf('month'))
         };
      case YEAR:
         return {
            startDate: formatDate(now.startOf('year')),
            endDate: formatDate(now.endOf('year'))
         };
      default:
         return {startDate: null, endDate: null};
   }
}

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

   let applyFilter = (collection, {FType, FValue} = filter) => {
      switch (FType) {
         case VisibilityFilters.PERIOD_FILTER:
            events = FValue ? periodFilter(collection, FValue) : collection;
            break;
         case VisibilityFilters.DATEPICKER:
            events = FValue ? datepickerFilter(collection, FValue) : collection;
            break;
         case VisibilityFilters.USER_FILTER:
            events = !!FValue ? collection.filter(item => item.User.Id == FValue) : collection;
            break;
         case VisibilityFilters.TYPE_FILTER:
            events = !!FValue ? collection.filter(item => item.Type == FValue) : collection;
            break;
      }
   };

   filters.forEach(filter => applyFilter(events, filter));
   return events;
}
