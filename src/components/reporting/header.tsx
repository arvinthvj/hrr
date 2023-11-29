import React from 'react'
import { Link } from "react-router-dom";
import { Col, DatePicker,Row } from "antd";
import { DashboardIcon, TeamIcon, bookCalendarIcon, book_1, book_2,book_3,book_4,book_5,monthIcon } from "../imagepath";

function TabfilterComponent() {
  return (
    <>
      <Row>
              <Col lg={24} xl={24} sm={24} md={24} xs={24}>
                <div className="book-left-info">
                  <div className="book-tabs">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                          <Link to="#" className="nav-link active">
                            <img src={DashboardIcon} alt="" />
                          </Link>
                      </li>
                      <li className="nav-item" role="presentation">
                        <Link to="#" className="nav-link">
                          <img src={book_1} alt="" />
                        </Link>
                      </li>
                      <li className="nav-item" role="presentation">
                        <Link to="#" className="nav-link">
                          <img src={book_2} alt="" />
                        </Link>
                      </li>
                      <li className="nav-item" role="presentation">
                        <Link to="#" className="nav-link">
                          <img src={book_3} alt="" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="book-header">
                    <h4>Overview</h4>
                  </div>
                </div>
              </Col>
      </Row>
    </>
  )
}

export default TabfilterComponent