import React from 'react';
import {connect} from 'react-redux';
import {loadEvents, loadNext} from '../../../actions/events-actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import EventItem from '../dumb/event-item.jsx';
import Filter from '../common/events-filter.jsx';
import {NoResult, RequestInProgress} from '../dumb/statless-components.jsx';

let _connect = state => ({
   events: state.events.data,
   _total: state.events._total,
   _canLoadMore: state.events._canLoadMore,
   authors: state.authors,
   hasActiveFilters: state.filters.hasActiveFilters,
   isFetching: state.events.isFetching
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
      const {dispatch, events, _total, _canLoadMore, authors, hasActiveFilters, isFetching} = this.props;
      const getAuthor = _id => authors.find(x => x.Id === _id);
      let _renderContentBlock = () => {
         return events.map((item, index) => <EventItem {...{...item, User: getAuthor(item.AuthorId)}} key={index}/>)
      }

      let _renderNoResultBlock = () => {
         if(events.length === 0 && !isFetching) {
            return hasActiveFilters
               ? <NoResult />
               : <NoResult message = {"Нет загруженных данных"} additional = {""} />;
         } else
            return null;
      };

      return (
         <div className="news-container">
            <Filter />
            <RequestInProgress isShow={isFetching} />
            <div className="news-wrapper">
               {_renderNoResultBlock()}
               <ReactCSSTransitionGroup transitionName="news-list">
                  {_renderContentBlock()}
               </ReactCSSTransitionGroup>
            </div>
            {_canLoadMore
               ? <div className="load-more fa fa-angle-double-down" onClick={() => dispatch(loadNext())}></div>
               : null
            }
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
         AuthorId: React.PropTypes.string.isRequired}
      )
   )
};
