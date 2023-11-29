import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { info } from '../../imagepath';
import { Popover } from 'antd';
import exporting from 'highcharts/modules/exporting';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HCExportingCSV from 'highcharts/modules/export-data.src';
import HCExportingXLS from 'highcharts/modules/export-data.src';
import { callgooglesheetApi, customXlmethod } from './googlesheet';
import Emailpopup from './emailpopup';
import { CSVLink } from 'react-csv';
import {
  REPORTING_CHART_TITLE,
  defaultTitle,
  exportFilename,
  exporting_menuitems,
  noDataText,
} from '../constant';
import html2canvas from 'html2canvas';
import { getExcelSheetTitle } from '../../commonMethod';

// Initialize exporting and export-data modules
exportingInit(Highcharts);
exportDataInit(Highcharts);
exporting(Highcharts);
HCExportingCSV(Highcharts);
HCExportingXLS(Highcharts);

const StackedWithLineComponent = props => {
  let series = [];
  series = props?.data?.data == undefined || {} ? [] : props?.data?.data;
  const csvLinkRef: any = React.createRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [chart, setChart] = useState(null);
  const [printData, setprintData] = useState(null);
  let chartDivId = `stackedline_chart_div${props?.title}`;
  const [csvItemData, setCsvItemData] = useState({
    title: '',
    column: [],
    rows: [],
  });

  useEffect(() => {
    if (props?.originalData?.data || props?.data?.data) {
      const title = props?.title || defaultTitle;

      let data = props?.originalData?.xaxis || props?.data?.xaxis;
      const row_header = ['Date', ...data];
      const excelData = props?.originalData?.data || props?.data?.data;
      const rows = excelData?.map(item => {
        const row = { Date: item.name };

        for (let i = 0; i < data.length; i++) {
          row[data[i]] = item.data[i];
        }
        return row;
      });
      setCsvItemData({
        title: title,
        column: row_header,
        rows: rows,
      });
    }
  }, [props?.originalData?.data, props?.data?.data]);

  function customCsvmethodcallx() {
    const filenameNew = exportFilename();
    if (csvLinkRef.current) {
      csvLinkRef.current.link.setAttribute('download', filenameNew);
      csvLinkRef.current.link.click();
    }
  }

  function customXlmethodcall() {
    if (props?.originalData?.data?.length > 0 || props?.data?.data?.length) {
      const title = props?.title || defaultTitle;
      const jsonData = props?.originalData || props?.data;
      let yAxisKey = getExcelSheetTitle(props?.title);
      const transformedData = [];
      let columns = [];
      columns = [
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        ...jsonData.xaxis.map((_dt, index) => ({
          title: _dt,
          dataIndex: `data${index}`,
          key: _dt,
        })),
      ];
      jsonData.data.forEach(item => {
        const row = {
          key: item.name,
          date: item.name,
        };

        item.data.forEach((value, index) => {
          row[`data${index}`] = value;
        });

        transformedData.push(row);
      });

      const output = {
        columns: columns,
        rows: transformedData,
        title: title,
      };
      customXlmethod(output);
    }
  }

  function googlesheetmethodcall() {
    const sheetData = props?.originalData?.data
      ? props?.originalData?.data
      : props?.data?.data;
    if (sheetData != undefined) {
      const title = props?.title || defaultTitle;
      let data = props?.originalData?.xaxis || props?.data?.xaxis;
      const row_header = ['Date', ...data];
      const rows = sheetData?.map(item => {
        const row = { Date: item.name };
        for (let i = 0; i < data.length; i++) {
          row[data[i]] = item.data[i];
        }
        return row;
      });
      const output = {
        row_header,
        rows,
        title,
      };
      callgooglesheetApi(output);
    }
  }

  const charttitle = (
    <div>
      <p>{props?.title}</p>
    </div>
  );

  const chartSeries = [];

  if (
    REPORTING_CHART_TITLE.headcount_by_employment_status_over_time ==
    props?.title
  ) {
    for (let i = 0; i < series.length; i++) {
      const seriesData = series[i];
      // Add color based on index or condition
      if (i === 0) {
        seriesData.color = '#1f78b4';
      } else if (i === 1) {
        seriesData.color = '#FF9966';
      } else if (i === 2) {
        seriesData.color = '#FCBF68';
      } else if (i === 3) {
        seriesData.color = '#565657';
      } else if (i === 4) {
        seriesData.color = '#A6CEE3';
      } else if (i === 5) {
        seriesData.color = '000027';
      } else if (i === 6) {
        seriesData.color = '#0F62AB';
      } else if (i === 7) {
        seriesData.color = '#073D83';
      } else if (i === 8) {
        seriesData.color = '#1F1F51';
      }
      chartSeries.push(seriesData);
    }
  } else {
    for (let i = 0; i < series.length; i++) {
      const seriesData = series[i];
      // Add color based on index or condition
      if (i === 0) {
        seriesData.color = '#A6CEE3';
      } else if (i === 1) {
        seriesData.color = '#565657';
      } else if (i === 2) {
        seriesData.color = '#FCBF68';
      } else if (i === 3) {
        seriesData.color = '#FF9966';
      } else if (i === 4) {
        seriesData.color = '#53B9E6';
      } else if (i === 5) {
        seriesData.color = '#2B84C3';
      } else if (i === 6) {
        seriesData.color = '#0F62AB';
      } else if (i === 7) {
        seriesData.color = '#073D83';
      } else if (i === 8) {
        seriesData.color = '#1F1F51';
      }
      chartSeries.push(seriesData);
    }
  }

  const options = {
    credits: {
      enabled: false,
    },
    chart: {
      type: 'column',
      marginTop: 75,
      spacingTop: 100,
    },
    title: {
      useHTML: true,
      text: props?.title,
      align: 'left',
      y: -75,
    },
    xAxis: {
      title: {
        enabled: false,
        text: 'Date',
      },
      categories: props?.data?.xaxis == undefined ? [] : props?.data?.xaxis,
      labels: {
        style: {
          color: '#777',
          fontSize: '10px',
        },
      },
    },
    yAxis: {
      reversedStacks: false,
      //min: 0,
      softMax: 5,
      endOnTick: true,
      title: {
        text: props?.subtitle,
      },
      stackLabels: {
        enabled: true,
      },
    },

    legend: {
      layout: 'horizontal',
      align: 'center',
      className: 'stackedwithlinecharsadt',
      useHTML: true,
      maxHeight: 60,
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        borderWidth: 0,
        borderColor: 'transparent',
      },
      series: {
        borderWidth: 0,
        borderColor: 'transparent',
        pointWidth: props?.data?.xaxis?.length > 7 ? 20 : 30,
        maxPointWidth: 40,
      },
      bar: {
        borderRadius: 10,
        backgroundBarRadius: 10,
        stacking: 'normal',
      },
    },
    series: chartSeries,
    colors: ['#1F1F51'],

    exporting: {
      allowHTML: true,
      filename: exportFilename,
      enabled: true,
      buttons: {
        contextButton: {
          menuItems: exporting_menuitems,
          useHTML: true,
          y: -100,
          text: "<span class='menu-dropdown'></span>",
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
            this.exportChart({
              type: 'image/png',
              filename: exportFilename(),
            });
          },
        },
        downloadPDF: {
          text: 'Download as PDF',
          onclick: function () {
            this.exportChart({
              type: 'application/pdf',
              filename: exportFilename(),
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
            setChart(state => this);
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
        <div className="card card-shadow card-chart card-header-abs card-header-abs">
          <div className="report-card-map-header">
            <h3>
              {charttitle}
              <Popover content={charttitle}>
                <img src={info} alt="" />
              </Popover>

              <CSVLink
                data={csvItemData?.rows}
                headers={csvItemData?.column}
                filename={exportFilename()}
                className="hidden d-none"
                ref={csvLinkRef}
              >
                Download CSV
              </CSVLink>
            </h3>
          </div>
          <div className="chart-plot-grid">
            {series?.length > 0 ? (
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
      </div>
    </>
  );
};

export default StackedWithLineComponent;
