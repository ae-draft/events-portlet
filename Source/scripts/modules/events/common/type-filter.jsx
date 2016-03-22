import React from 'react';
import {VisibilityFilters} from '../../../actions/filters-actions';
let {TYPE_FILTER} = VisibilityFilters;

export default class TypeFilter extends React.Component {
   constructor(props, context) {
      super(props, context);
      Object.assign(this, props, context);
   }

   render() {
      const {eventTypes, currentValue, changeFilter} = this.props;

      return (
         <div className="filter-option f-type">
            <select className="form-control input-sm" value={currentValue} onChange={e => changeFilter(TYPE_FILTER, e.target.value)}>
               <option value=''>Любые</option>
               {eventTypes.map((type, index) =>
                  <option value={type.Id} key={index}>{type.Name}</option>
               )}
            </select>
         </div>
      );
   }
}
