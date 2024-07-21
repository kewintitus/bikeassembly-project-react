import { useDispatch, useSelector } from 'react-redux';
import classes from './Navbar.module.css';
import {
  getLoginStatus,
  setLoggedIn,
  setLoggedOut,
} from '../../slices/authSlice';
import axios from 'axios';
import { apiURL } from '../../../utils';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AccountPopover from '../AccountPopover/AccountPopover';

const Navbar = () => {
  const dispatch = useDispatch();

  const data = useSelector(getLoginStatus);
  const navigate = useNavigate();
  // console.log(data);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const checkLoginStatus = async () => {
    const res = await axios.get(`${apiURL}/login`, { withCredentials: true });

    console.log(res.data, 'isLog');

    if (!res.data.loggedIn) {
      dispatch(setLoggedOut());
      navigate('/login');
    } else {
      dispatch(
        setLoggedIn({ user: res.data.user.username, role: res.data.user.role })
      );
    }
    // dispatch(setLoggedIn());

    console.log(res);
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);
  const handleLogout = async () => {
    await axios.post(`${apiURL}/logout`, {}, { withCredentials: true });
    dispatch(setLoggedOut());
    navigate('/login');
  };
  return (
    <div
      className={`${classes.nav} ${data?.auth?.isLoggedIn && classes.loggedIn}`}
    >
      <div>MANUFACTURING CENTER</div>
      <div className={`${classes.navRight}`}>
        {data.auth.role == 'user' && (
          <Link className={classes.navItem} to={'/assemble'}>
            Build Bike
          </Link>
        )}
        {data.auth.role == 'admin' && (
          <Link className={classes.navItem} to={'/monitor'}>
            Monitor Production
          </Link>
        )}
        <AccountPopover handleLogout={handleLogout} userData={data?.auth} />
      </div>
    </div>
  );
};

export default Navbar;
