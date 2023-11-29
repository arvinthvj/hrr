import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { test } from './canvas_main';
import { shapes } from './drawshapes';
import { polygonJS } from './polygon-editor';
import { postData } from '../../services/apicall';
import { setFloorEditDetail, setFloorType } from '../../reduxStore/appSlice';
import { floorReform } from '../../services/apiurl';
import { adminLocation } from '../../assets/constants/pageurl';
import FloorPlanHeader from '../../components/floorPlan/floorPlanHeader';
import TopToolBar from '../../components/floorPlan/topToolBar';
import CanvasDivision from '../../components/floorPlan/canvasDivision';
import { FloorTab } from '../../components/floorPlan/floorTab';
import { Card, Col, Row } from 'antd';

const FloorDetails = props => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Toolbar refs
  const drawDrag = useRef<any>();
  const drawCopyClick = useRef<any>();
  const drawCopySpecial = useRef<any>();
  const drawCopy = useRef<any>();
  const drawPaste = useRef<any>();
  const importRef = useRef<any>();
  const canvasGetImage = useRef<any>();
  const drawText = useRef<any>();
  const drawTextStyle = useRef();
  const drawTextBold = useRef<any>();
  const drawTextItalic = useRef<any>();
  const drawTextUnderline = useRef<any>();
  const drawTextSize = useRef<any>();
  // Canvas refs
  const canvasDiv = useRef<any>();
  const canvasImg = useRef<any>();
  const lshapewallImg = useRef<any>();
  const cshapewallImg = useRef<any>(null);
  const singledeskImg = useRef<any>();
  const singledeskSelect = useRef<any>();
  const singledeskWithoutText = useRef<any>();
  const shape2Img = useRef<any>();
  const shape2Select = useRef<any>();
  const shape3Img = useRef<any>();
  const shape3Select = useRef<any>();
  const shape4Img = useRef<any>();
  const shape4Select = useRef<any>();
  const shape5Img = useRef<any>();
  const shape5Select = useRef<any>();
  const shape5WithoutText = useRef<any>();
  const squareRoom = useRef<any>();
  const singleDeskDragImg = useRef<any>();
  const textDragImg = useRef<any>();
  const squareDragImg = useRef<any>();
  const parkingImg = useRef<any>();
  const parkingImgSelect = useRef<any>();
  const parkingImgWhite = useRef<any>();
  const regularL = useRef<any>();
  const regularLSelect = useRef<any>();
  const roomImg = useRef<any>();
  const roomImgSelect = useRef<any>();
  const roomSImgwhite = useRef<any>();
  const roomXXS = useRef<any>();
  const roomXXSSelect = useRef<any>();
  const roomXXSWhite = useRef<any>();
  const roomXS = useRef<any>();
  const roomXSSelect = useRef<any>();
  const roomXSWhite = useRef<any>();
  const roomM = useRef<any>();
  const roomMSelect = useRef<any>();
  const roomMWhite = useRef<any>();
  const roomL = useRef<any>();
  const roomLSelect = useRef<any>();
  const roomLWhite = useRef<any>();
  const roomXL = useRef<any>();
  const roomXLSelect = useRef<any>();
  const roomXLWhite = useRef<any>();
  const stairsImg = useRef<any>();
  const doorwayImg = useRef<any>();
  const liftImg = useRef<any>();
  const windowImg = useRef<any>();
  const oneWayRImg = useRef<any>();
  const oneWayLImg = useRef<any>();
  const twoWayImg = useRef<any>();
  const twoWay90Img = useRef<any>();
  const canvasTextDiv = useRef<any>();
  const canvasText = useRef<any>();
  const canvasRef = useRef<any>();
  // state
  let floorDetail = '';
  const [canvasFun, setCanvasFun] = useState({});
  const [shapeFun, setShapeFun] = useState<any>({});
  const [floorReff, setFloorReff] = useState('');
  const [polyFun, setPolyFun] = useState({});
  const [refs, setRefs] = useState<any>('');
  const [reform, setReform] = useState<any>({});
  const [isShowFloorTab, setShowFloorTab] = useState(false);
  const [unplacedCount, setUnplacedCount] = useState(false);
  const [afterSave, setAfterSave] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [floorDetails, setFloorDetails] = useState<any>({});
  const [textData, setTextData] = useState({ font: {}, style: {} });
  const [publish, setPublish] = useState(0);
  const { floorType, floorEditDetail } = useSelector((state: any) => state.app);

  const styleOptions = [
    { id: 1, label: 'Montserrat', value: 'Montserrat' },
    { id: 2, label: 'Avenir', value: 'Avenir' },
    { id: 1, label: 'Poppins', value: 'Poppins' },
    { id: 2, label: 'Roboto', value: 'Roboto' },
    { id: 1, label: 'Barlow', value: 'Barlow' },
  ];

  const fontOption = [
    { id: 1, label: '8pt', value: 8 },
    { id: 2, label: '10pt', value: 10 },
    { id: 3, label: '12pt', value: 12 },
    { id: 4, label: '14pt', value: 14 },
    { id: 5, label: '16pt', value: 16 },
    { id: 6, label: '20pt', value: 20 },
    { id: 7, label: '24pt', value: 24 },
    { id: 8, label: '32pt', value: 32 },
  ];

  useEffect(() => {
    setRefs({
      cshapewallImg: cshapewallImg.current,
      lshapewallImg: lshapewallImg.current,
      canvasText: canvasText.current,
      canvasImg: canvasImg.current,
      singledeskImg: singledeskImg.current,
      singledeskSelect: singledeskSelect.current,
      singledeskWithoutText: singledeskWithoutText.current,
      shape2Img: shape2Img.current,
      shape2Select: shape2Select.current,
      shape3Img: shape3Img.current,
      shape3Select: shape3Select.current,
      shape4Img: shape4Img.current,
      shape4Select: shape4Select.current,
      shape5Img: shape5Img.current,
      shape5Select: shape5Select.current,
      shape5WithoutText: shape5WithoutText.current,
      canvasRef: canvasRef.current,
      singleDeskDragImg: singleDeskDragImg.current,
      drawText: drawText.current,
      textDragImg: textDragImg.current,
      drawTextSize: drawTextSize.current,
      drawTextBold: drawTextBold.current,
      drawTextItalic: drawTextItalic.current,
      drawTextUnderline: drawTextUnderline.current,
      drawTextStyle: drawTextStyle.current,
      canvasTextDiv: canvasTextDiv.current,
      drawCopyClick: drawCopyClick.current,
      drawCopySpecial: drawCopySpecial.current,
      drawCopy: drawCopy.current,
      drawDrag: drawDrag.current,
      drawPaste: drawPaste.current,
      importRef: importRef.current,
      squareDragImg: squareDragImg.current,
      parkingImgSelect: parkingImgSelect.current,
      parkingImg: parkingImg.current,
      parkingImgWhite: parkingImgWhite.current,
      roomImg: roomImg.current,
      roomImgSelect: roomImgSelect.current,
      roomSImgwhite: roomSImgwhite.current,
      roomXXS: roomXXS.current,
      roomXXSSelect: roomXXSSelect.current,
      roomXXSWhite: roomXXSWhite.current,
      roomXS: roomXS.current,
      roomXSSelect: roomXSSelect.current,
      roomXSWhite: roomXSWhite.current,
      roomM: roomM.current,
      roomMSelect: roomMSelect.current,
      roomMWhite: roomMWhite.current,
      roomL: roomL.current,
      roomLSelect: roomLSelect.current,
      roomLWhite: roomLWhite.current,
      roomXL: roomXL.current,
      roomXLSelect: roomXLSelect.current,
      roomXLWhite: roomXLWhite.current,
      squareRoom: squareRoom.current,
      doorwayImg: doorwayImg.current,
      stairsImg: stairsImg.current,
      liftImg: liftImg.current,
      windowImg: windowImg.current,
      oneWayRImg: oneWayRImg.current,
      oneWayLImg: oneWayLImg.current,
      twoWayImg: twoWayImg.current,
      twoWay90Img: twoWay90Img.current,
      regularL: regularL.current,
      regularLSelect: regularLSelect.current,
      canvasDiv: canvasDiv.current,
      canvasGetImage: canvasGetImage.current,
      floorReff: floorReff || {},
    });
    dispatch(setFloorType('1')); // default floortype to be 1 to get asset count
    setTextData({
      font: fontOption[0],
      style: styleOptions[0],
    });
  }, [canvasRef.current, floorReff]);

  useEffect(() => {
    const mainRef = {
      canvasDiv: canvasDiv.current,
      canvasGetImage: canvasGetImage.current,
    };
    setCanvasFun(test(canvasRef.current, mainRef));
    setPolyFun(polygonJS(canvasRef.current));
    if (location?.state?.floorDetails) {
      floorDetail = location.state.floorDetails;
      setFloorDetails(floorDetail);
      dispatch(setFloorEditDetail(floorDetail));
    } else if (Object.keys(floorEditDetail).length > 0) {
      setFloorDetails(floorEditDetail);
    } else navigate(adminLocation);
    if (
      (location?.state?.floorDetails &&
        location?.state?.floorDetails?.floorplan_id) ||
      location?.state?.floorDetails?.location_id
    ) {
      setLoading(true);
      const reqData = {
        floorplan_id: location?.state?.floorDetails?.floorplan_id
          ? location?.state?.floorDetails?.floorplan_id
          : ' ',
        location_id: location?.state?.floorDetails?.location_id,
      };
      postData(floorReform, reqData, (data, res) => {
        setReform(data);
        setShowFloorTab(true);
        setLoading(false);
      });
    }
  }, [canvasRef.current]);

  useEffect(() => {
    if (refs['floorReff'] && Object.keys(refs.floorReff).length > 0) {
      setShapeFun(shapes(refs, reform, unplacedCount));
      setLoading(false);
    }
    if (
      Object.keys(floorDetails).length > 0 &&
      floorDetails?.floorplan_id &&
      reform == ''
    )
      setLoading(true);
    else setLoading(false);
  }, [floorReff, polyFun, refs, reform, unplacedCount]);

  useEffect(() => {
    if (Object.keys(shapeFun).length > 0 && floorType) {
      shapeFun?.setFloorTypeFun(floorType);
    }
  }, [floorType, shapeFun, unplacedCount]);

  const [menu] = useState(false);

  return (
    <>
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <>
          <div className="page-wrapper">
            <div className="content">
              <Row>
                <Col span={18} className=" d-flex space-remove-right">
                  <div className="card floor-card w-100">
                    <FloorPlanHeader
                      floorDetails={floorDetails}
                      afterSave={afterSave}
                      setPublish={setPublish}
                    />
                    <div className="card-body floor-card-body">
                      <TopToolBar
                        shapeFun={shapeFun}
                        styleOptions={styleOptions}
                        setTextData={setTextData}
                        textData={textData}
                        fontOption={fontOption}
                        drawDrag={drawDrag}
                        drawCopyClick={drawCopyClick}
                        drawCopySpecial={drawCopySpecial}
                        drawCopy={drawCopy}
                        drawPaste={drawPaste}
                        importRef={importRef}
                        canvasGetImage={canvasGetImage}
                        drawText={drawText}
                        drawTextStyle={drawTextStyle}
                        drawTextBold={drawTextBold}
                        drawTextItalic={drawTextItalic}
                        drawTextUnderline={drawTextUnderline}
                        drawTextSize={drawTextSize}
                      />
                      <CanvasDivision
                        loading={loading}
                        canvasDiv={canvasDiv}
                        canvasImg={canvasImg}
                        lshapewallImg={lshapewallImg}
                        cshapewallImg={cshapewallImg}
                        singledeskImg={singledeskImg}
                        singledeskSelect={singledeskSelect}
                        singledeskWithoutText={singledeskWithoutText}
                        shape2Img={shape2Img}
                        shape2Select={shape2Select}
                        shape3Img={shape3Img}
                        shape3Select={shape3Select}
                        shape4Img={shape4Img}
                        shape4Select={shape4Select}
                        shape5Img={shape5Img}
                        shape5Select={shape5Select}
                        shape5WithoutText={shape5WithoutText}
                        squareRoom={squareRoom}
                        singleDeskDragImg={singleDeskDragImg}
                        textDragImg={textDragImg}
                        squareDragImg={squareDragImg}
                        parkingImg={parkingImg}
                        parkingImgSelect={parkingImgSelect}
                        parkingImgWhite={parkingImgWhite}
                        regularL={regularL}
                        regularLSelect={regularLSelect}
                        roomImg={roomImg}
                        roomImgSelect={roomImgSelect}
                        roomSImgwhite={roomSImgwhite}
                        roomXXS={roomXXS}
                        roomXXSSelect={roomXXSSelect}
                        roomXXSWhite={roomXXSWhite}
                        roomXS={roomXS}
                        roomXSSelect={roomXSSelect}
                        roomXSWhite={roomXSWhite}
                        roomM={roomM}
                        roomMSelect={roomMSelect}
                        roomMWhite={roomMWhite}
                        roomL={roomL}
                        roomLSelect={roomLSelect}
                        roomLWhite={roomLWhite}
                        roomXL={roomXL}
                        roomXLSelect={roomXLSelect}
                        roomXLWhite={roomXLWhite}
                        doorwayImg={doorwayImg}
                        windowImg={windowImg}
                        liftImg={liftImg}
                        stairsImg={stairsImg}
                        oneWayRImg={oneWayRImg}
                        oneWayLImg={oneWayLImg}
                        twoWayImg={twoWayImg}
                        twoWay90Img={twoWay90Img}
                        canvasTextDiv={canvasTextDiv}
                        canvasText={canvasText}
                        canvasRef={canvasRef}
                      />
                    </div>
                  </div>
                </Col>
                <Col span={6} className="d-flex main-space-remove-left">
                  {shapeFun && isShowFloorTab && (
                    <FloorTab
                      {...props}
                      setFloorReff={setFloorReff}
                      shapeFun={shapeFun || {}}
                      floorData={floorDetails ? floorDetails : ''}
                      setUnplacedCount={setUnplacedCount}
                      unplacedCount={unplacedCount}
                      setAfterSave={setAfterSave}
                      setLoading={setLoading}
                      publish={publish}
                      reformData={reform?.reform_details}
                    />
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default FloorDetails;
