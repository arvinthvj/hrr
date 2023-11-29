import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Toaster from '../../../components/toast';
import { postData } from '../../../services/apicall';
import { userManagementTeamList } from '../../../services/apiurl';
import BulkTeamNext from './bulkteamnext';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { findLabelText } from '../../../components/commonMethod';

function BulkTeam({ setTeamSelect, finalbulkuserlist }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: any) => state.app);

  const [nextScreen, setNextScreen] = useState(false),
    [teamlist, setTeamList] = useState([]),
    [checkList, setcheckList] = useState<any>([]),
    [finalteamdata, setFinalTeamData] = useState([]);

  const handleBack = () => {
    setTeamSelect(true);
  };

  const postFilter = items =>
    items?.filter(e => {
      return checkList?.find(i => {
        return e.id === i;
      });
    });

  const handleNext = () => {
    if (checkList.length <= 0) {
      Toaster('400', 'Team selection is required');
      return false;
    }
    setNextScreen(true);
    setFinalTeamData(postFilter(teamlist));
  };

  const handleChange = ids => {
    if (!checkList.includes(ids)) {
      setcheckList([...checkList, ids]);
    } else {
      const inx = checkList.indexOf(ids);
      const list = checkList.splice(inx, 1);
      setcheckList([...checkList]);
    }
  };

  const handleDeselect = () => {
    setcheckList([]);
  };

  const getTeamList = data => {
    setTeamList(data?.List);
    dispatch(hideLoader());
  };
  const getTeam = () => {
    dispatch(showLoader());
    postData(userManagementTeamList, '', getTeamList);
  };

  useEffect(() => {
    getTeam();
  }, []);

  return (
    <>
      {nextScreen === false ? (
        <div className="card-body p-0">
          <div className="locations-team-header">
            <div className="selectset-path">
              <h4>
                <span>({checkList.length})</span>{' '}
                {findLabelText('Selected', 'Selected', 'User_Management')}
              </h4>
              <Link to="#" onClick={handleDeselect}>
                {findLabelText('Deselect', 'Deselect', 'User_Management')}
              </Link>
            </div>
            <div className="select-path-title">
              <h4>
                {findLabelText('Add_to_team', 'Add to team', 'User_Management')}
              </h4>
            </div>
            <div className="location-btn-head location-team-btn">
              <Link to="#" className="btn btn-primary" onClick={handleNext}>
                {findLabelText('Continue', 'Continue', 'Locate')}
              </Link>
              <Link to="#" className="btn link-cancels" onClick={handleBack}>
                {findLabelText('Cancel', 'Cancel', 'User_Management')}
              </Link>
            </div>
          </div>
          <div className="location-team-inner user-scroll-inner">
            <div className="locate-setscheck">
              <ul>
                {teamlist?.map((value: any, index) => {
                  return (
                    <li key={index}>
                      <h4>{value.name}</h4>
                      <div className="checkbox-set">
                        <label className="check">
                          <input
                            type="checkbox"
                            checked={checkList.includes(value.id)}
                            onChange={() => handleChange(value.id)}
                          />
                          <span className="checkmark" />
                        </label>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <BulkTeamNext
          finalteamdata={finalteamdata}
          finalbulkuserlist={finalbulkuserlist}
          setNextScreen={setNextScreen}
          handleBack={handleBack}
        />
      )}
    </>
  );
}

export default BulkTeam;
