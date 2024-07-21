/* eslint-disable react/prop-types */
import { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const generateDateRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    dates.push(currentDate.toISOString().split('T')[0]); // YYYY-MM-DD
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const formatData = (response, startDate, endDate) => {
  const dateRange = generateDateRange(startDate, endDate);
  const bikeTypes = [...new Set(response.map((item) => item._id.bikeType))];

  // Initialize data structure
  const data = dateRange.map((date) => {
    const entry = { name: date }; // Name is used as the X-axis key in Recharts
    bikeTypes.forEach((bikeType) => {
      entry[bikeType] = 0; // Initialize with 0
    });
    return entry;
  });

  // Populate data with response
  response.forEach((item) => {
    const date = item._id.completedDay;
    const bikeType = item._id.bikeType;
    const count = item.count;

    const entry = data.find((d) => d.name === date);
    if (entry) {
      entry[bikeType] = count;
    }
  });

  return data;
};

export default class BikeProductionTrndChart extends PureComponent {
  render() {
    const resData = this.props.data;
    const { fromDate, toDate } = this.props;

    const data = formatData(resData, fromDate, toDate);
    console.log('inProdTrend', resData);
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="bike1"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="bike2" stroke="#82ca9d" />
          <Line type="monotone" dataKey="bike3" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
