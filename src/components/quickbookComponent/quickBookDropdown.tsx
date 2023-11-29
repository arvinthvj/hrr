import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { assetsList, nonAssetList } from '../../assets/constants/config';
import {
  holiday,
  other_icon,
  out_office,
  parking1,
  remote_home,
  room,
  sickness,
  workspace1,
  in_office,
  client_site
} from '../imagepath';
import {
  QuickBookAssetCardContext,
  QuickBookContext,
  QuickBookTabContext,
} from '../context/context';
import { SetQuickBookSelect } from '../../reduxStore/quickBookSlice';

const QuickBookDropdown = () => {
  const { assetData } = useContext(QuickBookTabContext);
  const { setBookInitial } = useContext(QuickBookContext);
  const { beHalfOfDetails, quickBookSelect } = useSelector(
    (state: any) => state?.quickBook,
  );
  const [dropdownOptions, setDropdownOptions] = useState<any>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const workspaceDropdownRef = useRef<any>(null);

  const dispatch = useDispatch();

  const handleAssetTypeChange = value => {
    dispatch(SetQuickBookSelect(parseInt(value)));
  };
  const getDropdownOptions = data => {
    const assetOptions = assetsList?.map(i => {
      return {
        id: i?.id,
        name: i?.name,
        img: getImage(i?.id),
      };
    });
    const nonAssetOptions = nonAssetList?.map(i => {
      return {
        id: i?.id,
        name: i?.name,
        img: getImage(i?.id),
      };
    });
    setDropdownOptions([...assetOptions, ...nonAssetOptions]);
  };

  const getImage = id => {
    let img;
    switch (id) {
      case 1:
        img = workspace1;
        break;
      case 2:
        img = room;
        break;
      case 3:
        img = parking1;
        break;
      case 4:
        img = remote_home;
        break;
      case 5:
        img = out_office;
        break;
      case 6:
        img = sickness;
        break;
      case 7:
        img = holiday;
        break;
      case 8:
        img = other_icon;
        break;
      case 11:
        img = client_site;
        break;
      case 12:
        img = in_office;
        break;
      default:
        img = workspace1;
        break;
    }
    return img;
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        workspaceDropdownRef?.current &&
        !workspaceDropdownRef?.current?.contains(event?.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    assetData && getDropdownOptions(assetData);
  }, [assetData]);

  return (
    !beHalfOfDetails?.userDetails?.id && (
      <div className="day-info" ref={workspaceDropdownRef}>
        <div className="day-dropdown">
          <Link
            to="#"
            className={
              beHalfOfDetails?.userDetails?.id
                ? 'quickBookDropDownDisable-onbehalf dropdown-toggle'
                : 'dropdown-toggle'
            }
            data-bs-toggle={beHalfOfDetails?.userDetails?.id ? '' : 'collapse'}
            aria-expanded={`${showDropdown ? 'true' : 'false'}`}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img src={getImage(quickBookSelect)} alt="img" />
            {dropdownOptions?.find(i => i?.id == quickBookSelect)?.name}
          </Link>
          <div
            className="dropdown-menu dropdown-menu-end"
            id="workspace-dropdown"
            style={{
              display: `${showDropdown ? 'block' : 'none'}`,
            }}
          >
            {dropdownOptions?.length > 0 &&
              dropdownOptions?.map((item, index) => {
                return (
                  <Link
                    key={index}
                    className="dropdown-item"
                    to="#"
                    onClick={() => {
                      handleAssetTypeChange(item?.id);
                      setShowDropdown(!showDropdown);
                      setBookInitial(0);
                    }}
                  >
                    <img src={item?.img} alt="img" />
                    {item.name}
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    )
  );
};

export default QuickBookDropdown;
