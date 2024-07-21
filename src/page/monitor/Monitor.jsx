import { useEffect, useState } from 'react';
import BikeProductionBarChart from '../../components/Charts/BikeProductionBarChart/BikeProductionBarChart';
import EmployeeContributionPieChart from '../../components/Charts/EmployeeContributionPieChart/EmployeeContributionPieChart';
import classes from './Monitor.module.css';
import axios from 'axios';
import { apiURL } from '../../../utils';
import BikeProductionTrndChart from '../../components/Charts/BikeProductionTrendChart/BikeProductionTrendChart';
import { toast, ToastContainer } from 'react-toastify';

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
  const [mostProducedBikeData, setMostProducedBikeData] = useState([]);
  const [mostProductiveEmployee, setMostProductiveEmployee] = useState([]);

  const formatDate = (isoString) => {
    return isoString.split('T')[0];
  };
  const fromDateHandler = (e) => {
    const fromDateVal = new Date(e.target.value);

    setFromDate(fromDateVal.toISOString());
  };
  const toDateHandler = (e) => {
    const toDateVal = new Date(e.target.value);
    toDateVal.setHours(23, 59, 59, 999);

    setToDate(toDateVal.toISOString());
  };

  const fetchAllBikeTypeCount = async (fromDate, toDate) => {
    try {
      const res = await axios.get(
        `${apiURL}/allBikeRecords?type=overallCompletedBikeTypeCount&from=${fromDate}&to=${toDate}`,
        { withCredentials: true }
      );
      // console.log(res.data.data);
      const resData = res.data.data;

      setAllBikeTypeCountData(resData);
    } catch (error) {
      toast.error('Error In fetching data');
    }
  };
  const fetchOverallEmloyeeContribution = async (fromDate, toDate) => {
    try {
      const res = await axios.get(
        `${apiURL}/allBikeRecords?type=overallEmployeeContribution&from=${fromDate}&to=${toDate}`,
        { withCredentials: true }
      );
      console.log(res.data.data);
      const resData = res.data.data;
      console.log(resData);
      setAllEmployeeContribution(resData);
    } catch (error) {
      toast.error('Error In fetching data');
      console.log(error);
    }
  };
  const fetchAllBikeTypeProductionTrendData = async (fromDate, toDate) => {
    try {
      const res = await axios.get(
        `${apiURL}/allBikeRecords?type=bikeTypeProductionTrend&from=${fromDate}&to=${toDate}`,
        { withCredentials: true }
      );

      const resData = res.data.data;

      setAllBikeTypeProductionTrendData(resData);
    } catch (error) {
      toast.error('Error In fetching data');
    }
  };

  const fetchMostProducedBikeType = async (fromDate, toDate) => {
    try {
      const res = await axios.get(
        `${apiURL}/allBikeRecords?type=mostProducedBike&from=${fromDate}&to=${toDate}`,
        { withCredentials: true }
      );
      console.log(res.data.data);
      const resData = res.data.data;
      console.log(resData);
      setMostProducedBikeData(resData);
    } catch (error) {
      toast.error('Error In fetching data');
    }
  };

  const fetchMostProductiveEmployee = async (fromDate, toDate) => {
    try {
      const res = await axios.get(
        `${apiURL}/allBikeRecords?type=mostProductiveEmployee&from=${fromDate}&to=${toDate}`,
        { withCredentials: true }
      );
      console.log(res.data.data);
      const resData = res.data.data;
      console.log(resData);
      setMostProductiveEmployee(resData);
    } catch (error) {
      console.log(error);
      toast.error('Error In fetching data');
    }
  };

  useEffect(() => {
    fetchAllBikeTypeCount(fromDate, toDate);
    fetchOverallEmloyeeContribution(fromDate, toDate);
    fetchAllBikeTypeProductionTrendData(fromDate, toDate);
    fetchMostProducedBikeType(fromDate, toDate);
    fetchMostProductiveEmployee(fromDate, toDate);
  }, [fromDate, toDate]);

  return (
    <div className={classes.monitorPage}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />

      <ToastContainer />

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
            <div className={classes.subTopInfoLabel}>UOM: No of Bikes</div>

            <div className={classes.topInfoValueCont}>
              <div className={classes.topInfoValue1}>
                {mostProducedBikeData.length > 0
                  ? mostProducedBikeData[0]._id
                  : 'No data'}
              </div>
              <div className={classes.topInfoValue2}>
                {mostProducedBikeData.length > 0
                  ? mostProducedBikeData[0].count
                  : 'No data'}
              </div>
            </div>
          </div>
          <div className={classes.topInfoCard}>
            <div className={classes.topInfoLabel}>Most Productive Employee</div>
            <div className={classes.subTopInfoLabel}>UOM: No of Bikes</div>
            <div className={classes.topInfoValueCont}>
              <div className={classes.topInfoValue1}>
                {mostProductiveEmployee.length > 0
                  ? mostProductiveEmployee[0]?._id
                  : 'No data'}
              </div>
              <div className={classes.topInfoValue2}>
                {mostProductiveEmployee.length > 0
                  ? mostProductiveEmployee[0]?.count
                  : 'No data'}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.row1}>
          <div className={classes.graphcard}>
            <div className={classes.chartLabel}>Bike Production</div>
            <div className={classes.chartSubLabel}>UOM: No of Bikes</div>
            <BikeProductionBarChart data={allBikeTypeCountData} />
          </div>
          <div className={classes.graphcard}>
            <div className={classes.chartLabel}>Employee Contribution</div>
            <div className={classes.chartSubLabel}>UOM: No of Bikes</div>

            <EmployeeContributionPieChart data={allEmployeeContribution} />
          </div>
        </div>
        <div className={classes.row1}>
          <div className={classes.graphcard}>
            <div className={classes.chartLabel}>
              Production Trend - Bike Types
            </div>
            <div className={classes.chartSubLabel}>UOM: No of Bikes</div>

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
