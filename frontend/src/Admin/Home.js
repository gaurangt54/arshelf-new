import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Chart from "react-apexcharts";

import { faTasks, faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";

function Home() {
    const data = {
        series: [15, 55, 21, 10],
        options: {
            chart: {
                type: "donut",
            },
            labels: ["Electronics", "Furnitures", "Showpiece", "Lightings"],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
        },
    };

    const table = [
        { name: "Kinjal Parekh", product:"TV", quantity:"2", price:"79998", date:"24/01/2022" },
        { name: "Gaurang Thakkar", product:"Chair", quantity:"6", price:"11994", date:"24/01/2022" },
        { name: "Meet Panchal", product:"Sofa", quantity:"2", price:"29998", date:"24/01/2022" },
        { name: "Revathi Priyan", product:"Table", quantity:"1", price:"8999", date:"24/01/2022" },
        { name: "Jeel Shah", product:"Canape", quantity:"1", price:"14999", date:"24/01/2022" },
    ];

    return (
        <div>
            <Container fluid style={{backgroundColor:"#fcfcfc", padding:"4rem"}}>
                <Row>
                    <Col md={4}>
                        <div className="counter text-center">
                            <div className="counter-title">Orders Pending</div>
                            <div className="counter-count">4</div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="counter text-center">
                            <div className="counter-title">
                                Customization Approvals
                            </div>
                            <div className="counter-count">12</div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="counter text-center">
                            <div className="counter-title">EOQ</div>
                            <div className="counter-count">7</div>
                        </div>
                    </Col>
                    <Col md={8}>
                        <Chart
                            className="p-5"
                            options={data.options}
                            series={data.series}
                            type="donut"
                        />
                    </Col>
                    <Col md={4}>
                        <div className="counter text-center">
                            <div className="counter-title">Total Products</div>
                            <div className="counter-count">13</div>
                        </div>
                        <div className="counter text-center mt-4">
                            <div className="counter-title">Total Orders</div>
                            <div className="counter-count">17</div>
                        </div>
                        <div className="counter text-center mt-4">
                            <div className="counter-title">Total Revenue</div>
                            <div className="counter-count">27000</div>
                        </div>
                    </Col>
                </Row>
            
            </Container>

            <Container fluid style={{backgroundColor:"#ddd", padding:"1rem 4rem 3rem 4rem"}}>
            <div className="text-center" >
                    <div className="p-3" style={{fontWeight:"bold", fontSize:"36px"}}>Orders Pending</div>
                    <table className="table table-bordered admin-tables">
                        <thead style={{backgroundColor:"#eee"}}>
                            <th className="p-3">Sr. No.</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Customer Name</th>
                            <th className="p-3">Product</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Price</th>
                        </thead>
                        <tbody>
                            {table.map((order, index)=>(
                                <tr style={index%2==0?{backgroundColor:"#ddd"}:{backgroundColor:"#eee"}}>
                                    <td className="p-3">{index+1}</td>
                                    <td className="p-3">{order.date}</td>
                                    <td className="p-3">{order.name}</td>
                                    <td className="p-3">{order.product}</td>
                                    <td className="p-3">{order.quantity}</td>
                                    <td className="p-3">&#8377; {order.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container>

            <Container fluid style={{backgroundColor:"#fafafa", padding:"1rem 4rem 3rem 4rem"}}>
            <div className="text-center" >
                    <div className="p-3" style={{fontWeight:"bold", fontSize:"36px"}}>Customization Approvals</div>
                    <table className="table table-bordered admin-tables">
                        <thead style={{backgroundColor:"#eee"}}>
                            <th className="p-3">Sr. No.</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Customer Name</th>
                            <th className="p-3">Product</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Requirements</th>
                        </thead>
                        <tbody>
                            {table.map((order, index)=>(
                                <tr style={index%2==0?{backgroundColor:"#ddd"}:{backgroundColor:"#eee"}}>
                                    <td className="p-3">{index+1}</td>
                                    <td className="p-3">{order.date}</td>
                                    <td className="p-3">{order.name}</td>
                                    <td className="p-3">{order.product}</td>
                                    <td className="p-3">{order.quantity}</td>
                                    <td className="p-3">Color Red</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container>
                
            <Container fluid style={{backgroundColor:"#ddd", padding:"1rem 4rem 3rem 4rem"}}>
            <div className="text-center" >
                    <div className="p-3" style={{fontWeight:"bold", fontSize:"36px"}}>Stock Updates</div>
                    <table className="table table-bordered admin-tables">
                        <thead style={{backgroundColor:"#eee"}}>
                            <th className="p-3">Sr. No.</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Product Name</th>
                            <th className="p-3">EOQ</th>
                            <th className="p-3">Stock Remaining</th>
                            <th className="p-3">Price</th>
                        </thead>
                        <tbody>
                            {table.map((order, index)=>(
                                <tr style={index%2==0?{backgroundColor:"#ddd"}:{backgroundColor:"#eee"}}>
                                    <td className="p-3">{index+1}</td>
                                    <td className="p-3">Furnitures</td>
                                    <td className="p-3">{order.product}</td>
                                    <td className="p-3">7</td>
                                    <td className="p-3">{order.quantity}</td>
                                    <td className="p-3">&#8377; {order.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container>
        </div>
    );
}

export default Home;
