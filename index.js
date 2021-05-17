/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './app/Entrypoint';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';
import { enableScreens } from 'react-native-screens';
enableScreens();

AppRegistry.registerComponent(appName, () => App);
// TrackPlayer.registerEventHandler(require('./player-handler.js'))
TrackPlayer.registerPlaybackService(() => require('./app/components/service.js'));
