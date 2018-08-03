import React from 'react';
import {
  Scene,
  Router,
  Tabs,
  Modal,
  Stack,
  Reducer,
} from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Styles from './router.scss';
import MyHomework from './views/Student/MyHomework';
import ExamRecords from './views/Student/ExamRecords';
import HomeworkRecords from './views/Student/HomeworkRecords';
import WrongNotes from './views/Student/WrongNotes';
import Login from './views/Account/Login';
import Homework from './views/Teacher/Homework';
import Logo from './components/Logo';
import Welcome from './views/Welcome';
import CIcon from './components/Icon';
import docIcon from './public/img/document.png';

const RouteMap = (props) => {
  console.log(29, props);
  return (
    <Router
      {...props}
      createReducer={params => (state, action) => {
        props.dispatch(action);
        return Reducer(params)(state, action);
      }}
    >
      <Modal
        hideNavBar
        key="modal"
      >
        <Stack key="welcome">
          <Scene title="欢迎页面" hideNavBar key="welcome" component={Welcome} />
        </Stack>
        <Stack title="登陆" key="account">
          <Scene key="login" hideNavBar component={Login} />
        </Stack>
        <Stack key="student" hideNavBar>
          <Tabs
            key="student-tabs"
            activeBackgroundColor="#2ea460"
            inactiveBackgroundColor="#30bf6c"
            labelStyle={{ fontSize: 16, color: '#fff' }}
            tabStyle={{ height: 20 }}
            tabBarPosition="bottom"
            tabBarStyle={{ alignItems: 'center', justifyContent: 'center' }}
            lazy
            swipeEnabled
          >
            <Stack title="我的作业" key="myHomework1" image={docIcon} hideNavBar>
              <Scene key="myHomework" component={MyHomework} />
            </Stack>
            <Stack title="考试记录" key="examRecords1">
              <Scene key="myHomework" component={ExamRecords} />
            </Stack>
            <Stack title="作业记录" key="homeworkRecords1">
              <Scene key="homeworkRecords" component={HomeworkRecords} />
            </Stack>
            <Stack title="错题本" key="wrongNotes1">
              <Scene key="wrongNotes" component={WrongNotes} />
            </Stack>
          </Tabs>
        </Stack>
        <Stack key="teacher">
          <Tabs key="teacher-tabs">
            <Scene title="Logo" key="logo" component={Logo} />
            <Scene title="作业" key="homework" component={Homework} />
          </Tabs>
        </Stack>
      </Modal>
    </Router>
  );
};

RouteMap.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default RouteMap;
