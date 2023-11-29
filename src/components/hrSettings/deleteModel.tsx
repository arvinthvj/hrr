import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import { postData } from '../../services/apicall';
import Toaster from '../toast';
import { DeleteConfirmationModal } from '../deleteConfirmationModal/DeleteConfirmationModal';
import { ErrorMessage, Errorcode } from '../../assets/constants/config';

interface DeleteModelProps {
  name: string;
  payload?: any;
  api?: string;
  list?: any;
  listData?: CallableFunction;
  setList?: CallableFunction;
  resetData?: any;
  setIsopened?: any;
}

const DeleteModel: React.FC<DeleteModelProps> = ({
  name,
  api,
  payload,
  setIsopened,
  listData,
}) => {
  const [showDeletePopup, setDeletePopupFlag] = useState(false);
  const dispatch = useDispatch();
  const deleteData = () => {
    dispatch(showLoader());
    postData(api, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
      setIsopened(false);
      listData();
    });
  };
  return (
    <>
      <div className="form-group tab-form-group">
        <div className="remove-profile">
          <div className="remove-text">
            <h6>Remove Profile</h6>
            <p>
              {name} cannot be deleted if it is active and applied to users.
            </p>
          </div>
          <Link to="#" className="btn" onClick={() => setDeletePopupFlag(true)}>
            <i className="far fa-trash-can" />
          </Link>
        </div>
      </div>

      {showDeletePopup && (
        <DeleteConfirmationModal
          cancel={() => {
            setDeletePopupFlag(false);
          }}
          confirm={() => {
            setDeletePopupFlag(false);
            deleteData();
          }}
          header={`Delete ${name}`}
          content={`Are you sure you want to delete this ${name}`}
        />
      )}
    </>
  );
};

export default DeleteModel;
