import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import NavigationService from 'app/navigation/NavigationService';

import styles from './styles';
const QuranList: React.FC = () => {
  const goBack = () => NavigationService.goBack();
  const goDetails = () => NavigationService.navigate('QuranDetails',{id: 1});
  return (
    <View style={styles.container}>
      <Button icon="keyboard-backspace" mode="outlined" onPress={goBack}>
        Go Back
      </Button>
      <Button icon="keyboard-backspace" mode="outlined" onPress={()=>goDetails()}>
        Go Details
      </Button>
    </View>
  );
};

export default QuranList;
