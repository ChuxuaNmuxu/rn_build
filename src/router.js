import React from 'react';
import {
  Scene,
  Router,
  // Actions,
  // Reducer,
  // ActionConst,
  // Overlay,
  Tabs,
  Modal,
  // Drawer,
  Stack,
  // Lightbox,
} from 'react-native-router-flux';
import Styles from './router.scss';
import MyHomework from './views/Student/MyHomework';
import ExamRecords from './views/Student/ExamRecords';
import HomeworkRecords from './views/Student/HomeworkRecords';
import WrongNotes from './views/Student/WrongNotes';
import Login from './views/Account/Login';
import Homework from './views/Teacher/Homework';
import Logo from './components/Logo';
import Welcome from './views/Welcome';

const RouteMap = () => (
  <Router>
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
          labelStyle={Styles.labelStyle}
          tabBarStyle={Styles.tabBarStyle}
          lazy
        >
          <Scene title="我的作业" key="myHomework" component={MyHomework} hideNavBar titleStyle={{ alignSelf: 'center' }} />
          <Scene title="考试记录" key="examRecords" component={ExamRecords} hideNavBar />
          <Scene title="作业记录" key="homeworkRecords" component={HomeworkRecords} hideNavBar />
          <Scene title="错题本" key="wrongNotes" component={WrongNotes} hideNavBar />
        </Tabs>
        {/* <Scene title="我的作业" hideNavBar key="myHomework" component={MyHomework} />
          <Scene title="考试记录" hideNavBar key="examRecords" component={ExamRecords} />
          <Scene title="作业记录" hideNavBar key="homeworkRecords" component={HomeworkRecords} />
          <Scene title="错题本" hideNavBar key="wrongNotes" component={WrongNotes} /> */}
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

export default RouteMap;
