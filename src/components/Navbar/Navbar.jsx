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
    await axios.post(`${apiURL}/logout`);
    dispatch(setLoggedOut());
    navigate('/login');
  };
  return (
    <div
      className={`${classes.nav} ${data?.auth?.isLoggedIn && classes.loggedIn}`}
    >
      <div>MANUFACTURING CENTER</div>
      <div className={`${classes.navRight}`}>
        <div>{data?.auth?.isLoggedIn && data?.auth?.user}</div>
        {data?.auth.isLoggedIn ? (
          <button onClick={handleLogout} className={`${classes.logoutBtn}`}>
            logout
          </button>
        ) : (
          <button className={`${classes.loginBtn}`}>
            <Link to="/login">Login</Link>
          </button>
          // <button onClick={handleLogin}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
