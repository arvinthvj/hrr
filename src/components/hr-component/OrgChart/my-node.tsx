import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './my-node.css';
import { findFirstName } from '../../../assets/globals';
import { GetImgaeFromS3Bucket } from '../../../services/s3Bucket';
import { Link } from 'react-router-dom';
import { PersonalContext } from '../personalController';
import { useDispatch, useSelector } from 'react-redux';
import {
  setInitialFunction,
  setIsOrgChartEdit,
  setOrgChartPersonalTab,
} from '../../../reduxStore/hrSlice';

const propTypes = {
  nodeData: PropTypes.object.isRequired,
};

const MyNode = ({ nodeData }) => {
  const ref = useRef(null);
  const { isSelectedNode, isEdit, orgPermission, isIntialisedNode } =
    useSelector((state: any) => state?.hr);
  const { selectedNodes, setSelectedNodes } = useContext(PersonalContext);
  const { setUserID } = useContext(PersonalContext);
  const dispatch = useDispatch();
  const [arrowCss, setArrowCss] = useState('btn active');
  const [arrowUpCss, setArrowUpCss] = useState('fas fa-chevron-up');

  useEffect(() => {
    if (nodeData?.children?.length > 0) {
      initialTwoLevel();
    }
    if (isSelectedNode) {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isSelectedNode]);

  useEffect(() => {
    if (!isEdit) {
      const css = selectedNodes?.id == nodeData?.id ? 'btn active' : 'btn';
      const upCss =
        selectedNodes?.id == nodeData?.id
          ? 'fas fa-chevron-up'
          : 'fas fa-chevron-down';
      setArrowUpCss(upCss);
      setArrowCss(css);
    }
  }, [selectedNodes]);

  useEffect(() => {
    if (isIntialisedNode) {
      setTimeout(() => {
        initialTwoLevel();
      }, 1);
    }
  }, [isIntialisedNode]);

  useEffect(() => {
    dispatch(setOrgChartPersonalTab(false));
  }, []);

  const initialTwoLevel = () => {
    dispatch(setInitialFunction(false));
    const parentRoot =
      document?.getElementsByClassName('orgchart-container')[0];
    const secLevelChilds =
      parentRoot.childNodes[0].childNodes[0].childNodes[0].childNodes[1];
    const secLevelChildCount = secLevelChilds['children']?.length;
    for (let i = 0; i < secLevelChildCount; i++) {
      if (secLevelChilds.childNodes[i].childNodes[0] != undefined) {
        secLevelChilds.childNodes[i].childNodes[0]['className'] =
          'oc-node isChildrenCollapsed';
      }
      if (secLevelChilds.childNodes[i].childNodes[1] != undefined) {
        secLevelChilds.childNodes[i].childNodes[1]['className'] = 'hidden';
      }
    }
    const edgesClass = document.getElementsByClassName('oc-edge');
    for (let l = 0; l < edgesClass.length; l++) {
      edgesClass[l]['style']['display'] = 'none';
    }
  };

  const handleNameClick = (e: any, user: any) => {
    e.preventDefault();
    e.stopPropagation();
    setUserID(user?.id);
    dispatch(setOrgChartPersonalTab(true));
  };

  const handleEdit = (e: any) => {
    setSelectedNodes(nodeData);
    e.preventDefault();
    e.stopPropagation();
    dispatch(setIsOrgChartEdit(true));
  };

  const handleOpentree = (nodedata: any) => {
    const childNodeParent = document.getElementById(nodedata?.id).parentElement
      .childNodes;
    if (childNodeParent[1]['className'].includes('hidden')) {
      childNodeParent[0]['className'] = 'oc-node';
      childNodeParent[1]['className'] = '';
      const selectedNodeID = childNodeParent[0]['id'];
      const siblingNode =
        childNodeParent[1].parentElement.parentElement.childNodes;
      const siblingLength =
        childNodeParent[1].parentElement.parentElement.childNodes.length;
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

  return (
    <div
      className={
        isSelectedNode && selectedNodes?.id == nodeData?.id
          ? 'hr-chart-box hr-chart-box-selected'
          : 'hr-chart-box'
      }
      ref={ref}
    >
      <div
        className="hr-profile-img hr-profile-img-info"
        onClick={e => handleNameClick(e, nodeData)}
      >
        {nodeData?.profile_image ? (
          <GetImgaeFromS3Bucket
            imageFile={nodeData?.profile_image}
            type={'image'}
            name={findFirstName(nodeData?.name)}
            style="small"
            userDetail={nodeData}
          />
        ) : (
          <p className="user-firstletter">{findFirstName(nodeData?.name)}</p>
        )}
      </div>

      <div className="position">
        <div className="hr-profile">
          <h4 onClick={e => handleNameClick(e, nodeData)}>{nodeData?.name}</h4>
          <h6>{nodeData?.title}</h6>
          {Number(nodeData?.count) !== 0 && (
            <p>{`${nodeData?.count} direct reports`}</p>
          )}
        </div>
      </div>
      {orgPermission == 2 && (
        <div className="org-pencil" onClick={e => handleEdit(e)}>
          <Link to={'#'}>
            <i className="fa-solid fa-pencil"></i>
          </Link>
        </div>
      )}
      {Number(nodeData?.count) !== 0 && (
        <div className="hr-arrow">
          <Link
            to="#"
            className={arrowCss}
            onClick={e => {
              // setSelectedNodes(nodeData);
              e.preventDefault();
              e.stopPropagation();
              handleOpentree(nodeData);
            }}
          >
            <i className={arrowUpCss} />
          </Link>
        </div>
      )}
    </div>
  );
};

MyNode.propTypes = propTypes;

export default MyNode;
