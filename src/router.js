import React from 'react';
import {
  View,
  Text,
} from 'react-native';
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
import DoHomework from './views/Student/DoHomework';

import Login from './views/Account/Login';
import Homework from './views/Teacher/Homework';
import TabBarIcon from './components/TabBarIcon';
import Welcome from './views/Welcome';
import Demo from './views/Demo';
// import SvgUri from './components/Svg';
import homework from './public/img/homework.png';
// import document from './public/img/document.png';
import styles from './router.scss';

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
      <Stack key="welcome1">
        <Scene title="welcome" hideNavBar key="welcome" component={Welcome} />
      </Stack>
      <Stack title="login" key="account">
        <Scene key="login" hideNavBar component={Login} />
      </Stack>
      <Stack key="student" hideNavBar>
        <Tabs
          key="student-tabs"
          activeBackgroundColor="#2ea460" // 选中tabbar的背景色
          inactiveBackgroundColor="#30bf6c" // 未选中tabbar的背景色
          // activeTintColor="#4ECBFC" // 选中tabbar图标的颜色
          // inactiveTintColor="#aaa" // 未选中tabbar图标的颜色
          // tabStyle={{ height: 20 }}
          tabBarPosition="bottom"
          tabBarStyle={styles.tabBarStyle}
          lazy
          wrap
          swipeEnabled
          showLabel={false} // 显示文字
          headerMode="screen" // 页面切换方式
          icon={TabBarIcon}
        >
          <Stack
            title="myHomework"
            key="myHomework1"
            image={homework}
            selectedImage="zuoye"
            hideNavBar
          >
            <Scene key="myHomework" component={MyHomework} />
          </Stack>
          <Stack
            title="examRecords"
            key="examRecords"
            // image={<SvgUri height="40" width="40" source="examBook" />}
            selectedImage="zuoye"
            image={homework}
            titleStyle={styles.examRecords_titleStyle}
            navigationBarStyle={styles.examRecords_navigationBarStyle}
          >
            <Scene
              key="examRecords"
              component={ExamRecords}
              title="选择日期范围"
            />
          </Stack>
          <Stack title="homeworkRecords" key="homeworkRecords1">
            <Scene key="homeworkRecords" component={HomeworkRecords} />
          </Stack>
          <Stack title="wrongNotes" key="wrongNotes1">
            <Scene key="wrongNotes" component={WrongNotes} />
          </Stack>
        </Tabs>

        <Scene title="DoHomework" key="DoHomework" component={DoHomework} />
      </Stack>
      <Stack key="teacher">
        <Tabs key="teacher-tabs">
          <Scene title="作业" key="homework" component={Homework} />
        </Tabs>
      </Stack>
      <Stack key="demo">
        <Scene
          // title="demo"
          renderTitle={(
            <View style={styles.demo_renderTitle_titleBox}>
              <Text style={styles.demo_renderTitle_title}>自定义标题</Text>
            </View>
          )}
          key="demo"
          component={Demo}
          renderLeftButton={(
            <View style={styles.demo_renderLeftButton_box}>
              <Text style={styles.demo_renderLeftButton_text}>111</Text>
            </View>
          )}
          leftTitle="回退"
          rightTitle="前进"
          onLeft={() => console.log('onLeft')}
          onRight={() => console.log('onRight')}
          titleStyle={{ color: 'white' }}
          // back // 显示返回按钮
          backTitle="后退标题"
          navBarButtonColor="#fff" // 设置返回按颜色
          navigationBarStyle={styles.demo_navigationBarStyle}
        />
      </Stack>
    </Modal>
  </Router>
);

RouteMap.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default RouteMap;
