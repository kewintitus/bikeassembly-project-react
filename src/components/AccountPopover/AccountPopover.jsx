/* eslint-disable react/prop-types */
import classes from './AccountPopover.module.css';
import * as Popover from '@radix-ui/react-popover';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AccountPopover = (props) => {
  return (
    <Popover.Root className={classes.Root}>
      <Popover.Trigger className={classes.IconButton}>
        <FaUser />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className={`${classes.PopoverContent}`}>
          <div className={classes.PopOverArea}>
            Welcome
            <span className={classes.userName}>{props?.userData?.user}</span>
          </div>
          <div className={classes.separator}></div>
          <div className={classes.userRoleArea}>
            <span className={classes.roleLabel}>Role</span>:{' '}
            {props?.userData?.role}
          </div>
          <div className={classes.separator}></div>

          <div className={classes.btnContainer}>
            {props?.userData?.isLoggedIn ? (
              <button
                onClick={props?.handleLogout}
                className={classes.logoutBtn}
              >
                Logout
              </button>
            ) : (
              <button className={`${classes.loginBtn}`}>
                <Link to="/login">Login</Link>
              </button>
            )}
          </div>
          <Popover.Close />
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default AccountPopover;
