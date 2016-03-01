import { AUTH_ERRORS } from '../common/consts/error-types';

export const THROW_NEW_ERROR = 'THROW_NEW_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const CLEAR_ALL_ERROR = 'CLEAR_ALL_ERROR';

export function throwNewError(err_type, part, error) {
  return dispatch => dispatch({type: THROW_NEW_ERROR, err_type, part, error});
}

export function throwAuthError(part, error) {
   return dispatch => dispatch(throwNewError(AUTH_ERRORS, part, error));
}

export function clearAuthError(part) {
   if(part)
      return dispatch => dispatch(clearError(AUTH_ERRORS, part));
   else {
      return dispatch => dispatch(clearError(AUTH_ERRORS));
   }
}

export function clearError(err_type, part) {
  return {type: CLEAR_ERROR, err_type, part};
}

export function clearAllError() {
  return {type: CLEAR_ALL_ERROR};
}
