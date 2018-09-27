// 作业记录详情页
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import HTMLView from 'react-native-htmlview';
// import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/recordDetailActions';
import { CustomButton } from '../../../components/Icon';
import styles from './HomworkRecordDetail.scss';
import ScrollSelectedBar from './ScrollSelectedBar';
import AnserSummarization from './AnserSummarization';
import Svg from '../../../components/Svg';
import CauseOfError from '../../../components/WrongReason';
import Modal, { ModalApi } from '../../../components/Modal';

class HomworkRecordDetail extends Component {
  constructor(props) {
    super(props);
    const { params: { id = null, routeName = '' } } = props;
    console.log(id, '我是垃圾ID');
    // 总类型为作业的还是考试的
    this.type = routeName === 'HomworkRecordDetail' ? 'H' : 'E';
    // 初始化请求数据
    this.init(this.type, id);
    // 学生答案图片的url
    this.url = props.url;
    // 展示需要区分考试和作业，那设考试为'E',作业为'H'
    this.state = {
      width: 0,
      height: 0,
      screenWidth: 0,
      screenHeight: 0,
      selectTion: 0,
    };
  }

  componentWillMount() {
    // 真实情况应该在loading结束后才跑这个函数
    this.getImageSize();
  }


  // 获取图片初始化大小
  getImageSize=() => {
    Image.getSize(
      this.url,
      (width, height) => {
        this.setState(
          {
            width,
            height,
          },
        );
      },
      () => {
        try {
          // 应该是静态资源，不过没做
          const data = (Image).resolveAssetSource(this.url);
          this.setState(
            {
              width: data.width,
              height: data.height,
            },
          );
        } catch (newError) {
          // Give up..
          // this.setState(
          //   {
          //     status: 'fail',
          //   },
          // );
        }
      },
    );
  }

  init=(type, id) => {
    const {
      actions: {
        fetchExaminationData,
        fetchHomeworkListData,
        fetchHomeworkData,
      },
    } = this.props;
    const initFunc = {
      E: fetchExaminationData,
      H: fetchHomeworkListData,
    };
    // 根据不同的类型选择不同的初始化请求
    initFunc[type](
      {
        id,
        callback: type === 'H' && fetchHomeworkData,
        type,
      },
      'REQUEST',
    );
  }


  handleLayout=(event) => {
    let screenWidth = null;
    let screenHeight = null;
    if (event.nativeEvent.layout.width !== this.width) {
      screenWidth = event.nativeEvent.layout.width;
      screenHeight = event.nativeEvent.layout.height;
    }
    this.setState({
      screenWidth,
      screenHeight,
    });
    // console.log('我是layout');
    // console.log(screenWidth, screenHeight);
    // console.log('我是layout');
  }

  // 富文本数据展示框
  htmlViewComponent=() => {
    const htmlViewStyles = StyleSheet.create({
      p: {
        fontSize: 24,
        color: '#999999',
      },
    });
    const htmlContent = '<p>zhazhazha</p>'
    + '<img src="https://photo.tuchong.com/1382088/f/66585051.jpg" '
    + 'alt="undefined" style="float:none;height: auto;width: auto"/>'
    + '<p>曹尼玛的富文本</p>';
    return (
      <View style={styles.htmlViewComponent}>
        <HTMLView
          value={htmlContent}
          stylesheet={htmlViewStyles}
        />
      </View>
    );
  }

  // 分割线
  splitLine=() => (
    <View style={styles.splitLine} />
  )

  // 学生自己的答案（图片）
  studentAnserImage=() => {
    // 获得屏幕宽高
    const {
      screenHeight, screenWidth, width, height,
    } = this.state;
    let [_width, _height] = [width, height];
    // 如果宽大于屏幕宽度,整体缩放到宽度是屏幕宽度
    if (_width > screenWidth) {
      console.log('!!');
      const widthPixel = (screenWidth - 48) / width;
      _width *= widthPixel;
      _height *= widthPixel;
    }

    // 如果此时高度还大于屏幕高度,整体缩放到高度是屏幕高度
    if (_height > screenHeight) {
      console.log('??');
      const HeightPixel = screenHeight / height;
      _width *= HeightPixel;
      _height *= HeightPixel;
    }
    return (
      <View style={[styles.studentAnserImage]}>
        <Image
          style={[{ width: _width, height: _height }]}
          source={{ uri: this.url }}
        />
      </View>
    );
  }

