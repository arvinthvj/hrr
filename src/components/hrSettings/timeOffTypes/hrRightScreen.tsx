import React, { useState } from 'react';
import SettingsHeader from './header';
import SettingsFooter from './footer';
import CreateTimeOffSettings from './createTimeOffSettings';
import { timeOffs } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import SettingsHistoryList from '../historyList';

const HrRightScreen = ({ type, setIsopened, listData, editData }) => {
  const {
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(timeOffs) });
  const [tabChange, setTabChange] = useState('form');
  const [cancel, setCancel] = useState('');
  return (
    <div className="col-xl-3 col-lg-12 d-flex main-space-remove-left">
      <div className="card personal-card flex-fill">
        <SettingsHeader
          type={type}
          setIsopened={setIsopened}
          setTabChange={setTabChange}
          tabChange={tabChange}
        />
        {tabChange == 'form' ? (
          <>
            <CreateTimeOffSettings
              control={control}
              trigger={trigger}
              errors={errors}
              editData={editData}
              setValue={setValue}
              setIsopened={setIsopened}
              listData={listData}
              cancel={cancel}
            />
            <SettingsFooter
              handleSubmit={handleSubmit}
              editData={editData}
              setIsopened={setIsopened}
              listData={listData}
              isDirty={isDirty}
              isValid={isValid}
              setCancel={setCancel}
            />
          </>
        ) : (
          <SettingsHistoryList type="timeoff_types" editData={editData} />
        )}
      </div>
    </div>
  );
};

export default HrRightScreen;
