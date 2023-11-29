import React from 'react';
import { permission_28 } from '../../imagepath';
import TableComponent from '../TableComponent';
import { findLabelText } from '../../commonMethod';

const Teams = ({ informationList }) => {
  const data = [];
  informationList?.length > 0 &&
    informationList?.map(item => {
      if (item?.list_type == 'work_team') {
        data.push(item);
      }
    });
  const columns = [
    {
      title: `${findLabelText('Name', 'Name', 'Hr')}`,
      dataIndex: 'team_name',
    },
    {
      title: `${findLabelText('Primary', 'Primary', 'Hr')}`,
      className: 'text-end',
      dataIndex: 'primary',
    },
  ];
  return (
    <TableComponent
      dataSource={data}
      columns={columns}
      icon={permission_28}
      name={'Team(s)'}
      langName={'Team_s'}
      isAddDisable="yes"
    />
  );
};

export default Teams;
