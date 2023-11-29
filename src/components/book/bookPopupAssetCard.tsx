import React from 'react';
import { PlanTextLabel } from '../planModuleComponent/constants';
import { bookLocation } from '../imagepath';

const BookPopupAssetCard = ({ location, capacity, assetDetails }) => {
  return (
    <div className="booking-location-grid">
      <div className="booking-desk">
        <div className="booking-desk-info">
          <span>
            <img src={bookLocation} alt="img" />
          </span>
          <div className="booking-desk-details">
            <p>{location?.name}</p>
            <p className="word-break">
              {'Capacity'}
              <span className="book-capacity-dot"></span>
              {assetDetails?.capacity}
            </p>
          </div>
        </div>
      </div>
      <div className="booking-desk-description">
        <span>{PlanTextLabel.Description}</span>
        <p>{assetDetails?.description ? assetDetails?.description : '-'}</p>
      </div>
      <div className="booking-desk-list mb-0">
        <ul className="nav">
          {assetDetails?.amenities &&
            assetDetails?.amenities?.map((amenity, index) => (
              <li key={index}>{amenity.name}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default BookPopupAssetCard;
