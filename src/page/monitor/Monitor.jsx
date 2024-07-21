import { useEffect, useState } from 'react';
import BikeProductionBarChart from '../../components/Charts/BikeProductionBarChart/BikeProductionBarChart';
import EmployeeContributionPieChart from '../../components/Charts/EmployeeContributionPieChart/EmployeeContributionPieChart';
import classes from './Monitor.module.css';
import axios from 'axios';
import { apiURL } from '../../../utils';
import BikeProductionTrndChart from '../../components/Charts/BikeProductionTrendChart/BikeProductionTrendChart';

const Monitor = () => {
  const getDefaultFromDate = () => {
    const date = new Date();

    return date.toISOString(); // Store ISO string
  };
  const getDefaultToDate = () => {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    return date.toISOString(); // Store ISO string
  };
  const [fromDate, setFromDate] = useState(getDefaultFromDate());
  const [toDate, setToDate] = useState(getDefaultToDate());

  const [allBikeTypeCountData, setAllBikeTypeCountData] = useState([]);
  const [allEmployeeContribution, setAllEmployeeContribution] = useState([]);
  const [allBikeTypeProductionTrendData, setAllBikeTypeProductionTrendData] =
    useState([]);

  const formatDate = (isoString) => {
    return isoString.split('T')[0];
  };
  const fromDateHandler = (e) => {
    console.log(e.target.value);
    const fromDateVal = new Date(e.target.value);
    console.log(fromDateVal.toISOString());
    setFromDate(fromDateVal.toISOString());
  };
  const toDateHandler = (e) => {
    const toDateVal = new Date(e.target.value);
    toDateVal.setHours(23, 59, 59, 999);
    console.log(e.target.value);
    console.log(toDateVal.toISOString());
    setToDate(toDateVal.toISOString());
  };

  const fetchAllBikeTypeCount = async (fromDate, toDate) => {
    const res = await axios.get(
      `${apiURL}/allBikeRecords?type=overallCompletedBikeTypeCount&from=${fromDate}&to=${toDate}`,
      { withCredentials: true }
    );
    // console.log(res.data.data);
    const resData = res.data.data;

    setAllBikeTypeCountData(resData);
  };
  const fetchOverallEmloyeeContribution = async (fromDate, toDate) => {
    const res = await axios.get(
      `${apiURL}/allBikeRecords?type=overallEmployeeContribution&from=${fromDate}&to=${toDate}`,
      { withCredentials: true }
    );
    console.log(res.data.data);
    const resData = res.data.data;
    console.log(resData);
    setAllEmployeeContribution(resData);
  };
  const fetchAllBikeTypeProductionTrendData = async (fromDate, toDate) => {
    const res = await axios.get(
      `${apiURL}/allBikeRecords?type=bikeTypeProductionTrend&from=${fromDate}&to=${toDate}`,
      { withCredentials: true }
    );
    console.log(res.data.data);
    const resData = res.data.data;
    console.log(resData);
    setAllBikeTypeProductionTrendData(resData);
  };

  useEffect(() => {
    fetchAllBikeTypeCount(fromDate, toDate);
    fetchOverallEmloyeeContribution(fromDate, toDate);
    fetchAllBikeTypeProductionTrendData(fromDate, toDate);
  }, [fromDate, toDate]);

  return (
    <div className={classes.monitorPage}>
      <div className={classes.pageHeader}>
        <div>Production Dashboard</div>

        <div className={`${classes.filterSection}`}>
          <div className={`${classes.filterContainer}`}>
            <label htmlFor="fromDate">From</label>
            <input
              onChange={fromDateHandler}
              type="date"
              name=""
              id="fromDate"
              defaultValue={formatDate(fromDate)}
            />
          </div>
          <div className={`${classes.filterContainer}`}>
            <label htmlFor="toDate">To</label>
            <input
              onChange={toDateHandler}
              type="date"
              name=""
              id="toDate"
              defaultValue={formatDate(toDate)}
            />
          </div>
        </div>
      </div>
      <div className={`${classes.card} ${classes.primaryCard}`}>
        <div className={`${classes.topInfoCards}`}>
          <div className={classes.topInfoCard}>
            <div className={classes.topInfoLabel}>Most Produced Bike Type</div>
            <div className={classes.topInfoValueCont}>
              <div className={classes.topInfoValue1}>Bike1</div>
              <div className={classes.topInfoValue2}>66</div>
            </div>
          </div>
          <div className={classes.topInfoCard}>
            <div className={classes.topInfoLabel}>Most Produced User</div>
            <div className={classes.topInfoValueCont}>
              <div className={classes.topInfoValue1}>User1</div>
              <div className={classes.topInfoValue2}>66</div>
            </div>
          </div>
        </div>
        <div className={classes.row1}>
          <div className={classes.graphcard}>
            <div className={classes.chartLabel}>Bike Production</div>
            <BikeProductionBarChart data={allBikeTypeCountData} />
          </div>
          <div className={classes.graphcard}>
            <div className={classes.chartLabel}>Empployee Contribution</div>
            <EmployeeContributionPieChart data={allEmployeeContribution} />
          </div>
        </div>
        <div className={classes.row1}>
          <div className={classes.graphcard}>
            <div className={classes.chartLabel}>
              Production Trend - Bike Types
            </div>
            <BikeProductionTrndChart
              data={allBikeTypeProductionTrendData}
              fromDate={fromDate}
              toDate={toDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
