import React, { useContext, useEffect, useRef, useState } from 'react';
import OrganizationChart from '@dabeng/react-orgchart';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { postData } from '../../../services/apicall';
import { getOrgChartView, orgChartView } from '../../../services/apiurl';
import MyNode from './my-node';
import {
  setHrJObs,
  setHrUserId,
  setInitialFunction,
  setIsOrgChartEdit,
  setNodeSelect,
  setOrgChartPermissions,
  setOrgChartPersonalTab,
  setOrgChatRootNode,
  setUpdateOrgChart,
  setUserAssigneeData,
} from '../../../reduxStore/hrSlice';
import { PersonalContext } from '../personalController';

const Chart = () => {
  const { setSelectedNodes, selectedNodes, userID, scrollHeightWithOutFooter } =
    useContext(PersonalContext);
  const orgchart = useRef();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const {
    isUpdateOrgChart,
    isSelectedNode,
    orgChatRootNode,
    isEdit,
  } = useSelector((state: any) => state?.hr);
  const { userDetails } = useSelector((state: any) => state?.app);
  let zoomScale = 1;

  useEffect(() => {
    resetAllData();
    getOrgChart(userID);
  }, []);

  useEffect(() => {
    if (isUpdateOrgChart) {
      dispatch(setNodeSelect(false));
      getOrgChart(orgChatRootNode);
    }
  }, [isUpdateOrgChart]);

  useEffect(() => {
    if (isEdit) {
      getOrgChartViewData(selectedNodes?.id || 0);
    }
  }, [isEdit]);

  useEffect(() => {
    if (isSelectedNode) {
      getOrgChart(selectedNodes?.id);
    }
  }, [isSelectedNode]);

  const zoomUpdateFun = zoomScale => {
    const orgChart = document.getElementsByClassName('orgchart')[0];
    orgChart['transformOrigin'] = [0, 0];

    const zoomScaleVal = 'scale(' + zoomScale + ')';
    const browserComp = ['webkit', 'moz', 'ms', 'o'];
    const oString = 0 * 100 + '% ' + 0 * 100 + '%';
    for (let i = 0; i < browserComp.length; i++) {
      orgChart['style'][browserComp[i] + 'Transform'] = zoomScaleVal;
      orgChart['style'][browserComp[i] + 'TransformOrigin'] = oString;
    }
    orgChart['style']['transform'] = zoomScaleVal;
    orgChart['style']['transformOrigin'] = oString;
  };

  const resetAllData = () => {
    dispatch(setOrgChatRootNode(userDetails?.id));
    dispatch(setHrUserId(0));
    dispatch(setHrJObs(false));
    dispatch(setNodeSelect(false));
    dispatch(setUserAssigneeData({}));
    dispatch(setOrgChartPersonalTab(false));
    dispatch(setIsOrgChartEdit(false));
  };

  const getOrgChart = (id: number) => {
    const payload = {
      user_id: userID,
    };
    if (isSelectedNode) payload['find_user_id'] = id;
    dispatch(showLoader());
    postData(getOrgChartView, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        if (data?.user_type == 'Root Admin') {
          dispatch(setOrgChatRootNode(data?.id));
        }
        setData(data);
        dispatch(setUpdateOrgChart(false));
        dispatch(setNodeSelect(false));
        dispatch(hideLoader());
        dispatch(setOrgChartPermissions(data?.permission || 0));
      }
    });
  };

  const readSelectedNode = nodeData => {
    setTimeout(() => {
      dispatch(setNodeSelect(false));
      setSelectedNodes(nodeData);
      handleOpentree2(nodeData);
    }, 1);
  };

  const handleOpentree2 = (nodedata: any) => {
    const childNodeParent = document.getElementById(nodedata?.id).parentElement
      .childNodes;
    if (childNodeParent[1]['className'].includes('hidden')) {
      console.log('line 116');
      childNodeParent[0]['className'] = 'oc-node';
      childNodeParent[1]['className'] = '';
      const selectedNodeID = childNodeParent?.[0]?.['id'];
      const siblingNode =
        childNodeParent?.[1].parentElement?.parentElement?.childNodes;
      const siblingLength =
        childNodeParent?.[1]?.parentElement?.parentElement?.childNodes?.length;
      for (let k = 0; k < siblingLength; k++) {
        if (siblingNode[k].childNodes[0]['id'] == selectedNodeID) {
        } else {
          siblingNode[k].childNodes[0]['className'] =
            'oc-node isChildrenCollapsed';
          if (siblingNode[k].childNodes[1] != undefined) {
            siblingNode[k].childNodes[1]['className'] = 'hidden';
          }
        }
      }
      for (let j = 0; j < childNodeParent[1]['children'].length; j++) {
        if (childNodeParent[1].childNodes[j].childNodes[1] == undefined) {
        } else {
          childNodeParent[1].childNodes[j].childNodes[0]['className'] =
            'oc-node isChildrenCollapsed';
          childNodeParent[1].childNodes[j].childNodes[1]['className'] =
            'hidden';
        }
      }
    } else {
      childNodeParent[0]['className'] = 'oc-node isChildrenCollapsed';
      childNodeParent[1]['className'] = 'hidden';
      setSelectedNodes(new Set());
    }
  };

  const getOrgChartViewData = id => {
    const payload = {
      user_id: id,
    };
    dispatch(showLoader());
    dispatch(setHrUserId(Number(id)));
    postData(orgChartView, payload, (data, res) => {
      dispatch(hideLoader());
      dispatch(setHrJObs(true));
      dispatch(setIsOrgChartEdit(false));
      if (res?.data?.code == 200) {
        dispatch(setUserAssigneeData(data));
      }
    });
  };

  return (
    <>
      <div className="hr-chart-btns">
        <button
          type="button"
          className="btn btn-plus"
          style={{ zIndex: 999, top: '0px' }}
          onClick={() => {
            if (zoomScale > 2.5) {
              zoomScale = zoomScale;
            } else {
              zoomScale = zoomScale + 0.5;
            }
            zoomUpdateFun(zoomScale);
          }}
        >
          <i className="fas fa-plus"></i>
        </button>
        <button
          type="button"
          className="btn btn-minus"
          style={{ zIndex: 999, top: '0px' }}
          onClick={() => {
            if (zoomScale <= 0.5) {
              zoomScale = zoomScale;
            } else {
              zoomScale = zoomScale - 0.5;
            }
            zoomUpdateFun(zoomScale);
          }}
        >
          <i className="fas fa-minus"></i>
        </button>
      </div>
      {Object.keys(data).length > 0 && (
        <OrganizationChart
          ref={orgchart}
          datasource={data}
          chartClass="myChart"
          style={{ height: scrollHeightWithOutFooter }}
          NodeTemplate={MyNode}
          onClickNode={readSelectedNode.bind(this)}
          pan={true}
        />
      )}
    </>
  );
};

export default Chart;
