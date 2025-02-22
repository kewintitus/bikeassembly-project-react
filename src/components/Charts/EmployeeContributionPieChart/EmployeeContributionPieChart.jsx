/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { PureComponent } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
//   { name: 'Group E', value: 278 },
//   { name: 'Group F', value: 189 },
// ];

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#AA336A',
  '#336FAA',
];

export default class EmployeeContributionPieChart extends PureComponent {
  renderCustomizedLabel = ({ name, value }) => {
    return `${name}: ${value}`;
  };
  transformData = (apiData) => {
    return apiData.map((item) => ({
      name: item._id,
      value: item.count,
    }));
  };
  render() {
    const { data } = this.props;
    const transformedData = this.transformData(data);

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            data={transformedData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
