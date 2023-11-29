import React, { useEffect, useState } from 'react';
import { info } from '../../imagepath';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HCExportingCSV from 'highcharts/modules/export-data.src';
import HCExportingXLS from 'highcharts/modules/export-data.src';
import { Popover } from 'antd';
import { callgooglesheetApi, customXlmethod } from './googlesheet';
import Emailpopup from './emailpopup';
import html2canvas from 'html2canvas';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import downloadjs from 'downloadjs';
import {
  defaultTitle,
  exportFilename,
  exporting_menuitems,
  noDataText,
  singleBarchart,
} from '../constant';
import {
  getGoogleSheetSingleBarChartRowHeader,
  getExcelSheetTitle,
  getExcelSheetKey,
} from '../../commonMethod';

// Initialize exporting and export-data modules
exportingInit(Highcharts);
exportDataInit(Highcharts);
exporting(Highcharts);
HCExportingCSV(Highcharts);
HCExportingXLS(Highcharts);

const SingleBarcahrtComponent = props => {
  const csvLinkRef: any = React.createRef();
  const seriesArray: object[] = [];
  const datas = props?.data?.data == undefined ? [] : props?.data?.data;

  let colors = [];
  try {
    if (singleBarchart.colorCodes[props?.data?.type]) {
      colors = [...singleBarchart.colorCodes[props?.data?.type]];
    }
  } catch (er) {
    console.log(er);
  }

  const chartDivId = `singlebar_chart_div${props?.title}`;
  let graphData = props?.originalData?.data || props?.data?.data;

  const [modalOpen, setModalOpen] = useState(false);
  const [printData, setprintData] = useState(null);
  const [chart, setChart] = useState(null);
  const [csvData, setcsvData] = useState({
    title: '',
    column: [],
    rows: [],
  });

  let _average =
    props?.data?.average == undefined ? '' : `${props?.data?.average}%`;
  let _ratio = props?.data?.ratio == undefined ? '' : props?.data?.ratio;
  let _interval =
    props?.data?.interval == undefined ? '' : props?.data?.interval;
  let _interval_val = props?.data?.value == undefined ? '' : props?.data?.value;

  let _isSubtileAvgValApplicable =
    props?.data?.isSubtileAvgValApplicable == undefined
      ? true
      : props?.data?.isSubtileAvgValApplicable
      ? true
      : false;
  let _isSubtileAvgArrowApplicable =
    props?.data?.isSubtileAvgArrowApplicable == undefined
      ? true
      : props?.data?.isSubtileAvgArrowApplicable
      ? true
      : false;
  let _islegnedAvgValApplicable =
    props?.data?.islegnedAvgValApplicable == undefined
      ? true
      : props?.data?.islegnedAvgValApplicable
      ? true
      : false;
  let _islegnedAvgArrowApplicable =
    props?.data?.islegnedAvgArrowApplicable == undefined
      ? true
      : props?.data?.islegnedAvgArrowApplicable
      ? true
      : false;

  let subtitle = '';
  subtitle = props?.data?.title == undefined ? '' : props?.data?.title;

  if (_isSubtileAvgValApplicable) {
    subtitle += `&nbsp;&nbsp;<span style="color: #0F62AB;">${_interval_val} ${_interval}</span>&nbsp;&nbsp;
    <span style="color:${
      _ratio == 'equal' ? '#323232' : _ratio == 'down' ? '#BA3B46' : '#8DEAC3'
    }">${_average}</span>&nbsp;&nbsp;`;
  }

  if (_isSubtileAvgArrowApplicable) {
    subtitle += `<span style="width: 0;height: 0;border-left: 4px solid transparent;display:inline-block;
    border-right: 4px solid transparent;
    border-bottom: 8px solid ${
      _ratio == 'equal' ? '#323232' : _ratio == 'down' ? '#BA3B46' : '#8DEAC3'
    };
    transform: rotate(${
      _ratio == 'equal' ? '90' : _ratio == 'down' ? '180' : '360'
    }deg);"></span>`;
  }

  const charttitle = (
    <div>
      <p>{props?.title}</p>
    </div>
  );

  datas?.map((obj, index) => {
    if (
      obj.hour == 'Unspecified' ||
      obj.emp_gender == 'Unspecified' ||
      obj.emp_service == 'Unspecified' ||
      obj.emp_status == 'Unspecified' ||
      obj.name == 'Unspecified'
    ) {
      colors[index] = '#ba3b46';
    }

    seriesArray.push({
      name:
        obj.hour ||
        obj.emp_gender ||
        obj.emp_service ||
        obj.emp_status ||
        obj.name,
      data: [obj.count],
    });
  });

  useEffect(() => {
    if (graphData != undefined) {
      const title = props?.title || defaultTitle;
      const titleKey = getExcelSheetTitle(props?.title);
      let rowHeaderKey = getGoogleSheetSingleBarChartRowHeader(title);
      let headerKey = rowHeaderKey[0];
      const rowHeader: any = [
        {
          label: titleKey,
          key: headerKey,
        },
        {
          label: 'Distribution',
          key: 'distribution',
        },
        {
          label: 'Change percentage',
          key: 'change_percentage',
        },
        {
          label: 'Change percentage status',
          key: 'change_percentage_sts',
        },
      ];
      const rowsData = (graphData || []).map(item => {
        let returnResponse = {};
        returnResponse[headerKey] =
          item.hour ||
          item.emp_service ||
          item.emp_status ||
          item.emp_gender ||
          item.name;
        returnResponse = {
          ...returnResponse,
          distribution: item.count,
          ['change_percentage']: item.average,
          ['change_percentage_sts']: item.ratio,
        };
        return returnResponse;
      });
      setcsvData({
        title: title,
        column: rowHeader,
        rows: rowsData,
      });
    }
  }, [graphData]);

  function customCsvmethodcallx() {
    const filenameNew = exportFilename();

    if (csvLinkRef.current) {
      csvLinkRef.current.link.setAttribute('download', filenameNew);
      csvLinkRef.current.link.click();
    }
  }

  function customXlmethodcall() {
    if (graphData?.length > 0) {
      const title = props?.title || defaultTitle;
      const titleKey = getExcelSheetTitle(title);
      const dataIndexKey = getExcelSheetKey(title);
      const rowHeader: any = [
        {
          title: titleKey,
          dataIndex: dataIndexKey,
          key: dataIndexKey,
        },
        {
          title: 'Distribution',
          dataIndex: 'distribution',
          key: 'distribution',
        },
        {
          title: 'Change percentage',
          dataIndex: 'change_percentage',
          key: 'change_percentage',
        },
        {
          title: 'Change percentage status',
          dataIndex: 'change_percentage_sts',
          key: 'change_percentage_sts',
        },
      ];

      const rows = (graphData || []).map(item => {
        let returnResponse = {};
        returnResponse[dataIndexKey] =
          item.hour ||
          item.emp_service ||
          item.emp_status ||
          item.emp_gender ||
          item.name;
        returnResponse = {
          ...returnResponse,
          distribution: item.count,
          ['change_percentage']: item.average,
          ['change_percentage_sts']: item.ratio,
        };
        return returnResponse;
      });

      const output = {
        columns: rowHeader,
        rows: rows,
        title: title,
      };
      customXlmethod(output);
    }
  }

  function googlesheetmethodcall() {
    if (graphData != undefined) {
      const title = props?.title || defaultTitle;
      let rowHeader = getGoogleSheetSingleBarChartRowHeader(title);
      let headerKey = rowHeader[0];
      const rows = (graphData || []).map(item => {
        let returnResponse = {};
        returnResponse[headerKey] =
          item.hour || item.emp_service || item.emp_status || item.emp_gender;
        returnResponse = {
          ...returnResponse,
          Distribution: item.count,
          ['Change percentage']: item.average,
          ['Change percentage status']: item.ratio,
        };
        return returnResponse;
      });

      const output = {
        row_header: rowHeader,
        rows: rows,
        title: title,
      };
      callgooglesheetApi(output);
    }
  }

  const options = {
    credits: {
      enabled: false,
    },
    chart: {
      type: 'bar',
      stacked: true,
      stackType: '100%',
      height: 250,
      marginTop: 75,
      spacingTop: 100,
      toolbar: {
        show: false,
      },
    },
    lang: {
      noData: 'Records Not Found',
    },
    noData: {
      style: {
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#666666',
      },
    },
    plotOptions: {
      column: {
        pointWidth: 35,
        borderWidth: 0,
        borderColor: 'transparent',
      },
      series: {
        borderWidth: 0,
        borderColor: 'transparent',
      },
      bar: {
        horizontal: true,
        borderRadius: 10,
        backgroundBarRadius: 10,
        stacking: 'percent',
        pointWidth: 35,
      },
      grid: {
        visible: false,
      },
    },
    colors: colors,
    stroke: {
      visible: false,
    },
    subtitle: {
      useHTML: subtitle ? true : false,
      y: -20,
      text: subtitle,
      align: 'center',
      style: {
        fontSize: '14px',
        fontWeight: '400',
        fontFamily: 'Avenir',
        color: '#777777',
      },
    },
    title: {
      text: props?.title,
      align: 'left',
      y: -75,
    },
    exporting: {
      allowHTML: true,
      filename: exportFilename(),
      enabled: seriesArray.length == 0 ? false : true,
      buttons: {
        contextButton: {
          menuItems: exporting_menuitems,
          useHTML: true,
          y: -100,
          text: `<span class='menu-dropdown'></span>`,
        },
      },
      menuItemDefinitions: {
        googleSheet: {
          text: 'Download as Google Sheet',
          onclick: function () {
            googlesheetmethodcall();
          },
        },
        downloadCSV: {
          text: 'Download as CSV',
          onclick: function () {
            customCsvmethodcallx();
          },
        },
        downloadPNG: {
          text: 'Download as PNG',
          onclick: function () {
            const input = document.getElementById(chartDivId);

            html2canvas(input, {
              scale: 5,
              ignoreElements: function (el) {
                return el.className == 'menu-dropdown';
              },
            }).then(function (canvas) {
              const imgData = canvas.toDataURL('image/png');
              downloadjs(imgData, exportFilename(), 'image/png');
            });
          },
        },
        downloadPDF: {
          text: 'Download as PDF',
          onclick: function () {
            const input = document.getElementById(chartDivId);
            html2canvas(input, {
              scale: 5,
              ignoreElements: function (el) {
                return el.className == 'menu-dropdown';
              },
            }).then(function (canvas) {
              const imgData = canvas.toDataURL('image/png');
              const pdf = new jsPDF();
              pdf.addImage(imgData, 'PNG', 10, 10, 160, 100, 'NONE');
              pdf.save(`${exportFilename()}`);
            });
          },
        },
        downloadXLS: {
          text: 'Download as Excel sheet',
          onclick: function () {
            customXlmethodcall();
          },
        },
        printChart: { text: 'Print' },
        email: {
          text: 'Email',
          onclick: function () {
            const input = document.getElementById(chartDivId);
            html2canvas(input, {
              scale: 5,
              ignoreElements: function (el) {
                return el.className == 'menu-dropdown';
              },
            }).then(function (canvas) {
              const imgData = canvas.toDataURL('image/png');
              const regex = /data:.*base64,/;
              setprintData(imgData.replace(regex, ''));
            });
            setModalOpen(true);
          },
        },
      },
    },
    xAxis: {
      title: {
        enabled: false,
        text:
          props?.title == 'Utilisation per day' ? 'Hours' : 'Number of Times',
      },
      visible: false, // Hide the x-axis
      gridLineWidth: 0, // Remove the grid lines
    },
    yAxis: {
      reversedStacks: false,
      visible: false, // Hide the y-axis
      lineWidth: 0, // Remove the bottom line
    },
    tooltip: {
      followPointer: true,
      headerFormat: '',
      y: {
        formatter: function (val) {
          return val + 'K';
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      horizontalAlign: 'center',
      offsetX: 40,
      useHTML: true,
      labelFormatter: function () {
        let curObj;
        if (datas != undefined) {
          curObj = datas.find(
            item =>
              (item.hour ||
                item.emp_gender ||
                item.emp_service ||
                item.emp_status ||
                item.name) == this.name,
          );
        }

        let legend = '';
        legend += '<div>' + this.name;

        if (_islegnedAvgValApplicable) {
          legend += `&nbsp;&nbsp;
                    <span style="color:${
                      curObj?.ratio == 'equal'
                        ? '#323232'
                        : curObj?.ratio == 'down'
                        ? '#BA3B46'
                        : '#8DEAC3'
                    }">${curObj?.average}%</span>`;
        }

        if (_islegnedAvgArrowApplicable) {
          legend += `&nbsp;&nbsp;
                      <span style="width: 0;height: 0;border-left: 4px solid transparent;display:inline-block;
                      border-right: 4px solid transparent;
                      border-bottom: 8px solid ${
                        curObj?.ratio == 'equal'
                          ? '#323232'
                          : curObj?.ratio == 'down'
                          ? '#BA3B46'
                          : '#8DEAC3'
                      };
                      transform: rotate(${
                        curObj?.ratio == 'equal'
                          ? '90'
                          : curObj?.ratio == 'down'
                          ? '180'
                          : '360'
                      }deg);"></span>`;
        }
        legend += `</div>`;
        return legend;
      },
    },
    series: seriesArray,
  };

  return (
    <>
      <Emailpopup
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        printData={printData}
        charttitle={props?.title}
        chart={true}
      />
      <div className="card-d-flex">
        <div
          className="card card-shadow card-chart chart-cutom-radius card-header-abs"
          id={chartDivId}
        >
          <div className="report-card-map-header">
            <h3>
              {charttitle}
              <Popover content={charttitle}>
                <img data-html2canvas-ignore={true} src={info} alt="" />
              </Popover>
              <CSVLink
                data={csvData?.rows}
                headers={csvData?.column}
                filename={exportFilename()}
                className="hidden d-none"
                ref={csvLinkRef}
              >
                Download CSV
              </CSVLink>
            </h3>
          </div>
          {seriesArray.length > 0 ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
              callback={chart => setChart(chart)}
            />
          ) : (
            <div className="noDataText">{noDataText}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleBarcahrtComponent;
