import React from 'react';
import { HOST_BASE_URL } from '../../../common/consts/constants';
const _isProduction = process.env.NODE_ENV === 'production';

export default class AvatarCircle extends React.Component {
   isImgExist() {
      return !_.isEmpty(this.props.PhotoUrl);
   }

   getInnerBlock() {
      if(this.isImgExist()) {
         let _photoUrl = _isProduction ? this.props.PhotoUrl : `${HOST_BASE_URL}/${this.props.PhotoUrl}`;
         return <img src={_photoUrl} />;
      }
      else {
         return <div className="avatar-literal">{this.props.FullName[0]}</div>;
      }
   }

   render() {
      return (
         <div className="avatar-circle">
            {this.getInnerBlock()}
         </div>
      );
   }
}

AvatarCircle.propTypes = {
   Id: React.PropTypes.string,
   FullName: React.PropTypes.string.isRequired,
   PhotoUrl: React.PropTypes.string
};
