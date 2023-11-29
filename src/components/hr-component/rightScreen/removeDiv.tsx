import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { DeleteConfirmationModal } from '../../deleteConfirmationModal/DeleteConfirmationModal';
import { postData } from '../../../services/apicall';
import Toaster from '../../toast';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { useDispatch } from 'react-redux';
import { PersonalContext } from '../personalController';

interface RemoveDivProps {
  name: string;
  payload?: any;
  api?: string;
  list?: any;
  confirmDelete?: CallableFunction;
  setList?: CallableFunction;
  resetData?: any;
  checkIsOpned?: any;
  isPreference?: any;
}

const RemoveDiv: React.FC<RemoveDivProps> = ({
  name,
  payload,
  api,
  list,
  confirmDelete,
  setList,
  resetData,
  checkIsOpned,
}) => {
  const { setEditData } = useContext(PersonalContext);
  const [showDeletePopup, setDeletePopupFlag] = useState(false);
  const dispatch = useDispatch();

  const deleteData = () => {
    dispatch(showLoader());
    postData(api, payload, (data, res) => {
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      }
      setList && setList([]);
      list && list();
      checkIsOpned(false);
      dispatch(hideLoader());
      setEditData([]);
      resetData();
    });
  };
  return (
    <>
      <div className="remove-contact">
        <p>Remove {name}</p>
        <Link to="#" className="btn" onClick={() => setDeletePopupFlag(true)}>
          <i className="far fa-trash-can" />
        </Link>
      </div>

      {showDeletePopup && (
        <DeleteConfirmationModal
          cancel={() => {
            setDeletePopupFlag(false);
          }}
          confirm={() => {
            setDeletePopupFlag(false);
            confirmDelete ? confirmDelete() : deleteData();
          }}
          header={`Delete ${name}`}
          content={`Are you sure you want to delete this ${name}`}
        />
      )}
    </>
  );
};

export default RemoveDiv;
