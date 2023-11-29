import React, { useState } from 'react';
import {
  EyeIcon,
  bold_icon,
  copy_icon,
  hide_icon,
  import_icon,
  italic_icon,
  lock_icon,
  pan_icon,
  paste_icon,
  remove_icon,
  select_icon,
  text_icon,
  underline_icon,
  unlock_icon,
  zoom_minus_icon,
  zoom_plus_icon,
} from '../imagepath';
import DropDownSelection from '../selectfield/dropDownSelection';
import { findLabelText } from '../commonMethod';

interface TopToolBarProps {
  shapeFun: CallableFunction | any;
  styleOptions: Object | any;
  textData: object | any;
  setTextData: CallableFunction | any;
  fontOption: object | any;
  drawDrag: any;
  drawCopyClick: any;
  drawCopySpecial: any;
  drawCopy: any;
  drawPaste: any;
  importRef: any;
  canvasGetImage: any;
  drawText: any;
  drawTextStyle: any;
  drawTextBold: any;
  drawTextItalic: any;
  drawTextUnderline: any;
  drawTextSize: any;
}

const TopToolBar: React.FC<TopToolBarProps> = ({
  shapeFun,
  styleOptions,
  textData,
  setTextData,
  fontOption,
  drawDrag,
  drawCopyClick,
  drawCopySpecial,
  drawCopy,
  drawPaste,
  importRef,
  canvasGetImage,
  drawText,
  drawTextStyle,
  drawTextBold,
  drawTextItalic,
  drawTextUnderline,
  drawTextSize,
}) => {
  const [panClick, setPanClick] = useState(false);

  return (
    <div className="floor-plan-info">
      <div className="floor-plan-info-details">
        <div className="floor-details">
          <h4>
            {' '}
            {findLabelText('Navigation', 'Navigation', 'Floorplan_Management')}
          </h4>
          <div className="floor-grid-info">
            <div className="floor-editor-list">
              <ul className="nav">
                <li>
                  <button
                    className={`toolSelection ${
                      panClick == true ? 'active' : ''
                    }`}
                    onClick={() => {
                      setPanClick(!panClick);
                      shapeFun?.panlock();
                    }}
                  >
                    <img src={pan_icon} alt="icon" />
                  </button>
                </li>
                <li>
                  <div className="zoom-btn">
                    <button
                      className="zoom-minus"
                      onClick={() => shapeFun?.scalezoom(-1)}
                    >
                      <img src={zoom_minus_icon} alt="icon" />
                    </button>
                    <button
                      className="zoom-plus"
                      onClick={() => shapeFun?.scalezoom(+1)}
                    >
                      <img src={zoom_plus_icon} alt="icon" />
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="floor-details">
          <h4>
            {findLabelText('Selection', 'Selection', 'Floorplan_Management')}
          </h4>
          <div className="floor-grid-info">
            <div className="floor-editor-list">
              <ul className="nav">
                <li>
                  <button
                    id="draw_drag"
                    className="toolSelection"
                    ref={drawDrag}
                    onClick={() => setPanClick(false)}
                  >
                    <img src={select_icon} alt="icon" />
                  </button>
                </li>
                <li>
                  <button
                    id="draw_copy_click"
                    className="toolSelection"
                    ref={drawCopyClick}
                  >
                    <img src={copy_icon} alt="icon" />
                  </button>
                </li>
                <li className="d-none">
                  <button
                    id="draw_copy_special"
                    className="toolSelection"
                    ref={drawCopySpecial}
                  >
                    <img src={copy_icon} alt="icon" />
                  </button>
                </li>
                <li>
                  <button
                    id="draw_paste"
                    className="toolSelection"
                    ref={drawPaste}
                    style={{
                      display: 'none',
                    }}
                  >
                    <img src={paste_icon} alt="icon" />
                  </button>
                  <button
                    id="draw_copy"
                    className="toolSelection1"
                    ref={drawCopy}
                  >
                    <img src={paste_icon} alt="icon" />
                  </button>
                </li>
                <li>
                  <button id="deleteBtn" className="toolSelection1">
                    <img src={remove_icon} alt="icon" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="floor-details">
          <h4>{findLabelText('Image', 'Image', 'Floorplan_Management')}</h4>
          <div className="floor-grid-info">
            <div className="floor-editor-list">
              <ul className="nav">
                <li>
                  <button className="toolSelection" ref={importRef}>
                    <label htmlFor="canvas_getimage">
                      <img src={import_icon} alt="icon" />
                    </label>
                    <input
                      type="file"
                      id="canvas_getimage"
                      accept="image/*"
                      style={{ display: 'none' }}
                      ref={canvasGetImage}
                    />
                  </button>
                </li>
                <li>
                  <button
                    className="toolSelection"
                    onClick={() => shapeFun?.showcanvasbg()}
                  >
                    <img src={EyeIcon} alt="icon" id="showbgimage" />
                    <img
                      src={hide_icon}
                      alt="icon"
                      id="hidebgimage"
                      style={{ display: 'none' }}
                    />
                  </button>
                </li>
                <li>
                  <button
                    className="toolSelection"
                    id="lockbtn"
                    onClick={() => shapeFun?.bglock()}
                  >
                    <img src={unlock_icon} alt="icon" id="bgunlock" />
                    <img
                      src={lock_icon}
                      alt="icon"
                      id="bglock"
                      style={{ display: 'none' }}
                    />
                  </button>
                </li>
                <li>
                  <p>
                    H{' '}
                    <span>
                      {' '}
                      <input
                        type="number"
                        placeholder="height"
                        id="bg_image_height"
                      />
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    W{' '}
                    <span>
                      <input
                        type="number"
                        placeholder="width"
                        id="bg_image_width"
                      />
                    </span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="floor-details">
          <h4>{findLabelText('Labels', 'Labels', 'Floorplan_Management')}</h4>
          <div className="floor-grid-info">
            <div className="floor-editor-list">
              <ul className="nav">
                <li>
                  <button id="labelShowHide" className="toolSelection">
                    <img src={EyeIcon} alt="icon" id="showLabel" />
                    <img
                      src={hide_icon}
                      alt="icon"
                      id="hideLabel"
                      style={{ display: 'none' }}
                    />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="floor-details">
          <h4>{findLabelText('Text', 'Text', 'Floorplan_Management')}</h4>
          <div className="floor-grid-info">
            <div className="floor-editor-list">
              <ul className="nav">
                <li>
                  <button id="draw_text" ref={drawText}>
                    <img src={text_icon} alt="icon" />
                  </button>
                </li>
                <li>
                  <div className="font-family-select">
                    <DropDownSelection
                      options={styleOptions}
                      minWidth="0px"
                      ref={drawTextStyle}
                      selectedValue={styleOptions[0]}
                      onChange={val => {
                        setTextData({
                          ...textData,
                          style: val,
                        });
                        shapeFun?.settextstyle(val);
                      }}
                    />
                  </div>
                </li>
                <li>
                  <button id="draw_text_bold" ref={drawTextBold}>
                    <img src={bold_icon} alt="icon" />
                  </button>
                </li>
                <li>
                  <button id="draw_text_italic" ref={drawTextItalic}>
                    <img src={italic_icon} alt="icon" />
                  </button>
                </li>
                <li>
                  <button id="draw_text_underline" ref={drawTextUnderline}>
                    <img src={underline_icon} alt="icon" />
                  </button>
                </li>
                <li>
                  <div className="font-size-input">
                    <DropDownSelection
                      options={fontOption}
                      minWidth="20px"
                      ref={drawTextSize}
                      selectedValue={fontOption[4]}
                      onChange={val => {
                        setTextData({
                          ...textData,
                          font: val,
                        });
                        shapeFun?.settextsize(val);
                      }}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopToolBar;