  // 正确答案和其他同学的答案，缩略图形式，且无其他逻辑干扰，不独立组件。
  correctAndOthersAnser=(data, title) => (
    <View style={styles.correctAndOthersAnser}>
      <View style={styles.correctAndOthersAnserTitle}>
        <Text style={styles.AnserTitleText}>{title}</Text>
      </View>
      <View style={styles.imageList}>
        {
            data.map((
              (item, index) => (
                <View style={styles.imageListItem} key={`${index}666`}>
                  <TouchableOpacity onPress={() => this.callImageModal(item.url, item.studentName && item.studentName)}>
                    <Image
                      style={[{ width: 146, height: 146 }]}
                      source={{ uri: item.url }}
                    />
                  </TouchableOpacity>
                  <View style={styles.zoomImageIcon}>
                    <Svg height="40" width="40" source="wrongIcon" fill="#fff" />
                  </View>
                </View>
              )
            ))
          }
      </View>
    </View>
  )

  callImageModal=(url, name) => {
    const data = { url, studentName: name };
    ModalApi.onOppen('ImageViewer', data);
  }


  render() {
    const { headerList, detailsDataList } = this.props;
    const { selectTion } = this.state;
    console.log(detailsDataList);
    const {
      htmlContent,
    } = detailsDataList[selectTion];
    return (
      <ScrollView style={styles.homeworkDetail_container} onLayout={this.handleLayout}>
        <Modal />
        <View style={styles.homeworkDetail_header}>
          <CustomButton name="jiantou-copy-copy" style={styles.buttonStyle} onPress={Actions.ProblemRecords} />
          <Text style={styles.homeworkDetailTitle}>作业记录详情</Text>

        </View>
        {
          // 如果看代码懵逼，请结合UI图，每一块分割线前的都是UI图上的一块。
        }
        {
          // 头部的滚动选择器
          <ScrollSelectedBar data={headerList} />
        }
        {
          // 你好我是分割线
          this.splitLine()
        }

        {
          <React.Fragment>
            {
              // 富文本显示块，，，如果出错可能是返回数据是block而不是html字符串。形式固定，不独立组件了。
              htmlContent ? this.htmlViewComponent(htmlContent) : null
            }
            {
               // 你好我是分割线
              this.splitLine()
            }
          </React.Fragment>

        }

        {
          <React.Fragment>
            {
              // 该题的摘要，包括对错得分难易同批阅之类。
              // 说起来你不信。这个页面这个组件时最难的，但是看起来是最少东西的。
              <AnserSummarization />
            }
            {
              // 你好我是分割线
              this.splitLine()
            }
          </React.Fragment>
        }

        {
          <React.Fragment>
            {
              // 学生自己的答案，是个图片。形式固定，不独立组件了。
              // 这个B组件没有答案的时候就不展示了
              this.studentAnserImage()
            }
            {
              // 你好我是分割线
              this.splitLine()
            }
          </React.Fragment>
        }

        {
          // 题目答案
          this.correctAndOthersAnser(
            [
              {
                url: 'https://s1.tuchong.com/content-image/201808/c0d4a9ed78db8ccff97dbd04d9ab62ab.png',

              },
            ], '题目答案',
          )
        }
        {
          // 你好我是分割线
          this.splitLine()
        }

        {
          // 题目答案
          this.correctAndOthersAnser(
            [
              {
                url: 'https://s1.tuchong.com/content-image/201808/c0d4a9ed78db8ccff97dbd04d9ab62ab.png',
                studentName: '李香兰',
              },
              {
                url: 'https://s1.tuchong.com/content-image/201808/c0d4a9ed78db8ccff97dbd04d9ab62ab.png',
                studentName: '李香兰',
              },
              {
                url: 'https://s1.tuchong.com/content-image/201808/c0d4a9ed78db8ccff97dbd04d9ab62ab.png',
                studentName: '李香兰',
              },
            ], '看看其他同学的解答过程：',
          )
        }
        {
          // 你好我是分割线
          this.splitLine()
        }

        {
          // 错误原因分析
          <View style={styles.CauseOfError}>
            <CauseOfError />
          </View>
        }
      </ScrollView>
    );
  }
}

HomworkRecordDetail.propTypes = {
  url: PropTypes.string,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  headerList: PropTypes.array.isRequired,
  detailsDataList: PropTypes.array.isRequired,
};

HomworkRecordDetail.defaultProps = {
  url: 'https://s1.tuchong.com/content-image/201808/c0d4a9ed78db8ccff97dbd04d9ab62ab.png',
};

const mapStateToProps = (state) => {
  const { routes, recordDetailReducer: { detailsDataList, headerList } } = state;
  const { params } = routes;
  console.log(state, 'aa');
  return {
    params,
    detailsDataList,
    headerList,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(HomworkRecordDetail);
