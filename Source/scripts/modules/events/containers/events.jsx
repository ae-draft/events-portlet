import React from 'react';
import {connect} from 'react-redux';
import {loadEvents} from '../../../actions/events-actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import EventItem from '../dumb/event-item.jsx';
import Filter from '../common/events-filter.jsx';
import { _filterEvents } from '../utils/filter-func';

let _connect = state => ({
   events: _filterEvents(state.events.data, state.filters),
   _total: state.events._total,
   _canLoadMore: state.events._canLoadMore
});

@connect(_connect)
export default class Events extends React.Component {
   constructor(props, context) {
      super(props, context);
      Object.assign(this, props, context);
   }

   componentDidMount() {
      this.dispatch(loadEvents());
   }

   render() {
      const {dispatch, events, _total, _canLoadMore} = this.props;

      return (
         <div className="news-container">
            <Filter />
            <div className="news-wrapper">
               <ReactCSSTransitionGroup transitionName="news-list">
                  {events.map((item, index) => <EventItem {...item} key={index}/>)}
               </ReactCSSTransitionGroup>
            </div>
            {_canLoadMore
               ? <div className="load-more fa fa-angle-double-down" onClick={() => dispatch(loadEvents())}></div>
               : null}
         </div>
      );
   }
}

Events.propTypes = {
   events: React.PropTypes.arrayOf(
      React.PropTypes.shape({
         Id: React.PropTypes.number.isRequired,
         Date: React.PropTypes.object.isRequired,
         Text: React.PropTypes.string.isRequired,
         User: React.PropTypes.object.isRequired}
      )
   )
};
