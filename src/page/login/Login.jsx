// import React from 'react';
import { useRef } from 'react';
import classes from './Login.module.css';
import axios from 'axios';
import { apiURL } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../../slices/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    try {
      const res = await axios.post(
        `${apiURL}/login`,
        { username, password },
        { withCredentials: true }
      );
      console.log(res.data.data.userData);
      const resData = res.data.data.userData;
      dispatch(setLoggedIn({ user: resData.username, role: resData.role }));
      navigate('/');
      toast.success('Logged In Successfully');
    } catch (error) {
      console.log(error);
      toast.error('Username or password does not match');
    }
  };

  // const handleLogout = () => {};

  return (
    <div className={classes.loginPage}>
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
      <form onSubmit={handleLogin} className={classes.loginContainer} action="">
        <div className={`${classes.bgShape}`}></div>
        <div className={`${classes.loginLabel}`}>
          <h4>Login</h4>
        </div>
        <div className={`${classes.inputGroup}`}>
          <label htmlFor="username">Username</label>
          <input required ref={usernameRef} type="text" name="" id="username" />
        </div>

        <div className={`${classes.inputGroup}`}>
          <label htmlFor="password">Password</label>
          <input
            required
            ref={passwordRef}
            type="password"
            name=""
            id="password"
          />
        </div>
        <div className={`${classes.actionGroup}`}>
          <button>SignIn</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
