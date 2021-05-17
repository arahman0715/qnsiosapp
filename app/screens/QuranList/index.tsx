import React from 'react';
import { Text, View } from 'react-native';
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
import styles from './styles';
const QuranList: React.FC = () => {
  const goBack = () => NavigationService.goBack();
  const goDetails = () => NavigationService.navigate('QuranDetails',{id: 1});

  return (
    <View style={styles.container}>
      <Button icon="keyboard-backspace" mode="outlined" onPress={
        ()=>start()
                }>
        Go Back
      </Button>


      <ProgressBar />
      <Button icon="keyboard-backspace" mode="outlined" onPress={()=>goDetails()}>
        Go Details
      </Button>
    </View>
  );
};

export default QuranList;
