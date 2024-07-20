import { useEffect, useRef, useState } from 'react';
import classes from './CreateBikeModal.module.css';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import { apiURL } from '../../../utils';

const CreateBikeModal = () => {
  const [bikeTypes, setBikeTypes] = useState([]);
  const [duration, setDuration] = useState(50);
  const [selectedBike, setSelecteBike] = useState({});

  const bikeSelectRef = useRef();
  const durationRef = useRef();
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
    // console.log(bikeSelectRef.current.value);
  };
  useEffect(() => {
    fetchBikeTypes();
  }, []);
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className={classes.startAssyBtn}>Start Build</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={classes.dialogOverlay} />
        <Dialog.Content className={classes.dialogContent}>
          <Dialog.Title>Create New Bike</Dialog.Title>
          <Dialog.Description />
          <form onSubmit={formSubmitHandler} className={classes.modalBody}>
            <div className={classes.contentArea}>
              <div className={classes.selectBike}>
                <label htmlFor="">Select Bike Type</label>
                <select
                  onChange={setDurationHandler}
                  ref={bikeSelectRef}
                  name="bikeTypeSelect"
                  id=""
                >
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
                  ref={durationRef}
                  type="number"
                  defaultValue={`${duration || 0}`}
                ></input>
              </div>
            </div>
            <div className={classes.formActions}>
              <Dialog.Close
                className={`${classes.btn} ${classes.modalCloseBtn}`}
              >
                Cancel
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
