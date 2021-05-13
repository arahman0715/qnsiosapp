/**
 *  Redux saga class init
 */
import { takeEvery, all } from 'redux-saga/effects';
import QuranDetails from '../../screens/QuranDetails';
import * as types from '../actions/types';
import loginSaga from './loginSaga';
import quranDetailsSaga from './quranDetailsSaga';

export default function* watch() {
  yield all([takeEvery(types.LOGIN_REQUEST, loginSaga)]);
  yield all([takeEvery(types.QURANDETAILS_REQUEST, quranDetailsSaga)]);
}
