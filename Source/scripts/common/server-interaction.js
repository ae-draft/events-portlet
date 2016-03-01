import $ from 'jquery';
import { handleError } from '../common/error-handler';
import { API_URL } from '../common/consts/constants';

export let interaction = {
	host: API_URL,
	send: function(url, data, options, dispatch) {
		const requestDefaults = {
			method: "POST",
			async: true,
			dataType: "jsonp",
			contentType: "application/json",
			scriptCharset: "UTF8",
			cache: true,
			processData: true,
			crossDomain: true,
			xhrFields: {
		      withCredentials: true
		   },
			statusCode: {
			 401: function() {
			   alert( "unauthorized" );
			 }
			}
		};

		options = _.assign(requestDefaults, options, { url: this.host + url, data: data });
		return $.ajax(options).fail(data => {
      	handleError(data, dispatch);
			return data;
      });
	}
};
