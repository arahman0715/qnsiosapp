import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import * as loginActions from 'app/store/actions/loginActions';
import styles from './styles';
import { ILoginState } from 'app/models/reducers/login';
import NavigationService from 'app/navigation/NavigationService';

import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';

interface IState {
  loginReducer: ILoginState;
}
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
const Login: React.FC = () => {
  const id = useSelector((state: IState) => state.loginReducer.id);
  const dispatch = useDispatch();
  const onLogin = () => dispatch(loginActions.requestLogin('test', '1234'));
  const onNav = (which: any, params: any) => {dispatch(loginActions.requestLogin('test', '1234'));NavigationService.navigate(which, params);}
  const start = async () => {
    // Set up the player
    await TrackPlayer.setupPlayer();

    // Add a track to the queue
    await TrackPlayer.add({
        id: 'trackId',
        url: 'http://www.qnsacademy.com//files//source//00_quran//03_quran_mp3_sheikh_sudais_shuraim//1_surat_al_fatiha_with_audio_english_translation_sheikh_sudais_shuraim.mp3',
        title: 'Track Title',
        artist: 'Track Artist',
        // artwork: require('track.png')
    });

    // Start playing it
    await TrackPlayer.play();
    const { position, bufferedPosition, duration } = useTrackPlayerProgress();
    console.log(duration);
    

};

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
          onPress={()=>{
            start()
            // onNav('QuranList', {})
          }}>
          QuranList
        </Button>
        <ProgressBar />
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
