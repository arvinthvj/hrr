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
import { jsPDF } from 'jspdf';
import downloadjs from 'downloadjs';
import {
  excelSheetColumTitle,
  getGoogleSheetSingleBarChartRowHeader,
} from '../../commonMethod';
import { CSVLink } from 'react-csv';
import {
  REPORTING_CHART_TITLE,
  daysofweek,
  defaultTitle,
  exportFilename,
  exporting_menuitems,
  noDataText,
} from '../constant';
import { yAxisConfigs } from '../constants/barChart_const';

// Initialize exporting and export-data modules
exportingInit(Highcharts);
exportDataInit(Highcharts);
exporting(Highcharts);
HCExportingCSV(Highcharts);
HCExportingXLS(Highcharts);

const BarcahrtComponent = props => {
  const csvLinkRef: any = React.createRef();

  let category = props?.category ? props?.category : daysofweek;
  const series: number[] = [];
  const chartDivId = `bar_chart_div${props?.title}`;
  let datas = props?.data?.data;

  const [printData, setprintData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [chart, setChart] = useState(null);
  const [csvData, setcsvData] = useState({
    title: '',
    column: [],
    rows: [],
  });

  const charttitle = (
    <div>
      <p>{props?.title}</p>
    </div>
  );

  for (const day in datas) {
    if (datas.hasOwnProperty(day)) {
      series.push(datas[day].count);
    }
  }

  useEffect(() => {
    if (props?.data?.data != undefined) {
      const title = props?.title || defaultTitle;
      let row_header = getGoogleSheetSingleBarChartRowHeader(title);
      const rowHeader: any = [
        {
          label: row_header[0],
          key: 'days',
        },
        {
          label: 'Total of Data%',
          key: 'bookings',
        },
        {
          label: 'Change Percentage',
          key: 'percentage',
        },
        {
          label: 'Change Percentage Status',
          key: 'status',
        },
      ];

      const rows = Object.keys(props?.data?.data).map(day => ({
        days: day,
        bookings: props?.data?.data[day].count,
        percentage: props?.data?.data[day].average,
        status: props?.data?.data[day].ratio,
      }));

      setcsvData({
        title: title,
        column: rowHeader,
        rows: rows,
      });
    }
  }, [props?.data?.data]);

  function googlesheetmethodcall() {
    if (props?.data?.data) {
      const title = props?.title || defaultTitle;
      let row_header = getGoogleSheetSingleBarChartRowHeader(props?.title);
      const rows = Object.keys(props?.data?.data).map(_dt => {
        let returnResponse = {};
        returnResponse[row_header[0]] = _dt;
        returnResponse = {
          ...returnResponse,
          'Total of Data%': props?.data?.data[_dt].count,
          'Change percentage': props?.data?.data[_dt].average,
          'Change percentage status': props?.data?.data[_dt].ratio,
        };
        return returnResponse;
      });
      const output = {
        row_header: row_header,
        rows: rows,
        title,
      };
      callgooglesheetApi(output);
    }
  }

  function customEXCELmethodcall() {
    if (props?.data?.data) {
      const title = props?.title || defaultTitle;
      let row_header = getGoogleSheetSingleBarChartRowHeader(props?.title);
      let excelLabel = excelSheetColumTitle(props?.title);

      const columns: any = [
        {
          title: row_header[0],
          dataIndex: 'days',
          key: 'days',
        },
        {
          title: 'Total of Data%',
          dataIndex: 'bookings',
          key: 'bookings',
        },
        {
          title: 'Change Percentage',
          dataIndex: 'percentage',
          key: 'percentage',
        },
        {
          title: 'Change Percentage Status',
          dataIndex: 'status',
          key: 'status',
        },
      ];

      const rows = Object.keys(props?.data?.data).map(day => ({
        days: day,
        bookings: props?.data?.data[day].count,
        percentage: props?.data?.data[day].average,
        status: props?.data?.data[day].ratio,
      }));

      const output = {
        columns: columns,
        rows: rows,
        title,
      };
      customXlmethod(output);
    }
  }

  function customCSVmethodcall() {
    const filenameNew = exportFilename();

    if (csvLinkRef.current) {
      csvLinkRef.current.link.setAttribute('download', filenameNew);
      csvLinkRef.current.link.click();
    }
  }

  const options = {
    credits: {
      enabled: false,
    },
    chart: {
      type: 'bar',
      height: 350,
      marginTop: 75,
      spacingTop: 100,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      series: {
        pointPadding: 0.1,
        pointWidth: 25,
      },
      bar: {
        // pointWidth: 35,
        borderRadius: 10,
        borderRadiusTopLeft: 10,
        borderRadiusTopRight: 10,
        borderRadiusBottomLeft: 3,
        borderRadiusBottomRight: 3,
        dataLabels: {
          enabled: true,
          inside: false,
          align: 'left',
          verticalAlign: 'middle',
          useHTML: true,
          formatter: function () {
            // <span class="status-${datas[this.x]['ratio']} status-badge" style="margin:0 10px">
            //   ${datas[this.x]['average']}%</span>
            return `<div>${this.y} &nbsp;&nbsp;<span style="color:${
              datas?.[this.x]?.['ratio'] == 'equal'
                ? '#323232'
                : datas?.[this.x]?.['ratio'] == 'down'
                ? '#BA3B46'
                : '#8DEAC3'
            }">${datas?.[this.x]?.['average']}%</span>&nbsp;&nbsp;
          <span style="width: 0;height: 0;border-left: 4px solid transparent;display:inline-block;
          border-right: 4px solid transparent;
          border-bottom: 8px solid ${
            datas?.[this.x]?.['ratio'] == 'equal'
              ? '#323232'
              : datas?.[this.x]?.['ratio'] == 'down'
              ? '#BA3B46'
              : '#8DEAC3'
          };
          transform: rotate(${
            datas?.[this.x]?.['ratio'] == 'equal'
              ? '90'
              : datas?.[this.x]?.['ratio'] == 'down'
              ? '180'
              : '360'
          }deg);"></span>
            </div>`;
          },
        },
      },
    },
    legend: {
      enabled: false,
    },
    title: {
      text: props?.title,
      align: 'left',
      y: -75,
    },
    xAxis: {
      title: {
        enabled: false,
        text: 'Days of week',
      },
      gridLineWidth: 1,
      lineColor: null,
      lineWidth: 0,
      categories: category,
      labels: {
        style: {
          color: '#777',
          fontSize: '14px',
        },
      },
    },
    yAxis: {
      gridLineWidth: 0,
      title: {
        enabled: false,
        text: 'Percentage',
      },
      min: 0,
      ...(yAxisConfigs[props?.data?.type] || yAxisConfigs['default']),
    },
    colors: ['#1F78B4'],
    series: [
      {
        data: series,
      },
    ],
    exporting: {
      allowHTML: true,
      filename: exportFilename(),
      enabled: true,
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
            customCSVmethodcall();
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
            customEXCELmethodcall();
          },
        },
        printChart: { text: 'Print' },
        email: {
          text: 'Email',
          onclick: function () {
            const input = document.getElementById(chartDivId);
            html2canvas(input, { scale: 5 }).then(canvas => {
              const imgData = canvas.toDataURL('image/png');
              const regex = /data:.*base64,/;
              setprintData(state => imgData.replace(regex, ''));
            });
            setModalOpen(true);
          },
        },
      },
    },
    tooltip: {
      enabled:
        props?.title == REPORTING_CHART_TITLE.avg_head_count_by_team ||
        props?.title == REPORTING_CHART_TITLE.avg_head_count_by_location
          ? true
          : false,
      positioner: function (labelWidth, _, point) {
        return {
          x:
            point.plotX - labelWidth + 30 > 0
              ? point.plotX - labelWidth + 30
              : point.plotX + 70,
          y: point.plotY + 27,
        };
      },
      useHTML: true,
      formatter: function () {
        return `<div>${this.x}&nbsp;<span style="font-weight:500;">(${
          datas[this.x]?.['checkInCount']
        } out of ${
          datas[this.x]?.['totalTeamCount']
        })</span> <span style="color:${
          datas[this.x]?.['ratio'] == 'equal'
            ? '#323232'
            : datas[this.x]?.['ratio'] == 'down'
            ? '#BA3B46'
            : '#8DEAC3'
        }">${datas[this.x]?.['userAvg']}%</span>
        &nbsp;&nbsp;<span style="color:${
          datas[this.x]?.['ratio'] == 'equal'
            ? '#323232'
            : datas[this.x]?.['ratio'] == 'down'
            ? '#BA3B46'
            : '#8DEAC3'
        }">(${datas[this.x]?.['average']}%)</span>&nbsp;&nbsp;
      <span style="width: 0;height: 0;border-left: 4px solid transparent;display:inline-block;
      border-right: 4px solid transparent;
      border-bottom: 8px solid ${
        datas[this.x]?.['ratio'] == 'equal'
          ? '#323232'
          : datas[this.x]?.['ratio'] == 'down'
          ? '#BA3B46'
          : '#8DEAC3'
      };
      transform: rotate(${
        datas[this.x]?.['ratio'] == 'equal'
          ? '90'
          : datas[this.x]?.['ratio'] == 'down'
          ? '180'
          : '360'
      }deg);"></span>
        </div>`;
      },
    },
  };

  return (
    <>
      <Emailpopup
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        charttitle={props?.title}
        printData={printData}
        chart={true}
      />
      <div className="card-d-flex" id={chartDivId}>
        <div className="card card-shadow card-chart card-bar-radius card-header-abs">
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
          {datas && Object.keys(datas)?.length > 0 ? (
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

export default BarcahrtComponent;
