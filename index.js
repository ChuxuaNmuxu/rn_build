import {
  AppRegistry, YellowBox, Alert,
} from 'react-native';
// setNativeExceptionHandler捕获系统BUG，这个东西很烦，暂时不加了
import { setJSExceptionHandler } from 'react-native-exception-handler-iamsb';
import Logger from './src/utils/logger';
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


const reporter = (e) => {
  console.log(e); // sample
  Logger.appendFile('codeErrorLog.txt', Logger.formatCodeErrorLog(e.name, e.message));
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
// setNativeExceptionHandler((errorString) => {
//   console.log(errorString);
//   // You can do something like call an api to report to dev team here
//   // example
//   // fetch('http://<YOUR API TO REPORT TO DEV TEAM>?error='+errorString);
//   //
//   Alert.alert(
//     'Hei guys, I am catching a bug~~',
//     `
//       Error: ${errorString}
//       At present ,you can do something~~
//       `,
//     [{
//       text: '返回',
//       onPress: () => {
//         Actions.pop();
//       },
//     }],
//   );
// });
