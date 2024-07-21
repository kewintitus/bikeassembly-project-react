/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import classes from './CreateBikeModal.module.css';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import { apiURL } from '../../../utils';

const CreateBikeModal = ({ inProgressBikeRecords, fetchUserRecords }) => {
  const [bikeTypes, setBikeTypes] = useState([]);
  const [duration, setDuration] = useState(0);
  const [selectedBike, setSelecteBike] = useState({});

  const bikeSelectRef = useRef();
  const durationRef = useRef();

  const [open, setOpen] = useState(false);
  const fetchBikeTypes = async () => {
    const res = await axios.get(`${apiURL}/bikeTypes`, {
      withCredentials: true,
    });
    const resData = res.data.data;
    console.log(res.data.data);
    setBikeTypes(resData);
  };

  const setDurationHandler = () => {
    const selectedBikeValue = bikeSelectRef.current.value;

    const selectedType = bikeTypes.find(
      (data) => data?.bikeType == selectedBikeValue
    );
    console.log('sel', selectedType);
    setSelecteBike(selectedType);
    setDuration(selectedType?.durationMinutes);
    durationRef.current.value = selectedType?.durationMinutes;
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(selectedBike);

    const reqBody = {
      bikeType: selectedBike?.bikeType,
      bikeName: selectedBike?.name,
      duration: selectedBike?.durationMinutes,
    };
    try {
      const res = await axios.post(
        `${apiURL}/bikeRecords`,
        { ...reqBody },
        { withCredentials: true }
      );
      console.log(res);
      setOpen(false);
      fetchUserRecords();
      // setInProgressBikeRecords((prev) => prev.push());
    } catch (error) {
      console.log(error);
    }

    // console.log(bikeSelectRef.current.value);
  };

  useEffect(() => {
    fetchBikeTypes();
  }, []);
  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger asChild>
        <button
          disabled={inProgressBikeRecords && inProgressBikeRecords?.length > 0}
          className={classes.startAssyBtn}
          onClick={() => {
            setOpen(true);
          }}
          title="Note: only one build ata a time"
        >
          Start Build
          {/* <div className="">a</div> */}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={() => {
            setOpen(false);
          }}
          className={classes.dialogOverlay}
        />
        <Dialog.Content className={classes.dialogContent}>
          <Dialog.Title>Create New Bike</Dialog.Title>
          <Dialog.Description />
          <form onSubmit={formSubmitHandler} className={classes.modalBody}>
            <div className={classes.contentArea}>
              <div className={classes.selectBike}>
                <label htmlFor="">Select Bike Type</label>
                <select
                  className={classes.bikeSelect}
                  onChange={setDurationHandler}
                  ref={bikeSelectRef}
                  name="bikeTypeSelect"
                  id=""
                >
                  <option>--Select--</option>
                  {bikeTypes.map((data) => {
                    return (
                      <option key={data?._id} value={data?.bikeType}>
                        {data?.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={classes.durationSelect}>
                <label htmlFor="duration">Duration</label>
                <input
                  className={classes.durationInput}
                  ref={durationRef}
                  type="number"
                  disabled
                  defaultValue={`${duration || 0}`}
                ></input>
              </div>
            </div>
            <div className={classes.formActions}>
              <Dialog.Close
                onClick={() => {
                  setOpen(false);
                }}
                className={`${classes.btn} ${classes.modalCloseBtn}`}
              >
                Close
              </Dialog.Close>
              <button
                className={`${classes.btn} ${classes.submitBtn}`}
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateBikeModal;
