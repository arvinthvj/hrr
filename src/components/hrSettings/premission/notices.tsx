import React, { useContext, useState } from 'react';
import { permission_20 } from '../../imagepath';
import { PermissionSection } from './permissionComponents';
import { HRSettingsContext } from '../../context/context';

const notices = [
  { name: 'Notices', description: 'No access', isSelected: '' },
  { name: 'Create notice', description: 'No access', isSelected: '' },
  { name: 'Edit notice', description: 'No access', isSelected: '' },
  { name: 'Remove notice', description: 'No access', isSelected: '' },
];

const Notices = () => {
  const { scrollHeight } = useContext(HRSettingsContext);
  const [noticesList, updateNotices] = useState([...notices]);

  return (
    <div className="tab-pane fade show active">
      <div className="permission-scroll" style={{ maxHeight: scrollHeight }}>
        <PermissionSection
          updatePermission={updateNotices}
          image={permission_20}
          title="Notices"
          list={noticesList}
        />
      </div>
    </div>
  );
};

export default Notices;
