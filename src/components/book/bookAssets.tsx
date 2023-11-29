import React, { useContext, useEffect, useState } from 'react';
import { assetsList } from '../../assets/constants/config';
import { Link } from 'react-router-dom';
import { book_1, book_2, book_3, book_4, book_5 } from '../imagepath';
import { findLabelText } from '../commonMethod';
import { BookingContext } from '../context/context';
import { Col } from 'antd';

const BookAssets = () => {
  const { selectedTab, setSelectedTab } = useContext(BookingContext);

  const [floorTypes, setFloorTypes] = useState<any>([]);
  // const [selectedTab, setSelectedTab] = useState<any>({});

  useEffect(() => {
    getFloorList();
  }, []);

  const getFloorList = () => {
    if (assetsList?.length > 0) {
      setFloorTypes(assetsList);
      setSelectedTab(assetsList?.[0]);
    } else {
      setFloorTypes([]);
    }
  };

  const validateFlooreImage = type => {
    if (type) {
      for (const obj of floorTypes) {
        if (obj.id == type) {
          return obj.id == 1
            ? book_1
            : obj.id == 2
            ? book_2
            : obj.id == 3
            ? book_3
            : book_4;
        }
      }
    }
  };

  const renderTabList = (opt, index) => {
    return (
      <li key={index} className="nav-item" role="presentation">
        <Link
          className={
            opt.id == selectedTab?.id
              ? 'nav-link active '
              : 'nav-link ' + opt.id == 1
              ? 'book-list-one'
              : opt.id == 2
              ? 'book-list-two'
              : opt.id == 3
              ? 'book-list-three'
              : 'book-list-four'
          }
          to={'#'}
          onClick={() => setSelectedTab(opt)}
        >
          <img src={validateFlooreImage(opt.id)} alt="" />
        </Link>
      </li>
    );
  };

  return (
    <Col lg={24} xl={12} sm={24} md={24} xs={24}>
      <div className="book-left-info">
        <div className="book-tabs">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            {floorTypes?.length > 0
              ? floorTypes.map((opt, index) => {
                  return renderTabList(opt, index);
                })
              : null}

            <li className="nav-item" role="presentation">
              <Link to="#" className="nav-link book-list-five">
                <img src={book_5} alt="" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="book-header">
          <h4>
            {findLabelText(selectedTab?.name, selectedTab?.name, 'Dashboard')}
          </h4>
        </div>
      </div>
    </Col>
  );
};

export default BookAssets;
