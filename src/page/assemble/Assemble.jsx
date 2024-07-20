// import React from 'react';
import BikeComponent from '../../components/BikeCard/BikeComponent';
import CreateBikeModal from '../../components/CreatBikeModal/CreateBikeModal';
import classes from './Assemble.module.css';

const Assemble = () => {
  return (
    <div className={`${classes.assemblePage}`}>
      <div className={`${classes.assemblePageHeader}`}>Welcome User</div>
      <div className={`${classes.assemblyLine} ${classes.primaryCard}`}>
        <div className={`${classes.assemblyLineHeader}`}>
          <div className={`${classes.assemblyLineLabel}`}>Assembly line</div>
          {/* <button className={`${classes.startAssyBtn}`}>Start Sequence</button> */}
          <CreateBikeModal />
        </div>
        <div className={`${classes.noBuild}`}>No build in progress</div>
        <div className={`${classes.recentBuild}`}>
          <div className={`${classes.recentBuildHeader}`}>Recent Build</div>
          <div className={`${classes.recentBuildContainer}`}>
            <BikeComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assemble;
