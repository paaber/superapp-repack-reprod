import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { ScriptManager, Federated ,} from "@callstack/repack/client";
import { Platform } from 'react-native';
AppRegistry.registerComponent(appName, () => App);

ScriptManager.shared.addResolver(async (scriptId, caller) => {
    const resolveURL = Federated.createURLResolver({
      containers: {
        MiniApp: "http://localhost:9001/[name][ext]",
      },
    });
  
    const url = resolveURL(scriptId, caller);
    if (url) {
      return {
        url,
        query: {
          platform: Platform.OS
        },
      };
    }
  });