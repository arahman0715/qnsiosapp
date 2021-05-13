/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, call } from 'redux-saga/effects';
// import { delay } from 'redux-saga';

import { Alert } from 'react-native';
import {quranDetails} from 'app/services/loginUser';
import * as loginActions from 'app/store/actions/loginActions';

// Our worker Saga that logins the user
export default function* loginAsync(action: any) {
  console.log({action});
  yield put(loginActions.enableLoader());

  //how to call api
  const response = yield call(quranDetails, action.item.id);
  //mock response
  //const response = { success: true, data: { id: 1 }, message: 'Success' };
console.log({response})
  if (response.data) {
    yield put(loginActions.onQuranDetailsResponse({response: response.data.translations, id: action.item.id}));
    yield put(loginActions.disableLoader());

    // no need to call navigate as this is handled by redux store with SwitchNavigator
    //yield call(navigationActions.navigateToHome);
  } else {
    yield put(loginActions.loginFailed());
    yield put(loginActions.disableLoader());
    setTimeout(() => {
      Alert.alert('BoilerPlate', response.message);
    }, 200);
  }
}
