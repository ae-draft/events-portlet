import React from 'react';
import AvatarCircle from '../../users/dumb/avatar-circle.jsx';

export default class EventItem extends React.Component {
  render() {
    return (
      <div className="news-item">
        <AvatarCircle {...this.props.User} />
        <div className="news-content-wrapper">
           <div className="news-item-head">
            <span>{this.props.User.Name}</span>
            <span>{moment(this.props.Date).format('LLL')}</span>
           </div>
           <div className="news-item-message" dangerouslySetInnerHTML={{__html: this.props.Text}} />
        </div>
      </div>
    );
  }
}

EventItem.propTypes = {
   Id: React.PropTypes.string.isRequired,
   User: React.PropTypes.shape({
      Id: React.PropTypes.string.isRequired,
      FullName: React.PropTypes.string.isRequired,
      PhotoUrl: React.PropTypes.string
   }).isRequired,
   Text: React.PropTypes.string.isRequired,
   Date: React.PropTypes.string.isRequired,
   Type: React.PropTypes.number
};
