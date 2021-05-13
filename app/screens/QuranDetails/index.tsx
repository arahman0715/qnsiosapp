import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import NavigationService from 'app/navigation/NavigationService';

import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { ILoginState } from '../../models/reducers/login';

interface IState {
  loginReducer: ILoginState;
}
const QuranDetails: React.FC = (route) => {
  console.log({route},route.navigation)
  const dispatch = useDispatch();
  const quranDetails = useSelector((state: IState) => state.loginReducer.quranDetails);
  console.log('in deatils',{ quranDetails })
  const goBack = () => NavigationService.goBack();
  return (
    <View style={styles.container}>
      <Button icon="keyboard-backspace" mode="outlined" onPress={goBack}>
        Go Back
      </Button>
    </View>
  );
};

export default QuranDetails;
