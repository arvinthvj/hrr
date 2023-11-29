import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search, filters } from '../imagepath';
import { PlanTextLabel } from '../planModuleComponent/constants';
import { findLabelText } from '../commonMethod';
type amenities = {
  id: string;
  amenities_id: string;
  name: string;
  type: number;
  isSelected: boolean;
};
type BookFilterProps = {
  showFilter: boolean;
  selectedFilter: Array<string>;
  updateFilter: CallableFunction;
  close: CallableFunction;
  selectedTypeName: string;
  amenitiesList: Array<amenities>;
};
const AmenitiesPop: React.FC<BookFilterProps> = ({
  showFilter,
  selectedFilter,
  updateFilter,
  close,
  selectedTypeName,
  amenitiesList,
}) => {
  const [filterList, setFilterList] = useState<Array<amenities>>(amenitiesList);
  const [selectAll, setSelectAll] = useState(false);
  const [filterNewList, setFilterNewList] =
    useState<Array<amenities>>(amenitiesList);
  const { languages } = useSelector((state: any) => state.language);
  useEffect(() => {
    if (selectedFilter.length > 0) {
      const list = filterList;
      selectedFilter.map((ids: string) => {
        for (let i = 0; i < list.length; i++) {
          if (list[i]?.id == ids) {
            list[i].isSelected = true;
          }
        }
      });
      statusChecking(list);
      setFilterList([...list]);
    } else {
      const list = filterList;
      for (let i = 0; i < list.length; i++) {
        list[i].isSelected = false;
      }
      statusChecking(list);
      setFilterList([...list]);
    }
  }, []);
  const statusChecking = list => {
    const element = list?.every(ele => {
      if (ele?.isSelected == true) {
        return true;
      }
    });
    element ? setSelectAll(true) : setSelectAll(false);
  };
  const filterBySearch = event => {
    const list = [...filterNewList];
    if (event.target.value === '') {
      setFilterList(list);
      return;
    }
    const filteredValues = list?.filter(
      item =>
        item.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !==
        -1,
    );
    setFilterList(filteredValues);
  };
  const updateValues = (opt: amenities, index: number) => {
    const list = filterList;
    list[index].isSelected = !opt.isSelected;
    setFilterList([...list]);
    statusChecking(list);
  };
  const statuschange = (check: any) => {
    let result: any;
    result = filterList?.map(item => ({
      id: item?.id,
      isSelected: check,
      name: item.name,
    }));
    setFilterList([...result]);
    setSelectAll(check);
  };
  return (
    <div className="filter-detail book-filter-detail">
      <div
        className={
          showFilter
            ? 'filter-viewdetails filter-view-details'
            : 'filter-viewdetails filter-view-details d-none'
        }
      >
        <div className="filter-viewdetailshead">
          <div className="row align-items-center">
            <div className="col-lg-5 col-sm-12">
              <div className="filter-heads filter-heads-inner">
                <h2>
                  {findLabelText(
                    PlanTextLabel.Filter,
                    PlanTextLabel.Filter,
                    PlanTextLabel.Locate,
                  )}
                  <img src={filters} alt="img" className="mx-2" />
                  <span>({filterList?.length})</span>
                </h2>
              </div>
            </div>
            <div className="col-lg-7 col-sm-12">
              <div className="filter-search filter-input locate-filter-search filter-search-head">
                <input
                  type="text"
                  placeholder={findLabelText(
                    PlanTextLabel.Search,
                    PlanTextLabel.Search,
                    PlanTextLabel.Locate,
                  )}
                  className="input-filter"
                  onChange={filterBySearch}
                />
                <div className="img-group">
                  <Link to="#">
                    <img src={Search} alt="img" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <div className="filterpaths">
                <div className="filterheader">
                  <div className="checkbox-set">
                    <label className="check">
                      {selectedTypeName}
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={e => {
                          statuschange(e.target.checked);
                        }}
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <Link
                    to=""
                    className="checkbox-set equal-work"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                  ></Link>
                </div>
                <div
                  className="book-filter-scroll filtercontent collapse show"
                  id="collapseOne"
                >
                  <ul className="mt-2">
                    {filterList.length > 0
                      ? filterList.map((opt, index) => {
                          return (
                            <li key={index}>
                              <h4>{opt.name}</h4>
                              <div className="checkbox-set">
                                <label className="check">
                                  <input
                                    onChange={() => {
                                      updateValues(opt, index);
                                    }}
                                    checked={opt?.isSelected}
                                    type="checkbox"
                                  />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="filter-btn-path">
            <Link
              className="btn-cancel"
              to="#"
              onClick={() => {
                close();
              }}
            >
              {findLabelText(
                PlanTextLabel.Cancel,
                PlanTextLabel.Cancel,
                PlanTextLabel.Locate,
              )}
            </Link>
            <Link
              className="btn btn-apply"
              to="#"
              onClick={() => {
                const getSelectedList: Array<string> = [];
                for (const l of filterList) {
                  if (l.isSelected) {
                    getSelectedList.push(l.id);
                  }
                }
                updateFilter(getSelectedList);
              }}
            >
              {findLabelText(
                PlanTextLabel.Apply,
                PlanTextLabel.Apply,
                PlanTextLabel.Locate,
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesPop;
