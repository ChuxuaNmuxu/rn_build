import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Scene,
  Router,
  Tabs,
  Modal,
  Stack,
  Reducer,
} from 'react-native-router-flux';
import Entypo from 'react-native-vector-icons/Entypo';
import PropTypes from 'prop-types';
import HomeworkTask from './views/Student/HomeworkTask';
import ProblemRecords from './views/Student/ProblemRecords';
import My from './views/Student/My';
import WrongNotes from './views/Student/WrongNotes';
import DoHomework from './views/Student/DoHomework';

import Login from './views/Account/Login';
import Homework from './views/Teacher/Homework';
import TabBarIcon from './components/TabBarIcon';
import Welcome from './views/Welcome';
import Demo from './views/Demo';
import styles from './router.scss';
import TaskDetail from './views/Student/TaskDetail';
import ProblemOverview from './views/Student/ProblemOverview';

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
      {/* 错题本 */}
      <Stack key="ProblemOverview">
        <Scene
          title="错题本"
          titleStyle={styles.navigationBarStyle_title}
          navigationBarStyle={styles.navigationBarStyle_problemOverview} // 导航条的样式
          // hideNavBar // 是否隐藏整个导航条
          key="ProblemOverview1"
          component={ProblemOverview}
          initial
        />
      </Stack>
      {/* 任务详情 */}
      <Stack key="TaskDetail">
        <Scene
          // title="TaskDetail" // 会自动在props加入一个 title="TaskDetail"
          back
          // backButtonTintColor='white' // 返回按钮的颜色
          navigationBarStyle={styles.navigationBarStyle_taskDetail} // 导航条的样式
          renderBackButton={() => (
            <View>
              <TouchableOpacity onPress={Actions.pop}>
                <Entypo name="chevron-thin-left" size={40} color="white" />
              </TouchableOpacity>
            </View>
          )}
          // hideNavBar // 是否隐藏整个导航条
          key="TaskDetail1"
          component={TaskDetail}
        />
      </Stack>
      <Stack key="Welcome1">
        <Scene title="welcome" hideNavBar key="Welcome" component={Welcome} />
      </Stack>
      <Stack key="Account">
        <Scene key="Login" hideNavBar component={Login} />
      </Stack>
      <Stack key="Student" hideNavBar>
        <Tabs
          key="StudentTabs"
          activeBackgroundColor="#fafafa" // 选中tabbar的背景色
          inactiveBackgroundColor="#ffffff" // 未选中tabbar的背景色
          // activeTintColor="#4ECBFC" // 选中tabbar图标的颜色
          // inactiveTintColor="#aaa" // 未选中tabbar图标的颜色
          // tabStyle={styles.tabStyle} // 单个选项卡的样式
          tabBarPosition="bottom"
          tabBarStyle={styles.tabBarStyle} // 标签栏样式，可以修改tabBarPosition为bottom时默认下划线样式
          // animationEnabled={false} // 切换动画
          lazy
          wrap
          swipeEnabled
          showLabel={false} // 显示文字
          headerMode="screen" // 页面切换方式
          icon={TabBarIcon}
        >
          <Stack
            title="homeworkTask"
            key="HomeworkTask1"
            image="zuoye2"
            selectedImage="zuoye2"
            hideNavBar
          >
            <Scene
              key="HomeworkTask"
              component={HomeworkTask}
            />
          </Stack>
          <Stack
            title="problemRecords"
            key="ProblemRecords1"
            image="jilu"
            selectedImage="jilu"
            hideNavBar
          >
            <Scene
              key="ProblemRecords"
              component={ProblemRecords}
            />
          </Stack>
          <Stack
            title="wrongNotes"
            key="WrongNotes1"
            image="cuotiben1"
            selectedImage="cuotiben1"
            hideNavBar
          >
            <Scene key="WrongNotes" component={WrongNotes} />
          </Stack>
          <Stack
            title="my"
            key="My1"
            image="wodedangxuan"
            selectedImage="wodedangxuan"
            hideNavBar
          >
            <Scene key="My" component={My} />
          </Stack>
        </Tabs>
      </Stack>
      <Stack key="HomeworkTaskAll" hideNavBar>
        <Scene key="DoHomework" component={DoHomework} />
      </Stack>
      <Stack key="Teacher">
        <Tabs key="TeacherTabs">
          <Scene title="作业" key="homework" component={Homework} />
        </Tabs>
      </Stack>
      <Stack key="Demo1">
        <Scene
          key="Demo"
          component={Demo}
          renderTitle={(
            <View style={styles.demo_renderTitle_titleBox}>
              <Text style={styles.demo_renderTitle_title}>自定义标题</Text>
            </View>
          )}
          // renderLeftButton={(
          //   <TouchableOpacity onPress={() => console.log('左边自定义')}>
          //     <View style={styles.demo_renderLeftButton_box}>
          //       <Text style={styles.demo_renderLeftButton_text}>左边自定义</Text>
          //     </View>
          //   </TouchableOpacity>
          // )}
          // renderRightButton={(
          //   <TouchableOpacity onPress={() => console.log('右边自定义')}>
          //     <View style={styles.demo_renderLeftButton_box}>
          //       <Text style={styles.demo_renderLeftButton_text}>右边自定义</Text>
          //     </View>
          //   </TouchableOpacity>
          // )}
          // title="标题"
          leftTitle="左边 -> 回退"
          rightTitle="右边 -> 前进到首页"
          onLeft={() => console.log('onLeft')}
          onRight={() => Actions.Student()}
          titleStyle={{ color: 'white' }}
          // back // 显示返回按钮
          // backTitle="后退标题"
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
