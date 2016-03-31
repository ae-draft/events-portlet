import React from 'react';

export const Loader = (props) => (<div className = "loader">Loading...</div>);

export const NoResult = (props) => (
   <div className = "message_noresult">
      <div>
         <h3>{props.message || "Ничего не найдено"}</h3>
         <span>{props.additional || "Поробуйте изменить условия поиска"}</span>
      </div>
   </div>
);

export const RequestInProgress = (props) => (
   <div className = "process_request">
      <div className = "wrapper">
         {props.isShow ? <Loader /> : null}
      </div>
   </div>
);
