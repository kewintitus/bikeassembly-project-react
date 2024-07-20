import classes from './BikeComponent.module.css';
import bike1 from './../../assets/bike-1.png';
import bike2 from './../../assets/bike-2.png';
import bike3 from './../../assets/bike-3.png';

const BikeComponent = ({
  status,
  bikeType,
  bikeName,
  duration,
  startsAt,
  endsAt,
}) => {
  return (
    <div className={`${classes.card}`}>
      <div className={`${classes.section1}`}>
        <div className={`${classes.imgContainer}`}>
          <img src={bike1} alt="" />
        </div>
        <div className={`${classes.bikeDetails}`}>
          <div className={`${classes.bikeTypeLabel}`}>Bike Type</div>
          <div className={`${classes.bikeTypeDuration}`}>Duration: 1hr</div>
        </div>
      </div>
      <div className={classes.section2}>
        <div>Completed</div>
        <div>On Jan 14, hh:mm:ss</div>
      </div>
    </div>
  );
};

export default BikeComponent;
