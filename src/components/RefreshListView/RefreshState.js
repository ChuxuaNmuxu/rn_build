export default {
  Idle: 'Idle', // 初始状态，无刷新/无加载的情况
  CanLoadMore: 'CanLoadMore', // 可以加载更多，表示列表还有数据可以继续加载
  Refreshing: 'Refreshing', // 正在刷新中/正在加载
  NoMoreData: 'NoMoreData', // 加载完成，没有更多数据了
  Failure: 'Failure', // 刷新失败/加载失败
  RefreshSuccess: 'RefreshSuccess', // 刷新成功
};
