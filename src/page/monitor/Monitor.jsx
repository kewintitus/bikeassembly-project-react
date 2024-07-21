import BikeProductionBarChart from '../../components/Charts/BikeProductionBarChart/BikeProductionBarChart';
import EmployeeContributionPieChart from '../../components/Charts/EmployeeContributionPieChart/EmployeeContributionPieChart';
import classes from './Monitor.module.css';

const Monitor = () => {
  return (
    <div className={classes.monitorPage}>
      <div className={classes.pageHeader}>
        <div>Production Dashboard</div>

        <div className={`${classes.filterSection}`}>
          <div className={`${classes.filterContainer}`}>
            <label htmlFor="fromDate">From</label>
            <input type="date" name="" id="fromDate" />
          </div>
          <div className={`${classes.filterContainer}`}>
            <label htmlFor="toDate">To</label>
            <input type="date" name="" id="toDate" />
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
            <BikeProductionBarChart />
          </div>
          <div className={classes.graphcard}>
            <div className={classes.chartLabel}>Bike Production</div>
            <EmployeeContributionPieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
