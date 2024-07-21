/* eslint-disable react/prop-types */
import classes from './BikeComponent.module.css';
import bike1 from './../../assets/bike-1.png';
import bike2 from './../../assets/bike-2.png';
import bike3 from './../../assets/bike-3.png';
import { useEffect, useState } from 'react';

const BikeComponent = ({ status, bikeType, duration, endsAt, elapsedTime }) => {
  const [bikeIcon, setBikeIcon] = useState(null);

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
  const cancelledDateTime = elapsedTime && formatDate(elapsedTime);
  return (
    <div
      className={`${classes.card} ${
        status == 'Completed' ? classes.completeCard : classes.cancelledCard
      }`}
    >
      <div className={`${classes.section1}`}>
        <div className={`${classes.imgContainer}`}>
          <img src={bikeIcon} alt="" />
        </div>
        <div className={`${classes.bikeDetails}`}>
          <div className={`${classes.bikeTypeLabel}`}>{bikeType}</div>
          <div className={`${classes.bikeTypeDuration}`}>
            Duration: {duration}
          </div>
        </div>
      </div>
      <div className={classes.section2}>
        <div>{status}</div>
        <div>on {status == 'Completed' ? endDateTime : cancelledDateTime}</div>
      </div>
    </div>
  );
};

export default BikeComponent;
