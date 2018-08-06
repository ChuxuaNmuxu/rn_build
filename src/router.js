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
import MyHomework from './views/Student/MyHomework';
import ExamRecords from './views/Student/ExamRecords';
import HomeworkRecords from './views/Student/HomeworkRecords';
import WrongNotes from './views/Student/WrongNotes';
import Login from './views/Account/Login';
import Homework from './views/Teacher/Homework';
import TabBarIcon from './components/TabBarIcon';
import Welcome from './views/Welcome';
import SvgUri from './components/Svg';
import homework from './public/img/homework.png';
import document from './public/img/document.png';

const RouteMap = props => (
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
          tabBarStyle={{ alignItems: 'center', justifyContent: 'center', height: 80 }}
          lazy
          wrap
          swipeEnabled
          showLabel={false} // 显示文字
          headerMode="screen" // 页面切换方式
          icon={TabBarIcon}
        >
          <Stack
            title="我的作业"
            key="myHomework1"
            image={document}
            selectedImage="zuoye"
            style={{ color: 30 }}
            hideNavBar
          >
            <Scene key="myHomework" component={MyHomework} />
          </Stack>
          <Stack
            title="考试记录"
            key="examRecords1"
            image={<SvgUri height="40" width="40" source="examBook" />}
            selectedImage={homework}
          >
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
          <Scene title="作业" key="homework" component={Homework} />
        </Tabs>
      </Stack>
    </Modal>
  </Router>
);

RouteMap.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default RouteMap;
