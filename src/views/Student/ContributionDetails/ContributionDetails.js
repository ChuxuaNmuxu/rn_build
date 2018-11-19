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
class ContributionDetails extends Component {
  componentDidMount() {
    const { onGetDetailsHonor } = this.props;
    const scrollUrl = '/app/api/game/subject/contribute/score/record';
    const pieUrl = '/app/api/game/contribute/score/stat';
    onGetDetailsHonor({ pieUrl, scrollUrl });
  }

  render() {
    const { scrollList, pieChart } = this.props;
    return (
      <DetailsHonor
        title="团队贡献详情"
        scrollListTitle="上次贡献"
        pieChartTitle="积分"
        scrollList={scrollList}
        pieChart={pieChart}
      />
    );
  }
}


ContributionDetails.defaultProps = {
  onGetDetailsHonor: () => {},
  scrollList: [],
  pieChart: [],
};

ContributionDetails.propTypes = {
  onGetDetailsHonor: PropTypes.func,
  scrollList: PropTypes.array,
  pieChart: PropTypes.array,
};

export default ContributionDetails;
