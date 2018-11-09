export default {
  // tab导航
  homeworkTask: '作业任务',
  problemRecords: '做题记录',
  wrongNotes: '错题本',
  my: '我的',
  // 公用的
  cancel: '取消',
  confirm: '确认',
  // home
  home: {
    header: {
      title: '待计划任务：{{count}}项',
      tip: '请把下列任务安排一个合适的时间段开始吧',
      headle: '退出',
    },
  },

  // TaskDetail 任务详情
  TaskDetail: {
    useTime: '预计耗时:',
    endTime: '截止时间:',
    beginTime: '执行日期:',
    reviewHomework: '预览作业',
    beginHomework: '开始作业',
    save: '保存',
    selectTime: '选择执行时间',
  },

  // 批阅作业
  homeworkCorrecting: {
    correct: '正确',
    partOfTheError: '部分正确',
    error: '错误',
    finishCorrectingAndNext: '完成批阅,下一题',
    finishCorrectingNotNext: '完成批阅',
    homeworkCorrecting: '批阅:',
  },

  // test
  changeToEnglish: '切换到英文',
  changeToChinese: '切换到中文',
  jump: '跳转',

  // 做题记录页面
  ProblemRecords: {
    header: {
      homeworkRecord: '作业记录',
      exanRecord: '考试记录',
    },
  },

  // 检查作业页面
  ReviewHomework: {
    header: {
      continueDoHomework: '返回继续做题',
      onReview: '(检查中)',
    },
    footer: {
      isAnswered: '已作答：',
      notAnswered: '未作答：',
      draftText: '保存草稿',
      commitText: '提交作业',
    },
  },

  // 作业预览
  PreviewHomework: {
    header: {
      countdown: '倒计时: ',
    },
    footer: {
      startDoHomework: '完成预览  开始作业',
    },
  },

  // 做作业
  DoHomeworks: {
    header: {
      count: '计时',
      commit: '提交',
      viewAnsweredQues: '查看已答题目',
    },
    answerCard: {
      toAnswer: '作答：',
      uploadImgAnswerNotice: '上传解答过程将有机会被老师评为优秀解答',
      notUnderstood: '不是很懂，请老师讲解',
      toUpLoadNotice: '上传解题过程',
      shoudUploadNotice: '(主观题须上传解答过程)',
    },
  },

  // 难易程度组件
  DifficultLevelView: {
    title: '你认为本题的难易程度',
    mustChoice: '(必选*)',
    difficultLevel1: '易',
    difficultLevel2: '适中',
    difficultLevel3: '难',
  },

  // 错题本列表页
  ProblemListOverview: {
    title: '我的错题',
    header: {
      moreFilter: '更多筛选',
    },
    ProblemCard: {
      wrongReason: '错误原因：',
      form: '来自：',
      reviewQuestion: '复习错题',
    },
    random_mistake_reform: '错题随机复习',
  },

  // 错题重做
  MistakeReform: {
    header: {
      title: '错题重做',
    },
    submit: '提交答案并查看结果',
  },

  // 我的 页面
  My: {
    challengesNum: '挑战次数',
    integral: '积分',
    teamContribution: '团队贡献度',
    subjectSetting: '作业PK科目设置',
    rankBoard: '排行榜',
  },

  // 个人信息
  PersonalInformation: {
    title: '个人信息',
    studentName: '姓名:',
    school: '所在学校:',
    grade: '年级:',
    class: '班级:',
  },

  // 科目设置
  SubjectSetting: {
    title: '科目设置',
    description: '设置以下科目的作业参与PK',
  },

  // 排行榜
  RankBoard: {
    title: '排行榜',
    integralRank: '积分排名',
    contributionRank: '贡献度排名',
    integral: '积分：',
    contribution: '贡献：',
  },
};
