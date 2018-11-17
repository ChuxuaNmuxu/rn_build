import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DetailsHonor from '../DetailsHonor';
import { GetDetailsHonor } from '../../../actions/detailsHonor';

@connect(({
  detailsHonor: {
    scrollList,
    pieChart,
  },
}) => ({
  scrollList,
  pieChart,
}), dispatch => ({
  onGetDetailsHonor: bindActionCreators(GetDetailsHonor, dispatch),
}))
class ChallengeDetails extends Component {
  componentDidMount() {
    const { onGetDetailsHonor } = this.props;
    const scrollUrl = '/app/api/game/subject/game/record';
    const pieUrl = '/app/api/game/time/stat';
    onGetDetailsHonor({ pieUrl, scrollUrl });
  }

  render() {
    const { scrollList, pieChart } = this.props;
    return (
      <DetailsHonor
        title="挑战详情"
        scrollListTitle="上次挑战"
        pieChartTitle="挑战次数"
        scrollList={scrollList}
        pieChart={pieChart}
        scrollItemType="time"
      />
    );
  }
}

ChallengeDetails.defaultProps = {
  onGetDetailsHonor: () => {},
  scrollList: [],
  pieChart: [],
};

ChallengeDetails.propTypes = {
  onGetDetailsHonor: PropTypes.func,
  scrollList: PropTypes.array,
  pieChart: PropTypes.array,
};

export default ChallengeDetails;
