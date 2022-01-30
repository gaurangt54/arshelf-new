import React, { useState, useEffect, useContext } from "react";
import { Context } from "./Context";

import apiCall from '../Utils/apiCall'; 

import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Container, Row, Col, Table} from 'react-bootstrap';

function Orders() {

    const [user, saveUser] = useContext(Context);
    const [orders, getOrders] = useState();

    const setDate = (date1) => {
        var date;
        date1? date = new Date(date1) : date = new Date()
        let fullMonth = date.getMonth()+1;
    
        let fullDate = [
            `${digit(date.getDate())}-${digit(fullMonth)}-${date.getFullYear()}`,
            `${digit(date.getHours())}:${digit(date.getMinutes())}:${digit(date.getSeconds())}`
        ];
        return fullDate
    }
    
    const digit = (time) => {
        if(time<10) 
            return( `0${time}`);  
        return (`${time}`);
    }

    useEffect(()=>{
        apiCall(`getOrders`, "POST", null, {userEmail: user.email})
        .then((res) => {
            console.log(res.data.orders)
            getOrders(res.data.orders);
        })
        .catch((err) => {
            console.log(err);
            alert("Something went wrong");
        });

    }, [user])

    return (
        <div>
            <Container fluid style={{backgroundColor:"#fafafa", padding:"1rem 4rem 3rem 4rem", minHeight:"88vh"}}>
                <div className="text-center" >
                    <div className="p-4" style={{fontWeight:"bold", fontSize:"40px"}}>Orders</div>
                    {orders && orders.length!=0 ?
                    <Table striped hover responsive className="admin-tables">
                        <thead style={{backgroundColor:"#eee"}}>
                            <th className="p-3">Sr. No.</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Product Name</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Payment Method</th>
                            <th className="">
                            <div className="dropdown">
                                <p className="dropdown-toggle hidden" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  Status (All)
                                </p>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                  <a className="dropdown-item" href="#">All</a>
                                  <a className="dropdown-item" href="#">Delivered</a>
                                  <a className="dropdown-item" href="#">Dispatched</a>
                                  <a className="dropdown-item" href="#">Pending</a>
                                </div>
                              </div>
                            </th>
                        </thead>
                        <tbody>
                            {orders.map((order, index)=>(
                                <tr style={index%2==0?{backgroundColor:"#ddd"}:{backgroundColor:"#eee"}}>
                                    <td className="p-3">{index+1}</td>
                                    <td className="p-3">{setDate(order.date)[0]}</td>
                                    <td className="p-3">{order.product.name}</td>
                                    <td className="p-3">{order.quantity}</td>
                                    <td className="p-3">&#8377; {order.product.price}</td>
                                    <td className="p-3">&#8377; {order.product.price * order.quantity}</td>
                                    <td className='p-3'>{order.payment}</td>
                                    <td className='p-3'>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>:null}
                   
                </div>
            </Container>
        </div>
    )
}

export default Orders
