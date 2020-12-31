'use strict';

import { name } from './app.json';
import { AppRegistry } from 'react-native';
import SplashActivity from './app/activities/splash-activity';

AppRegistry.registerComponent(name, () => SplashActivity);