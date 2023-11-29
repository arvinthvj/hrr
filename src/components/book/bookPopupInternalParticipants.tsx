import React, { useEffect, useState } from 'react';
import { postData } from '../../services/apicall';
import { ApiUrl } from '../../services/apiurl';
import { findLabelText } from '../commonMethod';
import { PlanTextLabel } from '../planModuleComponent/constants';
import Loader from '../loader';
import DropDownOptions from '../dropDown/dropdownOptions';
import { Link } from 'react-router-dom';
import { closeIconWhiteColor } from '../imagepath';

const BookPopupInternalParticipants = ({
  selectedMembers,
  setSelectedMembers,
}) => {
  const [memberSearch, setMemberSearch] = useState('');
  const [memberSearchList, setMemberSearchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResultText, setNoResultText] = useState('');
  // const [participants, setParticipants] = useState("");

  const getMembersList = () => {
    const nameList = memberSearch?.split(',');
    const name = nameList[nameList?.length - 1]?.trim();
    setLoading(true);
    if (name?.length > 0) {
      postData(ApiUrl.roomInternalParticipants, { name: name }, successRes => {
        setLoading(false);
        if (successRes?.List?.length > 0) {
          setMemberSearchList(successRes.List);
          setNoResultText('');
        } else {
          setMemberSearchList([]);
          setNoResultText(PlanTextLabel.noMatchFound);
        }
      });
    }
  };

  const changeMemberSearchText = event => {
    // setParticipants(event?.target?.value?.trim());
    setMemberSearch(event?.target?.value?.trim());
  };

  const removeOptions = index => {
    const removeList = selectedMembers;
    removeList.splice(index, 1);
    setSelectedMembers(removeList);
    setMemberSearch('');
    setMemberSearchList([]);
  };

  //   useEffect(() => {
  //     let participantList =
  //       selectedMembers?.length > 0 ? selectedMembers?.map((i) => i?.name) : "";
  //     participantList?.length > 0 &&
  //       setParticipants(participantList?.toString() + ",");
  //   }, [selectedMembers?.length]);

  useEffect(() => {
    if (memberSearch?.trim()?.length == 0) {
      setMemberSearchList([]);
      setNoResultText('');
    }
    const debounce = setTimeout(() => {
      memberSearch && getMembersList();
    }, 500);
    return () => clearTimeout(debounce);
  }, [memberSearch]);

  return (
    <>
      <div className="form-group">
        <input
          onChange={changeMemberSearchText}
          value={memberSearch}
          type="text"
          className="form-control"
          placeholder={
            findLabelText(
              PlanTextLabel.Internal_Participants,
              PlanTextLabel.InternalParticipants,
              PlanTextLabel.Dashboard,
            ) +
            ' (' +
            findLabelText(
              PlanTextLabel.optional,
              PlanTextLabel.optional,
              PlanTextLabel.Push_Notifications,
            ) +
            ')'
          }
        />
        {noResultText && (
          <label className="error-message-text-style">{noResultText}</label>
        )}
        {loading ? (
          <Loader height={'30'} width={'30'} />
        ) : memberSearch && memberSearchList?.length > 0 ? (
          <DropDownOptions
            type="member"
            options={memberSearchList}
            onChange={opt => {
              const checkData = selectedMembers?.find(
                (val: any) => val?.id == opt?.id,
              );
              if (checkData == undefined) {
                const newList: any = selectedMembers;
                newList.push(opt);
                setSelectedMembers(newList);
                setMemberSearch('');
                setMemberSearchList([]);
              }
            }}
          />
        ) : null}
      </div>
      {selectedMembers?.length > 0 ? (
        <div className="form-group modal-room-delete">
          <ul className="nav">
            {selectedMembers?.map((opt: any, index) => {
              return (
                <li key={index}>
                  <div className="room-delete">
                    <span>{opt?.name}</span>
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
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default BookPopupInternalParticipants;
