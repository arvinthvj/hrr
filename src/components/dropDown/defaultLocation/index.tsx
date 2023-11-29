import * as React from 'react';
import { Link } from 'react-router-dom';

const SearchDefaultLocation: React.FC = ({ options, onChange }) => {
  return (
    <div className="locate-manage locatedropdown locate-absolute">
      {options.length > 0
        ? options.map((opt, index) => {
            // const findFirstName = (name) => {
            //   return name.split("")?.[0].toUpperCase();
            // };
            return (
              <>
                <div key={index} className="locate-managename">
                  <div className="name-groups">
                    {/* <div className="work-name-img">
                    <Link to="#">
                      {opt.profile_photo == undefined ||
                      opt.profile_photo == "" ||
                      opt.profile_photo == null ? (
                        <p
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            color: "blue",
                          }}
                        >
                          {findFirstName(opt.name)}
                        </p>
                      ) : (
                        <img
                          src={`${opt.base_url}${opt.profile_photo}`}
                          alt="icon"
                        />
                      )}
                    </Link>
                  </div> */}
                    <h5>
                      <Link to="#">{opt.name}</Link>
                    </h5>
                  </div>
                  <div className="remove-links">
                    <button
                      onClick={() => {
                        onChange(opt);
                      }}
                      className="remove-link"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </>
            );
          })
        : null}
    </div>
  );
};

export default SearchDefaultLocation;
