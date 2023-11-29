import React, { useState } from "react";
import { info } from "../../imagepath";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import exportingInit from "highcharts/modules/exporting";
import exportDataInit from "highcharts/modules/export-data";
import HCExportingCSV from "highcharts/modules/export-data.src";
import HCExportingXLS from "highcharts/modules/export-data.src";
import { Popover } from "antd";
import { callgooglesheetApi } from "./googlesheet";
import Emailpopup from "./emailpopup";

// Initialize exporting and export-data modules
exportingInit(Highcharts);
exportDataInit(Highcharts);
exporting(Highcharts);
HCExportingCSV(Highcharts);
HCExportingXLS(Highcharts);

interface BarChartProps {
    options: any;
    title: any;
}

const BarChartComponent = ({ options, title }: BarChartProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [chart, setChart] = useState(null);

    const charttitle = (
        <div>
            <p>{title}</p>
        </div>
    );

    return (
        <>
            <Emailpopup
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                charttitle={charttitle}
                chart={chart}
            />
            <div className="card-d-flex">
                <div className="card card-shadow card-chart card-bar-radius card-header-abs">
                    <div className="report-card-map-header">
                        <h3>
                            {charttitle}
                            <Popover content={charttitle}>
                                <img src={info} alt="" />
                            </Popover>
                        </h3>
                    </div>
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
            </div>
        </>
    );
};

export default BarChartComponent;
