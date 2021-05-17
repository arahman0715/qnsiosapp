import React from 'react';
import { View } from 'react-native';
import { TouchableNativeFeedback } from 'react-native';
import { Button } from 'react-native-paper';

import NavigationService from 'app/navigation/NavigationService';
import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';

const start = async () => {
    // Set up the player
    await TrackPlayer.setupPlayer();

    // Add a track to the queue
    await TrackPlayer.add({
        id: 'trackId',
        url: 'http://www.qnsacademy.com/files/source/00_quran/03_quran_mp3_sheikh_sudais_shuraim/1_surat_al_fatiha_with_audio_english_translation_sheikh_sudais_shuraim.mp3',
        title: 'Track Title',
        artist: 'Track Artist',
       
    });

    // Start playing it
    await TrackPlayer.play();
};
function ProgressBar() {
  const progress = useTrackPlayerProgress();
  const { position, bufferedPosition, duration } = useTrackPlayerProgress(1000, null)
  return (
    <View>
      <Text>Track progress: {position} seconds out of {duration} total</Text>
      <Text>Buffered progress: {bufferedPosition} seconds buffered out of {duration} total</Text>
    </View>
    // <View style={styles.progress}>
        // <Text>{(progress.duration)}</Text>
      // {/* <View style={{ flex: progress.position, backgroundColor: "red" }} /> */}
      // {/* <View
        // style={{
          // flex: progress.duration - progress.position,
          // backgroundColor: "grey"
        // }}
      // /> */}
    

    // </View>
  );
}
import * as loginActions from 'app/store/actions/loginActions';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { ILoginState } from '../../models/reducers/login';
import { Text, Dimensions } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TrackPlayerEvents, useTrackPlayerEvents } from 'react-native-track-player';

interface IState {
  loginReducer: ILoginState;
}
const QuranList: React.FC = () => {
  const goBack = () => NavigationService.goBack();

  const dispatch = useDispatch();
  const quranList = useSelector((state: IState) => state.loginReducer.quranList);
  console.log({ quranList })
  const goDetails = (item: any) => {
    dispatch(loginActions.requestQuranDetails(item));
    NavigationService.navigate('QuranDetails', item);
  }
  
  const _keyExtractor = (item: any) => item.id.toString();

  const _renderItem = ({ item: surah }: any) => {
    const iconColor = 'white';
    const iconSize = 34;
    return (
      <View style={{ width: Dimensions.get('window').width, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15 }}>

        <TouchableNativeFeedback onPress={() => goDetails(surah)}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 15 }}>
              <Text >{surah.id}</Text>

            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>{surah.name}</Text>
              <Text>({surah.meaning}) Verse {surah.verse_number}</Text>
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
      //    <ListItem onPress={()=>{this.props.navigation.push('QuranDetails', { id: surah.id, title: `Surah ${surah.name}`, surah: surah, player: this.state.player })}}>
      //       <Left style={{maxWidth:35, alignItems:'flex-start', justifyContent:'flex-start'}}>
      //         <Text style={theme.textColor}>{surah.id}</Text>
      //       </Left>
      //      <Body>
      //         <Text style={theme.textColor}>Surah {surah.name}</Text>
      //         <Text style={theme.textColor}>({surah.meaning}) Verse {surah.verse_number}</Text>
      //      </Body>
      //      <Right>

      // <View>
      //  <TouchableOpacity  
      //      style={{paddingLeft: 10, paddingTop:5, paddingBottom: 10, paddingRight: 10}} 
      //      onPress={()=>{this.onButtonPressed(surah)}} >   
      //        {this.state.isPlaying && this.state.currentlyPlaying == surah.id ? <Icon
      //    size={iconSize}

      //    style={{fontSize: iconSize, color: iconColor}}
      //        name='pause'
      //      />:
      //        <Icon
      //    size={iconSize}

      //    style={{fontSize: iconSize,color: iconColor}}
      //        name="play"
      //      />} 
      //      </TouchableOpacity>

      // </View>

      //      </Right>

      //     </ListItem> 
    )
  };
  const Separator = () => (<View style={{ height: 1, width: '100%', backgroundColor: '#ced0ce' }}></View>);
  return (
    <View style={styles.container}>
      <Button icon="keyboard-backspace" mode="outlined" onPress={
        ()=>start()
                }>
        Go Back
      </Button>


      <ProgressBar />
      <Button icon="keyboard-backspace" mode="outlined" onPress={() => goDetails(item)}>
        Go Details
      </Button>
      {/* <Text>{JSON.stringify(quranList)}</Text> */}
      <FlatList

        data={quranList}
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

export default QuranList;
