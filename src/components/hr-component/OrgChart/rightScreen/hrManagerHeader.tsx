import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { setHrJObs } from '../../../../reduxStore/hrSlice';
import { useDispatch, useSelector } from 'react-redux';
import { PersonalContext } from '../../personalController';

interface RightScreenHeaderProps {
  checkIsOpned: CallableFunction;
  setSelectedTab: CallableFunction;
}

const HrManagerHeader: React.FC<RightScreenHeaderProps> = ({
  checkIsOpned,
  setSelectedTab,
}) => {
  const dispatch = useDispatch();
  const { selectedNodes } = useContext(PersonalContext);
  const { orgChatRootNode } = useSelector((state: any) => state?.hr);
  const title =
    selectedNodes?.id == orgChatRootNode ? 'Edit Head of org' : 'Edit';

  return (
    <div className="card-header">
      <div className="personal-tab-heading org-chart-heading">
        <h4>
          <Link
            to="#"
            onClick={() => {
              checkIsOpned(false);
              setSelectedTab('directory');
              dispatch(setHrJObs(false));
            }}
          >
            <i className="fas fa-chevron-left" />
          </Link>
          {title}
        </h4>
      </div>
    </div>
  );
};

export default HrManagerHeader;
