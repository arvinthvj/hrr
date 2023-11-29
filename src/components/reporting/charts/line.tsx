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
import Emailpopup from './emailpopup';
import { callgooglesheetApi, customXlmethod } from './googlesheet';
import { CSVLink } from 'react-csv';
import {
  defaultTitle,
  exportFilename,
  exporting_menuitems,
  noDataText,
} from '../constant';
import html2canvas from 'html2canvas';

// Initialize exporting and export-data modules
exportingInit(Highcharts);
exportDataInit(Highcharts);
exporting(Highcharts);
HCExportingCSV(Highcharts);
HCExportingXLS(Highcharts);

const LinechartComponent = props => {
  const csvLinkRef: any = React.createRef();
  let tabInfo = {};
  let seriesdata = [];
  tabInfo = props.tabinfo;
  const [modalOpen, setModalOpen] = useState(false);
  const [chart, setChart] = useState(null);
  let chartDivId = `line_chart_div${props?.title}`;
  const [printData, setprintData] = useState(null);
  const [csvData, setcsvData] = useState({
    title: '',
    column: [],
    rows: [],
  });

  if (props?.data && props?.data?.data?.data_load != undefined) {
    seriesdata = props?.data?.data?.data_load?.map(data => {
      return {
        ...data,
        marker: { symbol: 'circle' },
        legendSymbol: 'rectangle',
      };
    });
  }

  useEffect(() => {
    if (props?.data?.data?.data_load != undefined) {
      const title = props?.title || defaultTitle;

      const arrSecond = props?.data?.data?.data_load;
      const totalActiveLabel = props?.data?.data?.data_load[0].name;

      const excelColumn: any = [
        { label: 'Date', key: 'date' },
        { label: totalActiveLabel, key: 'total_active' },
        { label: 'Bookings', key: 'bookings' },
        { label: 'Checked-in', key: 'checked_in' },
      ];

      const rowTotActiveDesk = arrSecond.find(el =>
        [
          'Total active desks',
          'Total active rooms',
          'Total active spaces',
        ].includes(el.name),
      );
      const rowBooking = arrSecond.find(el => el.name === 'Bookings');
      const rowCkIn = arrSecond.find(el => el.name === 'Checked-in');
      const ParentLoop = props?.data?.data?.xAxis;

      const excelRows: any[] = [];
      for (let j = 0; j < ParentLoop.length; j++) {
        const rowTotActiveDsk = rowTotActiveDesk?.data;
        const rowBook = rowBooking?.data;
        const rowCk_in = rowCkIn?.data;
        excelRows.push({
          date: ParentLoop[j],
          total_active: rowTotActiveDsk?.[j],
          bookings: rowBook?.[j],
          checked_in: rowCk_in?.[j],
        });
      }

      setcsvData({
        title: title,
        column: excelColumn,
        rows: excelRows,
      });
    }
  }, [props?.data?.data?.data_load]);

  function googlesheetmethodcall() {
    if (props?.data?.data?.xAxis && props?.data?.data?.data_load) {
      const title = props?.title || defaultTitle;
      const xAxisTitle = 'Date';
      const arrSecond = props?.data?.data?.data_load;
      if (arrSecond.some(el => el.name === 'Date') === false) {
        arrSecond.unshift({
          name: xAxisTitle,
          data: props?.data?.data?.xAxis,
        });
      }

      const row_header: any[] = [];
      for (let k = 0; k < arrSecond.length; k++) {
        row_header.push(arrSecond[k].name);
      }

      const rowDate = arrSecond.find(el => el.name === 'Date');
      const rowTotActiveDesk = arrSecond.find(el =>
        [
          'Total active desks',
          'Total active rooms',
          'Total active spaces',
        ].includes(el.name),
      );
      const rowBooking = arrSecond.find(el => el.name === 'Bookings');
      const rowCkIn = arrSecond.find(el => el.name === 'Checked-in');
      const ParentLoop = rowDate.data;
      const rows: any[] = [];
      for (let j = 0; j < ParentLoop.length; j++) {
        const rowTotActiveDsk = rowTotActiveDesk?.data;
        const rowBook = rowBooking?.data;
        const rowCk_in = rowCkIn?.data;
        rows.push({
          [rowDate?.name]: ParentLoop[j],
          [rowTotActiveDesk?.name]: rowTotActiveDsk?.[j],
          [rowBooking?.name]: rowBook?.[j],
          [rowCkIn?.name]: rowCk_in?.[j],
        });
      }

      const output = {
        row_header,
        rows,
        title,
      };

      callgooglesheetApi(output);
    }
  }

  const customCSVmethodcall = () => {
    const filenameNew = exportFilename();
    if (csvLinkRef.current) {
      csvLinkRef.current.link.setAttribute('download', filenameNew);
      csvLinkRef.current.link.click();
    }
  };

  const customXlmethodcall = () => {
    const xAxisTitle = 'Date';
    const arrSecond = props?.data?.data?.data_load;
    if (arrSecond.some(el => el.name === 'Date') === false) {
      arrSecond.unshift({
        name: xAxisTitle,
        data: props?.data?.data?.xAxis,
      });
    }

    const excelColumn = (arrSecond || []).map((item: any) => {
      return {
        title: item.name,
        dataIndex: [
          'Total active desks',
          'Total active rooms',
          'Total active spaces',
        ].includes(item.name)
          ? 'total_active'
          : item.name.toLowerCase().split(' ').join('_').split('-').join('_'),
        key: [
          'Total active desks',
          'Total active rooms',
          'Total active spaces',
        ].includes(item.name)
          ? 'total_active'
          : item.name.toLowerCase().split(' ').join('_').split('-').join('_'),
      };
    });

    const rowDate = arrSecond.find(el => el.name === 'Date');
    const rowTotActiveDesk = arrSecond.find(el =>
      [
        'Total active desks',
        'Total active rooms',
        'Total active spaces',
      ].includes(el.name),
    );
    const rowBooking = arrSecond.find(el => el.name === 'Bookings');
    const rowCkIn = arrSecond.find(el => el.name === 'Checked-in');
    const ParentLoop = rowDate.data;
    const excelRows: any[] = [];
    for (let j = 0; j < ParentLoop.length; j++) {
      const rowTotActiveDsk = rowTotActiveDesk?.data;
      const rowBook = rowBooking?.data;
      const rowCk_in = rowCkIn?.data;
      excelRows.push({
        date: ParentLoop[j],
        total_active: rowTotActiveDsk?.[j],
        bookings: rowBook?.[j],
        checked_in: rowCk_in?.[j],
      });
    }

    const outputLoad: any = {
      title: props?.title,
      columns: excelColumn,
      rows: excelRows,
    };

    customXlmethod(outputLoad);
  };

  const charttitle = (
    <div>
      <p>{props?.title}</p>
    </div>
  );

  const options = {
    credits: {
      enabled: false,
    },
    chart: {
      id: 'basic-bar',
      type: 'spline',
      marginTop: 75,
      spacingTop: 100,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      spline: {
        lineWidth: 2,
      },
    },
    title: {
      text: props.title,
      y: -75,
      align: 'left',
    },
    xAxis: {
      title: {
        enabled: false,
        text: 'Date',
      },
      categories: props?.data?.data?.xAxis,
      labels: {
        style: {
          color: '#777',
          fontSize: '10px',
        },
      },
    },
    yAxis: {
      title: {
        text: props?.subtitle,
      },
      // min: 0,
      softMax: 5,
      endOnTick: true,
      labels: {
        formatter: function () {
          return this.value;
        },
        min: 0,
        max: 100,
        tickAmount: 6,
        logBase: 20,

        style: {
          color: '#777',
          fontSize: '10px',
        },
      },
    },
    colors: ['#A6CEE3', '#1F78B4', '#FF9966'],
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    markers: {
      size: 5,
      strokeWidth: 0,
    },
    legend: {
      verticalAlign: 'bottom',
      layout: 'horizontal',
      align: 'center',
      className: 'linechart',
      useHTML: true,
      maxHeight: 60,
    },
    series: seriesdata,
    exporting: {
      filename: exportFilename(),
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
            customCSVmethodcall();
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
      <div className="card-d-flex">
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
              >
                Download CSV
              </CSVLink>
            </h3>
          </div>
          {seriesdata?.length > 0 ? (
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

export default LinechartComponent;
