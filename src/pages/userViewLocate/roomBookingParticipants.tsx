import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DropDownOptions from '../../components/dropDown/dropdownOptions';
import {
  closeIconWhiteColor,
  google_icon,
  team_icon,
  zoom_icon,
} from '../../components/imagepath';
import Loader from '../../components/loader';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { postData } from '../../services/apicall';
import { ApiUrl } from '../../services/apiurl';
import { findLabelText } from '../../components/commonMethod';
import { DeskLabelText } from '../../components/locateComponent/constants';
import { schema } from './schema';
import BookPopupExternalParticipants from '../../components/book/bookPopupExternalParticipants';

export const RoomBookigParticipants = ({ data, label, goBack, onSubmit }) => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<controlProps>({
    resolver: yupResolver(schema),
  });
  interface LanguageProps {
    language: {
      languages: {
        Team_Management: any;
        Common_Values: any;
        Dashboard: any;
        Location: any;
        Team: any;
        Settings: any;
      };
    };
  }
  interface controlProps {
    subject: string;
    comments: string;
  }
  const [memberSearch, setMemberSearch] = useState('');
  const [memberSearchList, setMemberSearchList] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState(false);
  const [google, setGoogle] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [exParticipantSearch, setExParticipantSearch] = useState('');
  const [externalParticipants, setExternalParticipants] = useState([]);
  const [invalidMail, setInvalidMail] = useState('');
  useEffect(() => {
    if (data?.zoom) {
      setZoom(data.zoom == 1 ? true : false);
    } else {
      setZoom(false);
    }
    if (data?.google) {
      setGoogle(data.google == 1 ? true : false);
    } else {
      setGoogle(false);
    }
    if (data?.teams) {
      setTeams(data.teams == 1 ? true : false);
    } else {
      setTeams(false);
    }

    if (data?.subjects) {
      setValue('subject', data.subjects);
    }
    if (data?.comments) {
      setValue('comments', data.comments);
    }
    if (data?.participant_details && data?.participant_details?.length > 0) {
      const list: any = [];
      for (const obj of data?.participant_details) {
        const prepardata = { ...obj, name: obj.full_name };
        list.push(prepardata);
      }
      setSelectedMembers(list);
    } else {
      setSelectedMembers([]);
    }
  }, []);
  useEffect(() => {
    memberSearch && getManagementList();
  }, [memberSearch]);
  const getManagementList = () => {
    setLoading(true);
    postData(ApiUrl.searchUserName, { name: memberSearch }, successRes => {
      setLoading(false);
      if (successRes?.List?.length > 0) {
        setMemberSearchList(successRes.List);
      } else {
        setMemberSearchList([]);
      }
    });
  };
  const changeMenderSearchText = event => {
    setMemberSearch(event.target.value);
  };
  const onSubmitData = data => {
    if (invalidMail == '' && exParticipantSearch?.trim() != '') {
      externalParticipants?.push(exParticipantSearch);
    }
    const preparData = {
      participants: selectedMembers.map((val: any) => val.id).toString(),
      subjects: data?.subject,
      comments: data?.comments,
      teams: teams === true ? 1 : 0,
      zoom: zoom === true ? 1 : 0,
      google: google === true ? 1 : 0,
      external_participants: externalParticipants?.toString(),
    };
    onSubmit(preparData);
  };
  const removeOptions = index => {
    const removeList = selectedMembers;
    removeList.splice(index, 1);
    setSelectedMembers(removeList);
    setMemberSearch('');
    setMemberSearchList([]);
  };
  return (
    <>
      <div className="card-body">
        <div className="rooms-form">
          <div className="form-group">
            <input
              onChange={changeMenderSearchText}
              value={memberSearch}
              type="text"
              className="form-control"
              placeholder={findLabelText(
                DeskLabelText.Participants,
                DeskLabelText.Participants,
                DeskLabelText.Dashboard,
              )}
            />
            {loading ? (
              <Loader height={'30'} width={'30'} />
            ) : memberSearch && memberSearchList.length > 0 ? (
              <DropDownOptions
                type="member"
                options={memberSearchList}
                onChange={opt => {
                  const checkData = selectedMembers.find(
                    (val: any) => val.id == opt.id,
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
            <div className="room-list-box">
              <ul className="nav">
                {selectedMembers.length > 0
                  ? selectedMembers.map((opt: any, index) => {
                      return (
                        <li key={index}>
                          <div className="room-delete">
                            <span>{opt.full_name || opt.name}</span>
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
          <div className="modal-room-form modal-room-form-info">
            <BookPopupExternalParticipants
              setExParticipantSearch={setExParticipantSearch}
              setExternalParticipants={setExternalParticipants}
              setInvalidMail={setInvalidMail}
              invalidMail={invalidMail}
              editExternalParticipants={data?.external_participants}
            />
          </div>
          <div className="form-group">
            <Controller
              name="subject"
              control={control}
              render={({ field: { value, onChange } }) => (
                <>
                  <input
                    className="form-control"
                    value={value}
                    type="text"
                    placeholder="Subject"
                    onChange={val => {
                      onChange(val);
                      trigger('subject');
                    }}
                  />
                  {errors.subject?.message ? (
                    <label style={{ color: 'red' }}>
                      {errors.subject?.message}
                    </label>
                  ) : null}
                </>
              )}
            />
          </div>
          <div className="comments-form-group form-group">
            <Controller
              name="comments"
              control={control}
              render={({ field: { value, onChange } }) => (
                <>
                  <textarea
                    maxLength={201}
                    onChange={val => {
                      onChange(val);
                      trigger('comments');
                    }}
                    value={value}
                    className="form-control"
                    placeholder={findLabelText(
                      DeskLabelText.Comments,
                      DeskLabelText.Comments,
                      DeskLabelText.Locate,
                    )}
                    defaultValue={''}
                  />
                  {errors?.comments?.message ? (
                    <label className="error-message-text-style">
                      {errors?.comments?.message}
                    </label>
                  ) : null}
                </>
              )}
            />
          </div>
        </div>
        <div className="rooms-box">
          <p>
            <img src={team_icon} alt="icon" />{' '}
            {findLabelText(
              DeskLabelText.Teams,
              DeskLabelText.Teams,
              DeskLabelText.Locate,
            )}
          </p>
          <div className="checkbox-set">
            <label className="check">
              <input
                type="checkbox"
                checked={teams}
                onChange={() => setTeams(!teams)}
              />
              <span className="checkmark" />
            </label>
          </div>
        </div>
        <div className="rooms-box">
          <p>
            <img src={google_icon} alt="icon" />{' '}
            {findLabelText(
              DeskLabelText.Google,
              DeskLabelText.Google,
              DeskLabelText.Locate,
            )}
          </p>
          <div className="checkbox-set">
            <label className="check">
              <input
                type="checkbox"
                checked={google}
                onChange={() => setGoogle(!google)}
              />
              <span className="checkmark" />
            </label>
          </div>
        </div>
        <div className="rooms-box mb-0">
          <p>
            <img src={zoom_icon} alt="icon" />{' '}
            {findLabelText(
              DeskLabelText.Zoom,
              DeskLabelText.Zoom,
              DeskLabelText.Locate,
            )}
          </p>
          <div className="checkbox-set">
            <label className="check">
              <input
                type="checkbox"
                checked={zoom}
                onChange={() => setZoom(!zoom)}
              />
              <span className="checkmark" />
            </label>
          </div>
        </div>
      </div>
      <div className="booking-btns room-avail-btn">
        <button className="btn" onClick={() => goBack(false)}>
          {findLabelText(
            DeskLabelText.Back,
            DeskLabelText.Back,
            DeskLabelText.Dashboard,
          )}
        </button>
        {(data?.asset_color === '#006600' ||
          data?.asset_color === '#F8D49B' ||
          data?.asset_color === '#65A2D9') && (
          <button
            onClick={handleSubmit(onSubmitData)}
            className="btn btn-primary"
          >
            {data?.asset_color !== '#65A2D9'
              ? label
              : findLabelText(
                  DeskLabelText.Save_changes,
                  DeskLabelText.Savechanges,
                  DeskLabelText.Locate,
                )}
          </button>
        )}
      </div>
    </>
  );
};
