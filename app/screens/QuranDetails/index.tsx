import React from 'react';
import { Dimensions, TouchableNativeFeedback, View, Text } from 'react-native';
import { Button } from 'react-native-paper';

import NavigationService from 'app/navigation/NavigationService';

import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { ILoginState } from '../../models/reducers/login';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IState {
  loginReducer: ILoginState;
}
const QuranDetails: React.FC = (route: any) => {
  console.log({route},route.navigation)
  const dispatch = useDispatch();
  const quranDetails = useSelector((state: IState) => state.loginReducer.quranDetails);
  console.log('in deatils',{ quranDetails })
  const goBack = () => NavigationService.goBack();
  const _keyExtractor = (item: any) => item.id.toString();

  const _renderItem = ({ item: surah }: any) => {
    const iconColor = 'white';
    const iconSize = 34;
    return (
      <View style={{ width: Dimensions.get('window').width, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15 }}>

        <TouchableNativeFeedback>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 15 }}>
              <Text >{surah.verse_serial}</Text>

            </View>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
              <Text style={{padding: 6}}>{surah.text_madani}</Text>
              <Text style={{padding: 5}}>{surah.detail}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
        <View>
          <TouchableOpacity
            style={{ paddingLeft: 10, paddingTop: 5, paddingBottom: 10, paddingRight: 10 }}
          >
            <Text >
              
           <Icon name="play" size={30} />
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  };
  const Separator = () => (<View style={{ height: 1, width: '100%', backgroundColor: '#ced0ce' }}></View>);
  return (
    <View style={styles.container}>
      <Button icon="keyboard-backspace" mode="outlined" onPress={goBack}>
        Go Back
      </Button>
      <FlatList

        data={quranDetails[route.route.params.id]}
        // eslint-disable-next-line no-underscore-dangle
        keyExtractor={_keyExtractor}
        // eslint-disable-next-line no-underscore-dangle
        renderItem={_renderItem}
        ItemSeparatorComponent={() => <Separator />}
      // extraData={this.state}
      />
    </View>
  );
};

export default QuranDetails;
