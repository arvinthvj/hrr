import React, { useContext } from 'react';
import { DataTable } from '../datatable';
import { PersonalContext } from './personalController';
import { useLocation } from 'react-router-dom';
import { findLabelText } from '../commonMethod';

export interface TableComponentProps {
  dataSource: any;
  columns: any;
  icon: any;
  name: any;
  isAddDisable?: any;
  createRecordFlag?: any;
  isPreference?: any;
  langName?: any;
}

const TableComponent = ({
  dataSource,
  columns,
  icon,
  name,
  isAddDisable,
  createRecordFlag,
  isPreference,
  langName,
}: TableComponentProps) => {
  const location = useLocation();
  const currentURL = location.pathname;
  const { AddComponent } = useContext(PersonalContext);

  return (
    <div
      className={
        'personal-details personal-details-info ' +
        (currentURL == '/hr-settings' && 'personal-table-info') +
        ' ' +
        (dataSource?.length === 0 && 'position-relative')
      }
    >
      <div className="personal-header">
        <h4>
          <img src={icon} alt="" />
          {langName
            ? findLabelText(langName, name, 'Hr')
            : findLabelText(name.replace(/\s+/g, '_'), name, 'Hr')}
        </h4>
      </div>
      <div className="table-responsive">
        <DataTable
          dataSource={dataSource}
          columns={columns}
          className="table personal-table no-data-image"
        />
        {isAddDisable != 'yes' &&
          !isPreference &&
          AddComponent(
            name == 'Manager(s)' ? 'Assign a manager' : name,
            createRecordFlag,
            dataSource?.length,
          )}
      </div>
    </div>
  );
};

export default TableComponent;
