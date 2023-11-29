import React, { useEffect, useState } from 'react';
import { findLabelText } from '../commonMethod';
import { PlanTextLabel, emailRegex } from '../planModuleComponent/constants';
import { Link } from 'react-router-dom';
import { closeIconWhiteColor } from '../imagepath';

const BookPopupExternalParticipants = ({
  setExParticipantSearch,
  setExternalParticipants,
  setInvalidMail,
  invalidMail,
  editExternalParticipants,
}) => {
  const [memberSearch, setMemberSearch] = useState('');
  const [participants, setParticipants] = useState([]);

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      invalidMail == '' &&
        memberSearch?.trim()?.length > 0 &&
        setParticipants([
          ...participants,
          memberSearch?.split(',').join('').trim(),
        ]);
      setMemberSearch('');
      setInvalidMail('');
    }
  };

  const onChangeParticipants = event => {
    const mail = event?.target?.value;
    setMemberSearch(mail);
  };

  const validateEmails = email => {
    const invalidEmail = !emailRegex.test(email?.split(',').join('').trim());
    if (invalidEmail) {
      setInvalidMail('Please enter valid email.');
      return false;
    } else {
      setInvalidMail('');
      return true;
    }
  };

  const removeOptions = index => {
    const removeList = [...participants];
    removeList.splice(index, 1);
    setParticipants(removeList);
    setMemberSearch('');
  };

  useEffect(() => {
    if (memberSearch?.trim() != '') {
      validateEmails(memberSearch?.trim());
      if (
        invalidMail == '' &&
        memberSearch?.trim() != ',' &&
        memberSearch?.includes(',')
      ) {
        setParticipants([
          ...participants,
          memberSearch?.split(',').join('').trim(),
        ]);
        setMemberSearch('');
        setInvalidMail('');
      }
    } else {
      setInvalidMail('');
    }
    setExParticipantSearch(memberSearch);
  }, [memberSearch]);

  useEffect(() => {
    setExternalParticipants(participants);
  }, [participants?.length]);

  useEffect(() => {
    if (editExternalParticipants) {
      setParticipants(editExternalParticipants?.split(','));
    }
  }, [editExternalParticipants]);

  return (
    <>
      <div className="form-group">
        <input
          onChange={onChangeParticipants}
          onKeyDown={handleKeyDown}
          value={memberSearch}
          type="text"
          className="form-control"
          placeholder={
            findLabelText(
              PlanTextLabel.External_Participants,
              PlanTextLabel.ExternalParticipants,
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
        {invalidMail && (
          <label className="error-message-text-style">{invalidMail}</label>
        )}
      </div>
      {participants?.length > 0 ? (
        <div className="form-group modal-room-delete">
          <ul className="nav">
            {participants?.map((opt: any, index) => {
              return (
                <li key={index}>
                  <div className="room-delete">
                    <span>{opt}</span>
                    <Link
                      to={'#'}
                      className="btn"
                      onClick={() => {
                        removeOptions(index);
                      }}
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

export default BookPopupExternalParticipants;
