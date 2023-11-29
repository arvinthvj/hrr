import React from 'react';
import { Popover } from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { info } from '../../imagepath';

const PerformancePieChart = (props: any) => {
    const seriesArray: object[] = [];
    const lgdArray: any = props?.data?.data == undefined ? {} : props?.data?.data;
    const datas: any = props?.data?.data == undefined ? {} : props?.data?.data;

    for (const day in datas) {
        if (datas.hasOwnProperty(day)) {
            seriesArray.push({
                name: `${datas[day].type} (${datas[day].count})`,
                name_legend: datas[day].type,
                y: datas[day].count,
            });
        }
    }
    const charttitle = (
        <div>
            <p>{props?.title}</p>
        </div>
    );

    const options = {
        plotOptions: {
            tooltip: {
                enabled: false,
            },
            pie: {
                borderWidth: 0,
                colorByPoint: true,
                size: '100%',
                innerSize: '88%',
                dataLabels: {
                    enabled: false,
                },
                borderRadius: 0, // Set borderRadius to 0
            },
            series: {
                showInLegend: true,
            },
        },
        chart: {
            height: 350,
        },
        legend: {
            y: 20,
            maxHeight: 100,
            //width: '100%',
            useHTML: true,
            verticalAlign: 'bottom',
            layout: 'horizontal',
            align: 'center',
            className: 'piechart',
            labelFormatter: function () {
                let curObj: any;
                if (lgdArray != undefined) {
                    curObj = lgdArray[this.name_legend];
                }
                return (
                    '<div>' +
                    this.name +
                    `&nbsp;&nbsp;
          <span class="status-${curObj?.ratio} status-badge">${curObj?.average}%</span>
          </div>`
                );
            },
        },
        title: {
            text: '',
            style: {
                display: 'none',
            },
        },
        colors: ['#1F78B4', '#FF9966', '#FCBF68', '#565657'],
        series: [
            {
                type: 'pie',
                data: [2, 34, 65, 44],
            },
        ],
        subtitle: {
            useHTML: true,
            text: `<div style="text-align: center; position: absolute; top: 50%; left: 50%; transform: translate(-48%, -75%);">
               <span style="display:inline-block;padding-bottom:5px;font-size:12px; color: #777;">Total</span>
               <br>
               <span style="display:inline-block;padding-bottom:5px;font-size: 19px;color:#0F62AB; font-weight: 500;">
                ${props?.data?.TotalUsers?.count || '0 people'}
               </span><br/>
               <span class="status-badge status-${props?.data?.TotalUsers?.ratio || 'equal'
                }">
               ${props?.data?.TotalUsers?.average || '0'}% 
               </span>
              </div>`,
            floating: true,
            verticalAlign: 'middle',
            y: -10,
        },
        exporting: {
            enabled: false,
        },
    };

    return (
        <>
            <div className="report-card-map-header">
                <h3>
                    {charttitle}
                    <Popover content={charttitle}>
                        <img data-html2canvas-ignore={true} src={info} alt="" />
                    </Popover>
                </h3>
            </div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </>
    );
};

export default PerformancePieChart;
