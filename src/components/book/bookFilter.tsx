import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search, filter_icon, filters } from '../../components/imagepath';
import { findLabelText } from '../commonMethod';
import { postData } from '../../services/apicall';
import { ApiUrl, AssetAmenitiesList } from '../../services/apiurl';
import { BookingContext } from '../context/context';
import AmenitiesPop from './amenitiesPop';

const BookFilter = ({ }) => {
  const { selectedTab, selectedFilter, setSelectedAmenities } =
    useContext(BookingContext);

  const [showFilter, setShowFilter] = useState(false);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [completeAmenitiesList, setCompleteAmenitiesList] = useState([]);

  useEffect(() => {
    getAmenitiesListList();
  }, []);

  useEffect(() => {
    if (selectedTab?.name == 'Workspaces') {
      if (completeAmenitiesList['workspace']?.length > 0) {
        const list = [];
        for (const obj of completeAmenitiesList['workspace']) {
          const preparData = obj;
          preparData['isSelected'] = false;
          list.push(preparData);
        }
        setAmenitiesList(list);
      } else {
        setAmenitiesList([]);
      }
    } else if (selectedTab?.name == 'Rooms') {
      if (completeAmenitiesList['room']?.length > 0) {
        const list = [];
        for (const obj of completeAmenitiesList['room']) {
          const preparData = obj;
          preparData['isSelected'] = false;
          list.push(preparData);
        }
        setAmenitiesList(list);
      } else {
        setAmenitiesList([]);
      }
    } else if (selectedTab?.name == 'Parking') {
      if (completeAmenitiesList['parking']?.length > 0) {
        const list = [];
        for (const obj of completeAmenitiesList['parking']) {
          const preparData = obj;
          preparData['isSelected'] = false;
          list.push(preparData);
        }
        setAmenitiesList(list);
      } else {
        setAmenitiesList([]);
      }
    } else {
      setAmenitiesList([]);
    }
  }, [selectedTab, completeAmenitiesList]);

  const getAmenitiesListList = () => {
    postData(AssetAmenitiesList, {}, (data, res) => {
      if (res?.data?.code == 200) {
        setCompleteAmenitiesList(data)
      } else {
        setAmenitiesList([]);
      }
    });
  };

  return (
    <>
      <li>
        <div className="filter-detail locate-filter-detail">
          <Link
            to="#"
            className="filter-tag"
            onFocus={() => {
              setShowFilter(true);
            }}
          >
            {findLabelText('Filter', 'Filter', 'Book')}
            <img src={filter_icon} alt="img" />
          </Link>
        </div>
      </li>

      {showFilter ? (
        <li>
          <AmenitiesPop
            amenitiesList={amenitiesList}
            selectedTypeName={selectedTab?.floortype_name}
            close={() => setShowFilter(false)}
            showFilter={showFilter}
            selectedFilter={selectedFilter}
            updateFilter={val => {
              setSelectedAmenities([...val]);
              setShowFilter(false);
            }}
          />
        </li>
      ) : null}
    </>
  );
};
export default BookFilter;
