import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import * as loginActions from 'app/store/actions/loginActions';
import styles from './styles';
import { ILoginState } from 'app/models/reducers/login';
import NavigationService from 'app/navigation/NavigationService';

interface IState {
  loginReducer: ILoginState;
}

const Login: React.FC = () => {
  const id = useSelector((state: IState) => state.loginReducer.id);
  const dispatch = useDispatch();
  const onLogin = () => dispatch(loginActions.requestLogin('test', '1234'));
  const onNav = (which: any, params: any) => {dispatch(loginActions.requestLogin('test', '1234'));NavigationService.navigate(which, params);}
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {/* <Text style={styles.login}>Login Status : {id}</Text> */}
        {/* <Button icon="login" mode="outlined" onPress={onLogin}>
          Login
        </Button> */}
        <Button
          mode="text"
          style={styles.forgot}
          labelStyle={styles.labelStyle}
          onPress={()=>onNav('QuranList', {})}>
          QuranList
        </Button>
        <Button
          mode="text"
          style={styles.forgot}
          labelStyle={styles.labelStyle}
          onPress={()=>onNav('HadisList', {})}>
          HadisList
        </Button>
      </View>
    </View>
  );
};

export default Login;
