import React from 'react';
import {
  View,
  Text,
  // TouchableOpacity,
} from 'react-native';
import {
  Scene,
  Router,
  Tabs,
  Modal,
  Stack,
  Reducer,
} from 'react-native-router-flux';
// import Entypo from 'react-native-vector-icons/Entypo';
import PropTypes from 'prop-types';
import HomeworkTask from './views/Student/HomeworkTask';
import ProblemRecords from './views/Student/ProblemRecords';
import My from './views/Student/My';
// import WrongNotes from './views/Student/WrongNotes'; // 项目人员 hqh 注释掉了，因为错题本是hqh写的！
import PreviewHomework from './views/Student/PreviewHomework';
import ReviewHomework from './views/Student/ReviewHomework';
import DoHomework from './views/Student/DoHomework';
import Login from './views/Account/Login';
import Homework from './views/Teacher/Homework';
import TabBarIcon from './components/TabBarIcon';
import Welcome from './views/Welcome';
import Demo from './views/Demo';
import styles from './router.scss';
import TaskDetail from './views/Student/TaskDetail';
import ProblemOverview from './views/Student/ProblemOverview';
import ProblemListOverview from './views/Student/ProblemListOverview';
import MistakeReform from './views/Student/MistakeReform';
import HomeworkCorrecting from './views/Student/HomeworkCorrecting';
// 文件改名字失败，不改了。这两个组件时同一个的其实。考试详情和练习详情。
import HomworkRecordDetail from './views/Student/HomworkRecordDetail';
// import ExamRecordDetail from './views/Student/ExamRecordDetail';
import HomeworkProblemDetail from './views/Student/HomeworkProblemDetail';

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
      <Stack key="WelcomeStack">
        <Scene title="welcome" hideNavBar key="Welcome" component={Welcome} />
      </Stack>
      <Stack key="Account">
        <Scene key="Login" hideNavBar component={Login} />
      </Stack>
      <Stack
        key="Student"
        hideNavBar
        // initial
      >
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
            key="HomeworkTaskStack"
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
            key="ProblemRecordsStack"
            image="jilu"
            selectedImage="jilu"
            hideNavBar
          >
            <Scene
              key="ProblemRecords"
              component={ProblemRecords}
            />
          </Stack>
          {/* 错题本 */}
          <Stack
            title="wrongNotes" // 配好在zh.js、en.js那边了
            key="ProblemOverviewStack"
            image="cuotiben1"
            selectedImage="cuotiben1"
            // titleStyle={styles.navigationBarStyle_title}
            // navigationBarStyle={styles.navigationBarStyle_problemOverview} // 导航条的样式
            hideNavBar // 是否隐藏整个导航条
          >
            <Scene
              key="ProblemOverview"
              component={ProblemOverview}
            />
          </Stack>
          {/* hqh 注释掉 */}
          {/* <Stack
            title="wrongNotes"
            key="WrongNotesStack"
            image="cuotiben1"
            selectedImage="cuotiben1"
            hideNavBar
          >
            <Scene key="WrongNotes" component={WrongNotes} />
          </Stack> */}
          <Stack
            title="my"
            key="MyStack"
            image="wodedangxuan"
            selectedImage="wodedangxuan"
            hideNavBar
          >
            <Scene key="My" component={My} />
          </Stack>
        </Tabs>
      </Stack>
      <Stack key="Teacher">
        <Tabs key="TeacherTabs">
          <Scene title="作业" key="homework" component={Homework} />
        </Tabs>
      </Stack>
      <Stack
        key="StudentAll"
        // initial
      >
        {/* 作业预览 */}
        <Scene key="PreviewHomework" component={PreviewHomework} hideNavBar />
        {/* 做作业 */}
        <Scene key="DoHomework" component={DoHomework} hideNavBar />
        {/* 作业检查 */}
        <Scene key="ReviewHomework" component={ReviewHomework} hideNavBar />
        {/* 错题本列表页 */}
        <Scene key="ProblemListOverview" component={ProblemListOverview} hideNavBar />
        {/* 错题重做 */}
        <Scene key="MistakeReform" component={MistakeReform} hideNavBar />
        {/* 作业记录详情页 */}
        <Scene key="HomworkRecordDetail" component={HomworkRecordDetail} hideNavBar />
        {/* 考试记录详情页 */}
        <Scene key="ExamRecordDetail" component={HomworkRecordDetail} hideNavBar />
        {/* 作业批阅 */}
        <Scene key="HomeworkCorrecting" component={HomeworkCorrecting} hideNavBar />
        {/* 错题明细 */}
        <Scene key="HomeworkProblemDetail" component={HomeworkProblemDetail} hideNavBar />
        {/* 任务详情 */}
        <Scene key="TaskDetail" component={TaskDetail} hideNavBar />
      </Stack>
      <Stack key="TeacherAll" hideNavBar>
        <Scene title="作业" key="homework" component={Homework} />
      </Stack>
      <Stack
        key="DemoStack"
      >
        <Scene
          key="Demo"
          component={Demo}
          renderTitle={(
            <View style={styles.demo_renderTitle_titleBox}>
              <Text style={styles.demo_renderTitle_title}>自定义标题</Text>
            </View>
          )}
          // initial
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
          // backButtonTintColor='white' // 返回按钮的颜色
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
  </Router>);

RouteMap.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default RouteMap;
