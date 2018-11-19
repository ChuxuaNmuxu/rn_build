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
class IntegralDetails extends Component {
  componentDidMount() {
    const { onGetDetailsHonor } = this.props;
    const scrollUrl = '/app/api/game/subject/score/record';
    const pieUrl = '/app/api/game/score/stat';
    onGetDetailsHonor({ pieUrl, scrollUrl });
  }

  render() {
    const { scrollList, pieChart } = this.props;
    return (
      <DetailsHonor
        title="积分详情"
        scrollListTitle="上次积分"
        pieChartTitle="积分"
        scrollList={scrollList}
        pieChart={pieChart}
      />
    );
  }
}

IntegralDetails.defaultProps = {
  onGetDetailsHonor: () => {},
  scrollList: [],
  pieChart: [],
};

IntegralDetails.propTypes = {
  onGetDetailsHonor: PropTypes.func,
  scrollList: PropTypes.array,
  pieChart: PropTypes.array,
};

export default IntegralDetails;
