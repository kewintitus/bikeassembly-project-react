import { useSelector } from 'react-redux';
import classes from './Home.module.css';
import { getLoginStatus } from '../../slices/authSlice';
import { Link } from 'react-router-dom';

const Home = () => {
  const userData = useSelector(getLoginStatus);

  return (
    <div className={classes.homeArea}>
      <h3 className={classes.homeHeader}>Welcome {userData.auth.user}</h3>
      {userData.auth.role == 'user' && (
        <div className={classes.subHead}>
          Start Building Bike
          <Link to="/assemble" className={classes.cta}>
            Click Here
          </Link>
        </div>
      )}
      {userData.auth.role == 'admin' && (
        <div className={classes.subHead}>
          Start Monitoring Production
          <Link to="/monitor" className={classes.cta}>
            Click Here
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
