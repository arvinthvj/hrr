import React, { useContext } from 'react';
import { Search, create_plus } from '../../../components/imagepath';
import { Link } from 'react-router-dom';
import { SearchField } from '../../../components/findComponent/searchField';
import { UserSetting } from '../../../components/context/context';
import { userManageLabel } from '../../../components/userManageComponent/constants';
const UserAction = () => {
  const {
    searchlist,
    setSearchList,
    error,
    setError,
    handleAdd,
    liststatus,
    setListStatus,
  } = useContext(UserSetting);
  return (
    <>
      {' '}
      <div className="card-header">
        <h3 className="card-titles">{userManageLabel.User_Management}</h3>
        <SearchField
          searchTenant={searchlist}
          setSearchTenant={setSearchList}
          error={error}
          setError={setError}
        />
      </div>
      <div className="super-admin-table-create-info">
        <div className="super-admin-table-create-btn create-btn-border">
          <Link
            to="#"
            className={`add-open-link`}
            onClick={() => handleAdd('create')}
          >
            <span>
              <img src={create_plus} alt="img" />
            </span>{' '}
            {userManageLabel.Add_user}
          </Link>
          <div className="super-admin-table-checkbox">
            <label className="super_admin_custom_check d-inline-flex align-items-center">
              <input
                type="checkbox"
                name="active"
                checked={liststatus}
                onChange={() => setListStatus(!liststatus)}
              />
              {userManageLabel.Active_only}
              <span className="super_admin_checkmark" />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserAction;
