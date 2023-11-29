import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  LocateIcon,
  desk,
  parking1,
  room,
  teamIcon,
} from '../../components/imagepath';
import { findFirstName } from '../../assets/globals';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';

type DropDownOptionsProps = {
  type: 'member' | 'workspace' | 'room' | 'parking' | 'team' | 'any' | 'null';
  options: Array<any> | string;
  onChange: CallableFunction;
  hideAddButton?: boolean;
  parentLocationChangeModel?: boolean;
};

const DropDownOptions: React.FC<DropDownOptionsProps> = ({
  options,
  onChange,
  type,
  hideAddButton,
  parentLocationChangeModel,
}) => {
  //

  return (
    <div className="locate-manage locatedropdown locate-absolute">
      {options && options !== 'error' && options?.length > 0
        ? options?.map((opt, index) => {
            const image =
              type == 'null'
                ? 'null'
                : type == 'member'
                ? opt?.profile_photo
                  ? opt?.profile_photo
                  : ''
                : type == 'workspace'
                ? desk
                : type == 'room'
                ? room
                : type == 'parking'
                ? parking1
                : type == 'team'
                ? teamIcon
                : type == 'any'
                ? opt?.type == 'user'
                  ? opt?.profile_photo
                    ? opt?.profile_photo
                    : ''
                  : opt?.type == 'team'
                  ? teamIcon
                  : opt?.type == 'workspace'
                  ? desk
                  : opt?.type == 'room'
                  ? room
                  : opt?.type == 'parking'
                  ? parking1
                  : opt?.type == 'location'
                  ? LocateIcon
                  : null
                : null;

            const name = opt?.name
              ? opt?.name
              : opt?.team_name
              ? opt?.team_name
              : opt?.full_name
              ? opt?.full_name
              : '';

            const subDetail = opt?.user_team_name
              ? opt?.user_team_name
              : opt?.location_name
              ? opt?.location_name
              : '';

            return (
              <div
                key={index}
                className="locate-managename"
                onClick={() => {
                  onChange(opt);
                }}
              >
                <div className="name-groups">
                  <div className="work-name-img work-name-img-small">
                    <Link
                      to="#"
                      // data-bs-toggle={parentLocationChangeModel ? "modal":""}
                      // data-bs-target={parentLocationChangeModel ? "#parent-confirm-modal":""}
                      data-bs-toggle={parentLocationChangeModel ? 'modal' : ''}
                      data-bs-target={
                        parentLocationChangeModel ? '#parent-confirm-modal' : ''
                      }
                      // onChange={() => {
                      //   onChange(opt);
                      // }}
                    >
                      {image == 'null' ? null : image?.trim() ? (
                        type != 'member' && type != 'any' && type != 'user' ? (
                          <img
                            src={image}
                            alt="icon"
                            style={{ width: '20px' }}
                          />
                        ) : (
                          <GetImgaeFromS3Bucket
                            imageFile={image}
                            type={'image'}
                            userDetail={opt}
                            name={findFirstName(name)}
                            style={'small'}
                          />
                        )
                      ) : (
                        <p className="user-firstletter user-firstletter-small">
                          {findFirstName(name)}
                        </p>
                      )}
                    </Link>
                  </div>
                  <h5>
                    <Link
                      to="#"
                      data-bs-toggle={parentLocationChangeModel ? 'modal' : ''}
                      data-bs-target={
                        parentLocationChangeModel ? '#parent-confirm-modal' : ''
                      }
                      // onClick={() => {
                      //   onChange(opt);
                      // }}
                    >
                      {name}
                    </Link>
                    <Link to="#">{subDetail}</Link>
                  </h5>
                </div>
                <div className="remove-links">
                  <Link
                    data-bs-toggle={parentLocationChangeModel ? 'modal' : ''}
                    data-bs-target={
                      parentLocationChangeModel ? '#parent-confirm-modal' : ''
                    }
                    // onClick={() => {
                    //   onChange(opt);
                    // }}
                    to="#"
                    className="remove-link"
                  >
                    {hideAddButton ? '' : 'Add'}
                  </Link>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default DropDownOptions;
