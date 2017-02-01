import {
  BarGraph,
  BarGraphConfig,
  LineGraph,
  LineGraphConfig,
} from '../components/visualizations';
import barGraphTransform from './barGraphTransform';
import lineGraphTransform from './lineGraphTransform';

export default {
  bar: {
    name: 'Bar Graph',
    fields: ['xExpression', 'yExpression', 'joinExpressions', 'whereExpressions', 'groupExpressions'],
    components: {
      graph: BarGraph,
      config: BarGraphConfig,
    },
    transform: barGraphTransform,
  },
  line: {
    name: 'Line Graph',
    fields: ['xExpression', 'yExpression', 'joinExpressions', 'whereExpressions', 'groupExpressions'],
    components: {
      graph: LineGraph,
      config: LineGraphConfig,
    },
    transform: lineGraphTransform,
  },
};
