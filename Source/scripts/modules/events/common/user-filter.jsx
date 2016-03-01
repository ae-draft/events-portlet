import React from 'react';
import {VisibilityFilters} from '../../../actions/events-actions';
let {USER_FILTER} = VisibilityFilters;

export default class UserFilter extends React.Component {
   constructor(props, context) {
      super(props, context);
      Object.assign(this, props, context);
   }

   render() {
      const {users, currentValue, changeFilter} = this.props;

      return (
         <div className="filter-option f-user">
            <select className="form-control input-sm" value={currentValue} onChange={e => changeFilter(USER_FILTER, e.target.value)}>
               <option value=''>Все пользователи</option>
               {users.map((user, index) =>
                  <option value={user.Id} key={index}>{user.FullName}</option>
               )}
            </select>
         </div>
      );
   }
}
