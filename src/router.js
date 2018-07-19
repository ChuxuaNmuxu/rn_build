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
      <Stack key="student">
        <Tabs>
          <Scene title="Logo" hideNavBar key="logo" component={Logo} />
          <Scene title="我的作业" hideNavBar key="myHomework" component={MyHomework} />
          <Scene title="考试记录" hideNavBar key="examRecords" component={ExamRecords} />
          <Scene title="作业记录" hideNavBar key="homeworkRecords" component={HomeworkRecords} />
        </Tabs>
        <Scene title="错题本" hideNavBar key="wrongNotes" component={WrongNotes} />
      </Stack>
      <Stack key="teacher">
        <Tabs>
          <Scene title="Logo" hideNavBar key="logo" component={Logo} />
          <Scene title="作业" hideNavBar key="homework" component={Homework} />
        </Tabs>
      </Stack>
    </Modal>
  </Router>
);

export default RouteMap;
