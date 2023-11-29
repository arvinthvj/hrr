import React, { useEffect, useState } from 'react';
import { info } from '../../../imagepath';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import HCExportingCSV from 'highcharts/modules/export-data.src';
import HCExportingXLS from 'highcharts/modules/export-data.src';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import { Popover } from 'antd';
import Emailpopup from '../emailpopup';
import { callgooglesheetApi, customXlmethod } from '../googlesheet';
import { CSVLink } from 'react-csv';
import {
  defaultTitle,
  exportFilename,
  exporting_menuitems,
  heatmap,
  noDataText,
} from '../../constant';
import html2canvas from 'html2canvas';

// Initialize exporting and export-data modules
exportingInit(Highcharts);
exportDataInit(Highcharts);
exporting(Highcharts);
HCExportingCSV(Highcharts);
HCExportingXLS(Highcharts);
HighchartsHeatmap(Highcharts);

const HeatmapchartComponent = props => {
  const csvLinkRef: any = React.createRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [chart, setChart] = useState(null);
  let chartDivId = `heatmap_chart_div${props?.title}`;
  const [printData, setprintData] = useState(null);

  const [csvData, setcsvData] = useState({
    title: '',
    column: [],
    rows: [],
  });

  const categoriesArray = heatmap?.hours;

  const charttitle = (
    <div>
      <p>{props?.title}</p>
    </div>
  );

  const serisData = props?.data?.data?.map(aray => {
    const value = aray[2] == 0 ? 0 : (aray[2] / props?.data?.capacity) * 100;
    return {
      x: aray[0],
      y: aray[1],
      value: aray[2],
      percentage: value,
      colorKey: 'percentage',
    };
  });

  useEffect(() => {
    if (props?.data?.data?.length > 0) {
      const title = props?.title || defaultTitle;

      const categoriesArrayobj = categoriesArray.map(ele => {
        return {
          label: ele,
          key: ele,
        };
      });

      let rowHeader: any = [];
      rowHeader = [
        {
          label: 'Loactions',
          key: 'Location',
        },
        ...categoriesArrayobj,
      ];

      const rows = {};

      props?.data?.data?.map(item => {
        const key = item[1].toString();
        const value = item[2];
        if (!rows[key]) {
          rows[key] = [];
        }
        rows[key].push(value);
      });

      const arr = Object.keys(rows);
      arr.map((idx, ele) => {
        rows[idx].unshift(props?.data?.locations[idx]);
      });

      let keyArray = [];
      keyArray = ['Location', ...categoriesArray];

      const formattedData = Object.keys(rows).map(key => {
        const obj = { ['Location']: rows[key][0] };
        for (let i = 1; i < keyArray.length; i++) {
          obj[keyArray[i]] = rows[key][i];
        }
        return obj;
      });

      const formattedDatafinal = formattedData.map(item => {
        const formattedItem = { Location: item.Location };
        for (const key in item) {
          if (key !== 'Location') {
            formattedItem[key] = item[key];
          }
        }
        return formattedItem;
      });
      setcsvData({
        column: rowHeader,
        rows: formattedDatafinal,
        title: title,
      });
    }
  }, [props?.data?.data]);

  function customCsvmethodcallx() {
    const filenameNew = exportFilename();

    if (csvLinkRef.current) {
      csvLinkRef.current.link.setAttribute('download', filenameNew);
      csvLinkRef.current.link.click();
    }
  }

  function googlesheetmethodcall() {
    if (props?.data?.data) {
      const title = props?.title || defaultTitle;
      // const data = props?.data?.data?.xAxis;
      let row_header = [];
      row_header = ['Locations', ...categoriesArray];

      const rows = {};
      props?.data?.data?.map(item => {
        const key = item[1].toString();
        const value = item[2];
        if (!rows[key]) {
          rows[key] = [];
        }
        rows[key].push(value);
      });

      const arr = Object.keys(rows);
      arr.map((idx, ele) => {
        rows[idx].unshift(props?.data?.locations[idx]);
      });

      const keyArray = ['Locations', ...categoriesArray];

      const formattedData = Object.keys(rows).map(key => {
        const obj = { ['Locations']: rows[key][0] };
        for (let i = 1; i < keyArray.length; i++) {
          obj[keyArray[i]] = rows[key][i];
        }
        return obj;
      });

      const formattedDatafinal = formattedData.map(item => {
        const formattedItem = { ['Locations']: item['Locations'] };
        for (const key in item) {
          if (key !== 'Locations') {
            formattedItem[key] = item[key];
          }
        }
        return formattedItem;
      });

      const output = {
        row_header: row_header,
        rows: formattedDatafinal,
        title: title,
      };
      callgooglesheetApi(output);
    }
  }

  function customXlmethodcall() {
    if (props?.data?.data?.length > 0) {
      const title = props?.title || defaultTitle;

      const categoriesArrayobj = categoriesArray.map(ele => {
        return {
          title: ele,
          dataIndex: ele,
          key: ele,
        };
      });

      let rowHeader: any = [];
      rowHeader = [
        {
          title: 'Locations',
          dataIndex: 'location',
          key: 'location',
        },
        ...categoriesArrayobj,
      ];

      const rows = {};
      props?.data?.data?.map(item => {
        const key = item[1].toString();
        const value = item[2];
        if (!rows[key]) {
          rows[key] = [];
        }
        rows[key].push(value);
      });

      const arr = Object.keys(rows);
      arr.map((idx, ele) => {
        rows[idx].unshift(props?.data?.locations[idx]);
      });

      let keyArray = [];
      keyArray = ['location', ...categoriesArray];

      const formattedData = Object.keys(rows).map(key => {
        const obj = { location: rows[key][0] };
        for (let i = 1; i < keyArray.length; i++) {
          obj[keyArray[i]] = rows[key][i];
        }
        return obj;
      });

      const formattedDatafinal = formattedData.map(item => {
        const formattedItem = { location: item.location };
        for (const key in item) {
          if (key !== 'location') {
            formattedItem[key] = item[key];
          }
        }
        return formattedItem;
      });

      const output = {
        columns: rowHeader,
        rows: formattedDatafinal,
        title: title,
      };
      customXlmethod(output);
    }
  }

  const options = {
    credits: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    chart: {
      type: 'heatmap',
      marginTop: 75,
      spacingTop: 100,
      borderWidth: 0,
    },
    title: {
      text: props?.title,
      align: 'left',
      y: -75,
    },
    xAxis: {
      title: {
        enabled: false,
        text: 'Hours',
      },
      lineWidth: 0.3,
      categories: categoriesArray,
      labels: {
        rotation: -90,
        style: {
          color: '#777',
          fontSize: '10px',
        },
      },
    },
    yAxis: {
      categories: props?.data?.locations,
      title: null,
      reversed: true,
      gridLineColor: 'transparent',
      labels: {
        style: {
          color: '#777',
          fontSize: '14px',
        },
      },
    },
    exporting: {
      filename: exportFilename(),
      enabled: true,
      buttons: {
        contextButton: {
          menuItems: exporting_menuitems,
          useHTML: true,
          y: -100,
          text: "<span class='menu-dropdown'></span>",
          className: 'heatmap_chart',
          menuClassName: 'heatmap_chart',
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
    colorAxis: {
      dataClasses: [
        { from: -1, to: 0, name: '', color: '#FFFFFF' },
        { from: 1, to: 20, name: '0-20', color: '#C1DAF0' },
        { from: 21, to: 40, name: '21-40', color: '#8CBDD8' },
        { from: 41, to: 60, name: '41-60', color: '#519ACD' },
        { from: 61, to: 80, name: '61-80', color: '#073D83' },
        { from: 81, to: 100, name: '81-100', color: '#1F1F51' },
      ],
    },
    legend: {
      align: 'center',
      verticalAlign: 'top',
      layout: 'horizontal', // default
      // itemDistance: 50,
      y: -60,
      labelFormatter: function () {
        if (this.name) return this.name + ' %';
      },
    },
    series: [
      {
        data: serisData, // props?.data?.data,
        dataLabels: {
          enabled: true,
          color: '#fff',
          style: {
            textOutline: '0px',
            fontWeight: 300, // Set the font weight to bold
            fontSize: '10px', // Set the font size to 12 pixels
            fontStyle: 'Avenir', // Set the font size to 12 pixels
            lineHeight: '13.66px', // Set the line height to 16 pixels
          },
          formatter: function () {
            // Change the color to red if the value is above 10
            // console.log('this.point.value',this.point.value)
            let cellValue = this.point.value;

            if (this.point.value < 40) {
              cellValue =
                '<span style="color: #1B1B1B">' + this.point.value + '</span>';
            }

            if (this.point.value == 0) {
              cellValue =
                '<span style="color: #fff">' + this.point.value + '</span>';
            }

            return cellValue;
          },
        },
      },
    ],
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
      <div
        className="card card-shadow card-chart card-header-abs"
        id={chartDivId}
      >
        <div className="report-card-map-header">
          <h3>
            {charttitle}
            <Popover content={charttitle}>
              <img src={info} alt="" />
            </Popover>
            <CSVLink
              data={csvData?.rows}
              headers={csvData?.column}
              filename={exportFilename()}
              className="hidden d-none"
              ref={csvLinkRef}
            />
          </h3>
        </div>
        {props?.data?.data && props?.data?.data?.length > 0 ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            callback={chart => setChart(chart)}
          />
        ) : (
          <div className="noDataText">{noDataText}</div>
        )}
      </div>
    </>
  );
};

export default HeatmapchartComponent;
