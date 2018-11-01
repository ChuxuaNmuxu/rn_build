import {
  AppRegistry, YellowBox, Alert,
} from 'react-native';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler-iamsb';
import './src/utils/global';
import App from './App';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader',
//   'Warning: BackAndroid is deprecated.  Please use BackHandler instead.',
//   'source.uri should not be an empty string', 'Remote debugger is in a background tab which',
//   'Setting a timer',
//   'Encountered two children with the same key,',
//   'Attempt to read an array index',
]);
AppRegistry.registerComponent('cjhms_rn', () => App);


const reporter = (error) => {
  // Logic for reporting to devs
  // Example : Log issues to github issues using github apis.
  console.log(error); // sample
  // create a path you want to write to
  // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
  // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable

  // write the file
};
const errorHandler = (e, isFatal) => {
  if (isFatal) {
    reporter(e);
    Alert.alert(
      'Hei guys, I am catching a bug~~~',
      `
        Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}
        At present ,you can do something~~
        `,
      [{
        text: '返回',
        onPress: () => {
          Actions.pop();
        },
      }],
    );
  } else {
    console.log(e);
  }
};
setJSExceptionHandler(errorHandler);
setNativeExceptionHandler((errorString) => {
  console.log(errorString);
  // You can do something like call an api to report to dev team here
  // example
  // fetch('http://<YOUR API TO REPORT TO DEV TEAM>?error='+errorString);
  //
  Alert.alert(
    'Hei guys, I am catching a bug~~',
    `
      Error: ${errorString}
      At present ,you can do something~~
      `,
    [{
      text: '返回',
      onPress: () => {
        Actions.pop();
      },
    }],
  );
});
