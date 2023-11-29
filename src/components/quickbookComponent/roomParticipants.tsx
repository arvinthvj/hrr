import React, { useContext, useEffect, useState } from 'react';
import { findLabelText } from '../commonMethod';
import { postData } from '../../services/apicall';
import { ApiUrl } from '../../services/apiurl';
import DropDownOptions from '../dropDown/dropdownOptions';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { closeIconWhiteColor } from '../imagepath';
import { QuickBookContext, QuickBookDayContext } from '../context/context';
import { global } from '../../assets/constants/config';

const RoomParticipants = () => {
  const {
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({});
  const [participantSearch, setParticipantSearch] = useState('');
  const [participantSearchList, setParticipantSearchList] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const { editRoomDetails } = useContext(QuickBookDayContext);
  const { setParticipants, setSubject, participants, subject } =
    useContext(QuickBookContext);
  useEffect(() => {
    participantSearch && getParticipantsList();
  }, [participantSearch]);
  useEffect(() => {
    if (editRoomDetails) {
      const lists = editRoomDetails?.participants
        ? editRoomDetails?.participants
        : [];
      setParticipants(lists);
      setSelectedParticipants(lists);
      setValue('subject', editRoomDetails?.subjects);
      setSubject(editRoomDetails?.subjects);
    } else {
      participants && setSelectedParticipants(participants);
      if (subject) {
        setValue('subject', subject);
        setSubject(subject);
      }
    }
  }, []);
  const getParticipantsList = () => {
    postData(ApiUrl.searchUserName, { name: participantSearch }, successRes => {
      if (successRes?.List?.length > 0) {
        setParticipantSearchList(successRes.List);
      } else {
        setParticipantSearchList([]);
      }
    });
  };
  const removeOptions = index => {
    const removeList = selectedParticipants;
    removeList.splice(index, 1);
    setSelectedParticipants(removeList);
    setParticipantSearch('');
    setParticipantSearchList([]);
  };
  const changeParticipantSearchText = event => {
    setParticipantSearch(event.target.value?.trim());
  };
  return (
    <div className="rooms-form">
      <div className="form-group">
        <input
          onChange={changeParticipantSearchText}
          value={participantSearch}
          type="text"
          className="form-control"
          placeholder={findLabelText(
            'Internal_Participants_optional',
            'Internal Participants (optional)',
            'Dashboard',
          )}
        />
        {participantSearch && participantSearchList.length > 0 ? (
          <DropDownOptions
            type="member"
            options={participantSearchList}
            onChange={opt => {
              const checkData = selectedParticipants.find(
                (val: any) => val.id == opt.id,
              );
              if (checkData == undefined) {
                const newList: any = selectedParticipants;
                newList.push(opt);
                setSelectedParticipants(newList);
                setParticipants(newList);
                setParticipantSearch('');
                setParticipantSearchList([]);
              }
            }}
          />
        ) : null}

        <div className="room-list-box">
          <ul className="nav">
            {selectedParticipants.length > 0
              ? selectedParticipants?.map((opt: any, index) => {
                  return (
                    <li key={index}>
                      <div className="room-delete">
                        <span>{opt?.full_name || opt?.name}</span>
                        <Link
                          to={'#'}
                          className="btn"
                          onClick={() => removeOptions(index)}
                        >
                          <img src={closeIconWhiteColor} alt="img" />
                        </Link>
                      </div>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoomParticipants;
