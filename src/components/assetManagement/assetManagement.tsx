import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AssetWokSpaceList } from '../../services/apiurl';
import { postData } from '../../services/apicall';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import { AssetManagementContext } from '../context/context';
import AssetManageTabList from './assetManageTabList';
import AssetListHeader from './assetListHeader';
import AssetListTable from './assetListTable';
import { Card, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';

const AssetManagement = props => {
  const { sideBarWidth } = useSelector((state: any) => state?.app);
  const selector = useSelector((state: any) => state?.assetManagement);
  const dispatch = useDispatch();
  const mainDivRef = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [rightSideBar, setRightSideBar] = useState<any>(''),
    [workList, setWorkList] = useState([]),
    [listDataCopy, setListDataCopy] = useState([]),
    [assetsDetails, setAssetsDetails] = useState([]),
    [assetsMemberCountDetails, setAssetsMemnerCountDetails] = useState(0),
    [statusActive, setActivateStatus] = useState(true),
    [statusInActive, setInActivateStatus] = useState(true),
    [searchSelectText, setSearchSelectText] = useState(''),
    [searchSelectid, setSearchSelectId] = useState('');
  const [totalPage, setTotalPage] = useState(1);
  const [mount, setMount] = useState(false);

  // Fetch APIs List AssetWokSpaceList
  const getResponce = (data, res) => {
    setLoading(false);
    dispatch(hideLoader());
    if (res?.data?.code == 200) {
      setWorkList(data?.workspaceDetails);
      setListDataCopy(data?.workspaceDetails);
      setTotalPage(data?.totalPages);
    }
  };

  const getWokSpaceList = () => {
    setLoading(true);
    dispatch(showLoader());
    const payload = {
      location_id: props?.location_id ? props?.location_id : '', // from location module
      name: searchSelectText,
      workspace_id: searchSelectid,
      limit: 10000,
      floor_plan_type_id: selector?.currenttap,
      count_per_page: 10000,
      sort_by: 'id',
      order_by: 'desc',
    };
    postData(AssetWokSpaceList, payload, getResponce);
  };

  useEffect(() => {
    if (props?.successAddAsset) {
      const list = JSON.parse(JSON.stringify(listDataCopy));
      const checkData = list?.findIndex(
        val => val.workspace_id == props?.successAddAsset.workspace_id,
      );
      if (checkData >= 0) {
        list.splice(checkData, 1, props?.successAddAsset);
      } else {
        list.unshift(props?.successAddAsset);
      }
      setWorkList(list);
      setListDataCopy(list);
    }
  }, [props?.successAddAsset]);

  useEffect(() => {
    setWorkList([]);
    setListDataCopy([]);
    getWokSpaceList();
    () => setMount(false);
  }, [
    searchSelectText,
    mount,
    props?.location_id,
    searchSelectid,
    selector?.currenttap,
    props?.bulkUploadAsset,
  ]);

  // WidthCalcuate
  useEffect(() => {
    widthCalc();
  }, [sideBarWidth, mainDivRef?.current?.offsetWidth]);

  const widthCalc = () => {
    const mainDivWidth = mainDivRef?.current?.offsetWidth;
    setRightSideBar(screen.width - (mainDivWidth + sideBarWidth));
  };

  const filterList = (status, status1, search, type) => {
    const workLocationCopy = JSON.parse(JSON.stringify(listDataCopy));
    let lists = [];
    let listsData = [];
    props?.cancelBulkasset();
    if (status == 0 && status1 == 1) {
      setWorkList([]);
      setAssetsDetails([]);
      setAssetsMemnerCountDetails(0);
    } else {
      lists = workLocationCopy?.filter((ele, i) => {
        return ele?.status == status || ele?.status == status1;
      });
      setWorkList(lists);
      if (type) {
        listsData = lists?.filter((ele: any, i) => {
          return ele?.name
            ?.toLowerCase()
            ?.includes(search?.trim()?.toLowerCase());
        });
        setWorkList(listsData);
      }
    }
  };

  return (
    <>
      <AssetManagementContext.Provider
        value={{
          location_id: props?.location_id,
          openBulkUpload: props?.openBulkUpload,
          count: props?.count,
          addAssetInLocation: props?.addAssetInLocation,
          cancelBulkasset: props?.cancelBulkasset,
          successAddAsset: props?.successAddAsset,
          bulkUploadAsset: props?.bulkUploadAsset,
          filterList,
          statusActive,
          setActivateStatus,
          statusInActive,
          setInActivateStatus,
          workList,
          totalPage,
        }}
      >
        <div className="card book-view-card p-0 book-table-card asset-bar-icon rooms-space-hidden">
          <AssetManageTabList />
          <div className="card-body p-0 pt-0 workspacediv">
            <AssetListHeader />
            <AssetListTable />
          </div>
        </div>
      </AssetManagementContext.Provider>
    </>
  );
};
export default AssetManagement;
