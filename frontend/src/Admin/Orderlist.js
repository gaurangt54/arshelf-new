import React from 'react'

import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Container, Row, Col, Table} from 'react-bootstrap';
import { faTasks, faRupeeSign } from "@fortawesome/free-solid-svg-icons";

function Orderlist() {
    return (
        <div>
            <Container  className="py-3">
                <Row>
                  <Col md={12}>
                    <div>
                        <div className="heading formheading">
                            <h3><FontAwesomeIcon id="formicon" icon={faTasks} style={{fontSize:"30px"}} /> Orders List</h3>
                        </div>
                        <div className="mainpanel-table">
                          <Table striped bordered hover responsive>
                            <thead>
                              <tr>
                                <th>Sr. No</th>
                                <th>Customer Name</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Ram Sharma</td>
                                    <td>Knife Stand</td>
                                    <td>1</td>
                                    <td>19-10-2021</td>
                                    <td><FontAwesomeIcon id="rupeeicon" icon={faRupeeSign} style={{fontSize:"30px"}} /> 399.00</td>
                                    <td>Shipped</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Mohit Mishra</td>
                                    <td>Lounge Chair</td>
                                    <td>2</td>
                                    <td>30-09-2021</td>
                                    <td><FontAwesomeIcon id="rupeeicon" icon={faRupeeSign} style={{fontSize:"30px"}} /> 3198.00</td>
                                    <td>Shipped</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Snehal Shah</td>
                                    <td>Birds Showpiece Gold</td>
                                    <td>5</td>
                                    <td>17-09-2021</td>
                                    <td><FontAwesomeIcon id="rupeeicon" icon={faRupeeSign} style={{fontSize:"30px"}} /> 6400.00</td>
                                    <td>Delivered</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Priya Das</td>
                                    <td>Set of 2 Deer Showpieces</td>
                                    <td>1</td>
                                    <td>10-09-2021</td>
                                    <td><FontAwesomeIcon id="rupeeicon" icon={faRupeeSign} style={{fontSize:"30px"}} /> 1999.00</td>
                                    <td>Delivered</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Shivam Malhotra</td>
                                    <td>3-set Sofa, Biege</td>
                                    <td>1</td>
                                    <td>21-08-2021</td>
                                    <td><FontAwesomeIcon id="rupeeicon" icon={faRupeeSign} style={{fontSize:"30px"}} /> 23999.00</td>
                                    <td>Delivered</td>
                                </tr>
                            </tbody>
                          </Table>
                        </div>
                    </div>
                  </Col>
                </Row>
              </Container>
        </div>
    )
}

export default Orderlist
