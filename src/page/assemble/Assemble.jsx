// import React from 'react';
import { useEffect, useState } from 'react';
import BikeComponent from '../../components/BikeCard/BikeComponent';
import CreateBikeModal from '../../components/CreatBikeModal/CreateBikeModal';
import classes from './Assemble.module.css';
import InProgressBikeComponent from '../../components/InProgressBikeComponent/InProgressBikeComponent';
import axios from 'axios';
import { apiURL } from '../../../utils';

const Assemble = () => {
  const [bikeRecords, setBikeRecords] = useState([]);
  const [inProgressBikeRecords, setInProgressBikeRecords] = useState([]);
  const [recentBikeRecords, setRecentBikeRecords] = useState([]);

  const fetchUserRecords = async () => {
    const res = await axios.get(`${apiURL}/bikeRecords?type=userRecords`, {
      withCredentials: true,
    });
    const resData = res.data.data;
    const inProgressRecords = resData.filter(
      (data) => data?.status == 'In Progress'
    );
    const recentRecords = resData.filter(
      (data) => data?.status == 'Cancelled' || data.status == 'Completed'
    );
    console.log(recentRecords);
    console.log(resData);
    setBikeRecords(resData);
    setInProgressBikeRecords(inProgressRecords);
    setRecentBikeRecords(recentRecords);
  };

  useEffect(() => {
    fetchUserRecords();
  }, []);
  return (
    <div className={`${classes.assemblePage}`}>
      <div className={`${classes.assemblePageHeader}`}>Welcome User</div>
      <div className={`${classes.assemblyLine} ${classes.primaryCard}`}>
        <div className={`${classes.assemblyLineHeader}`}>
          <div className={`${classes.assemblyLineLabel}`}>Assembly line</div>
          {/* <button className={`${classes.startAssyBtn}`}>Start Sequence</button> */}
          <CreateBikeModal
            setInProgressBikeRecords={setInProgressBikeRecords}
            fetchUserRecords={fetchUserRecords}
            inProgressBikeRecords={inProgressBikeRecords}
          />
        </div>
        {inProgressBikeRecords?.length === 0 ? (
          <div className={`${classes.noBuild}`}>No build in progress</div>
        ) : (
          inProgressBikeRecords.map((data) => (
            <InProgressBikeComponent
              key={data?._id}
              status={data?.status}
              bikeType={data?.bikeType}
              bikeName={data?.bikeName}
              duration={data?.duration}
              startsAt={data?.startedAt}
              endsAt={data?.endsAt}
              id={data?._id}
              fetchUserRecords={fetchUserRecords}
            />
          ))
        )}
        {/* <div className={`${classes.noBuild}`}>No build in progress</div> */}
        <div className={`${classes.recentBuild}`}>
          <div className={`${classes.recentBuildHeader}`}>Recent Build</div>
          <div className={`${classes.recentBuildContainer}`}>
            {recentBikeRecords?.map(
              (data) => (
                <BikeComponent
                  key={data?._id}
                  status={data?.status}
                  bikeType={data?.bikeType}
                  bikeName={data?.bikeName}
                  duration={data?.duration}
                  startsAt={data?.startedAt}
                  endsAt={data?.endsAt}
                  id={data?._id}
                  elapsedTime={data?.timeElapsedBeforeCancel}
                />
              ),
              []
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assemble;
