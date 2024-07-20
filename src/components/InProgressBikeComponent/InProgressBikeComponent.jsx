/* eslint-disable react/prop-types */
import classes from './InProgressBikeComponent.module.css';
import bike1 from './../../assets/bike-1.png';
import bike2 from './../../assets/bike-2.png';
import bike3 from './../../assets/bike-3.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiURL } from '../../../utils';

const InProgressBikeComponent = ({
  status,
  bikeType,
  bikeName,
  duration,
  startsAt,
  endsAt,
  id,
  fetchUserRecords,
}) => {
  console.log(status, bikeType, bikeName, duration, startsAt, endsAt, id);

  const [bikeIcon, setBikeIcon] = useState(null);

  const buildCancelHandler = async () => {
    window.alert('Do you want to cancel the build');
    console.log(id);

    try {
      const res = await axios.patch(
        `${apiURL}/bikeRecords`,
        { type: 'cancelBuild', id },
        { withCredentials: true }
      );
      console.log('updated', res);
      fetchUserRecords();
      // setRecentBikeRecords((prev) => prev.push({}));
    } catch (error) {
      console.log(error);
    }
  };

  const bikeIconHelper = () => {
    if (bikeType == 'bike1') {
      return bike1;
    } else if (bikeType == 'bike2') {
      return bike2;
    } else if (bikeType == 'bike3') {
      return bike3;
    }
  };
  useEffect(() => {
    setBikeIcon(bikeIconHelper());
  }, []);

  function formatDate(isoString) {
    const date = new Date(String(isoString));
    console.log(date);

    const pad = (num) => (num < 10 ? '0' : '') + num;

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  const endDateTime = endsAt && formatDate(endsAt);
  console.log(endDateTime);
  return (
    <div className={`${classes.card}`}>
      <div className={`${classes.section1}`}>
        <div className={`${classes.imgContainer}`}>
          <img src={bikeIcon} alt="" />
        </div>
        <div className={`${classes.bikeDetails}`}>
          <div className={`${classes.bikeTypeLabel}`}>{bikeName}</div>
          <div className={`${classes.bikeTypeDuration}`}>
            Duration: {duration} minutes
          </div>
        </div>
      </div>
      <div className={classes.section2}>
        <div>{status}</div>
        <div className={classes.actionContainer}>
          Completes on - {endDateTime}{' '}
          <button onClick={buildCancelHandler} className={classes.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default InProgressBikeComponent;
