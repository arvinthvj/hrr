import React, { useContext } from 'react'
import PerformancePieChart from './performancePieChart'
import PerformanceGoalData from './performanceGoalData'

import { PersonalContext } from '../personalController';
import { Col, Row } from 'antd';

const PerformanceManagement = () => {
    const {
        AddComponent,
        createRecordFlag,
    } = useContext(PersonalContext);
    return (
        <>
            {/* Performance Select */}
            <div className="performance-select">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="performance-year">
                            <div className="form-group">
                                <label>Year</label>
                                <select className="select">
                                    <option>2023</option>
                                    <option>2022</option>
                                    <option>2021</option>
                                    <option>2020</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="performance-viewing">
                            <div className="form-group">
                                <label>Viewing</label>
                                <select className="select">
                                    <option>My performance</option>
                                    <option>Team performance</option>
                                    <option>All who report to me</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Performance Select */}
            {/* Tab Info */}
            <div className="tab-content" id="myTabContent">
                <div className="tab-scroll performance-tab-scroll">
                    {/* Performance Management */}
                    <div
                        className="tab-pane fade show active"
                        id="performance_tab"
                        role="tabpanel"
                        aria-labelledby="performance-tab"
                    >
                        <Row gutter={22}>
                        <Col xl={10} lg={12} className="d-flex">
                                <div className="card goal-card w-100">
                                    <div className="card-body">
                                        {/* <div className="performance-card-header">
                                            <h4>
                                                Goal Status{" "}
                                                <img src="assets/img/icons/tooltip-icon.svg" alt="" />
                                            </h4>
                                        </div>
                                        <div className="pie-chart">
                                            <div id="status_chart" />
                                        </div> */}
                                        <PerformancePieChart
                                            title="Goal Status"
                                            data={[10, 34, 56, 45]}
                                        />
                                    </div>
                                </div>
                            </Col>

                            
                            
                            <PerformanceGoalData />
                        </Row>
                        <div className="row">
                            <div className="col-xl-5 col-lg-12">
                                <div className="card goal-card w-100">
                                    <div className="card-body">
                                        <div className="speed-up-info">
                                            <div className="speed-up-icon">
                                                <img src="assets/img/icons/speed-up.svg" alt="" />
                                            </div>
                                            <div className="speed-up-content">
                                                <h6>Performance</h6>
                                                <h4>24.34</h4>
                                                <p>
                                                    9% <i className="fas fa-sort-up" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card goal-card w-100">
                                    <div className="card-body">
                                        <div className="speed-up-info">
                                            <div className="speed-up-icon">
                                                <img src="assets/img/icons/speed-up.svg" alt="" />
                                            </div>
                                            <div className="speed-up-content">
                                                <h6>Performance</h6>
                                                <h4>24.34</h4>
                                                <p>
                                                    9% <i className="fas fa-sort-up" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card goal-card w-100">
                                    <div className="card-body">
                                        <div className="speed-up-info">
                                            <div className="speed-up-icon">
                                                <img src="assets/img/icons/speed-up.svg" alt="" />
                                            </div>
                                            <div className="speed-up-content">
                                                <h6>Performance</h6>
                                                <h4>24.34</h4>
                                                <p>
                                                    9% <i className="fas fa-sort-up" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-7 col-lg-12 d-flex">
                                <div className="card goal-card w-100">
                                    <div className="card-body">
                                        <div className="performance-card-header">
                                            <h4>
                                                Performance over time{" "}
                                                <img src="assets/img/icons/tooltip-icon.svg" alt="" />
                                            </h4>
                                            <div className="goal-table-dropdown">
                                                <div className="dropdown">
                                                    <a
                                                        href="javascript:void(0);"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="true"
                                                    >
                                                        <i className="fa fa-ellipsis" />
                                                    </a>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="dropdown-item"
                                                            >
                                                                Download report
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="dropdown-item"
                                                            >
                                                                Download SVG
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="s-col-stacked" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-5 col-lg-12">
                                <div className="card goal-card w-100">
                                    <div className="card-body">
                                        <div className="appraisal-info">
                                            <div className="appraisal-header">
                                                <h4>Performance appraisal(s)</h4>
                                            </div>
                                            <div className="appraisal-box appraisal-box-grey">
                                                <div className="appraisal-title">
                                                    <h4>Performance appraisal Q4</h4>
                                                </div>
                                                <div className="appraisal-list">
                                                    <ul className="nav">
                                                        <li>
                                                            <p>Due by</p>
                                                            <h6>31/Dec/23s</h6>
                                                        </li>
                                                        <li>
                                                            <p>Last saved</p>
                                                            <h6>
                                                                31/Dec/23
                                                                <a href="javascript:void(0);">Open</a>
                                                            </h6>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Performance Management */}
                </div>
            </div>
            {/* /Tab Info */}
        </>


    )
}

export default PerformanceManagement