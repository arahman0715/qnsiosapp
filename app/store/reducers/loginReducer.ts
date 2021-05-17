/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/store/actions/types';

import { ILoginState } from 'app/models/reducers/login';
import {
  ILoginRequestState,
  ILoginResponseState,
} from 'app/models/actions/login';
import { act } from 'react-test-renderer';
const initialState: ILoginState = {
  isLoggedIn: false,
  id: 0,
  username: '',
  password: '',
};

export const loginReducer = createReducer(initialState, {
  [types.LOGIN_REQUEST](state: ILoginState, action: ILoginRequestState) {
    return {
      ...state,
      username: action.username,
      password: action.password,
    };
  },
  [types.QURANDETAILS_REQUEST](state: ILoginState, action: ILoginRequestState) {
    return {
      ...state,
      id: action.id
    };
  },
  [types.LOGIN_LOADING_ENDED](state: ILoginState) {
    return { ...state };
  },
  [types.LOGIN_RESPONSE](state: ILoginState, action: ILoginResponseState) {
    return {
      ...state,
      id: action.response.id,
      isLoggedIn: false,
      quranList: action.response.chapters,
      quranDetails: {}
    };
  },
  [types.QURANDETAILS_RESPONSE](state: ILoginState, action: ILoginResponseState) {
    const q = state.quranDetails;
    console.log('In reducer details:',{action})
    return {
      ...state,

      quranDetails: { ...q, [action.response.id]: action.response.response }
    };
  },
  [types.LOGIN_FAILED](state: ILoginState) {
    return {
      ...state,
      isLoggedIn: false,
    };
  },
  [types.LOG_OUT](state: ILoginState) {
    return {
      ...state,
      isLoggedIn: false,
    };
  },
});
