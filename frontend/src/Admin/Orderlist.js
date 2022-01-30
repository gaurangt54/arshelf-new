import React, { useState, useEffect } from "react";

import apiCall from '../Utils/apiCall'; 

import './style.css';
import {Container, Row, Col, Table, Button} from 'react-bootstrap';

function Orderlist() {

    const [orders, getOrders] = useState();
    const [viewStatus, setViewStatus] = useState();

    const [order, setOrder] = useState();

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
        apiCall(`getOrders`, "POST", null, {status:viewStatus})
        .then((res) => {
            console.log(res.data.orders)
            getOrders(res.data.orders);
        })
        .catch((err) => {
            console.log(err);
            alert("Something went wrong");
        });
    }, [viewStatus])

    const setOrderStatus = (status) => {
        setOrder({...order, status: status})
        console.log("Hora")
        apiCall(`updateOrder`, 'PUT', null, {id:order._id, status:status})
        .then(res=>{
            alert(res.data.message);
            setOrder()
            window.location.reload()
        })
        .catch(err=>{
            alert("Something went wrong");
        })
    }

    return (
        <div>
            <Container fluid style={{backgroundColor:"#fafafa", padding:"1rem 4rem 3rem 4rem", minHeight:"88vh"}}>
                <div className="text-center" >
                    <div className="p-4" style={{fontWeight:"bold", fontSize:"40px"}}>Orders</div>
                    {order?
                        <div className="mb-3 p-3 text-center status-box" style={{backgroundColor:"#cfdee3", textAlign:"center"}}>
                            <div className="close-order" onClick={()=>{setOrder()}}>x</div>
                            Change Delivery Status of {order.userName}'s {order.product.name} to 
                            {order.status==='Pending'?null:<button className="btn btn-warning" type="button" onClick={()=>{setOrderStatus("Pending")}} >Pending</button>}
                            {order.status==='Dispatched'?null:<button className="btn btn-primary" type="button" onClick={()=>{setOrderStatus("Dispatched")}}>Dispatched</button>}
                            {order.status==='Delivered'?null:<button className="btn btn-success" type="button" onClick={()=>{setOrderStatus("Delivered")}}>Delivered</button>}
                            {order.status==='Cancelled'?null:<button className="btn btn-danger" type="button" onClick={()=>{setOrderStatus("Cancelled")}}>Cancelled</button>}
                            
                    </div>:null}
                    
                    <Table striped hover responsive className="admin-tables">
                        <thead style={{backgroundColor:"#eee"}}>
                            <th className="p-3">Sr. No.</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Customer Name</th>
                            <th className="p-3">Product</th>
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
                                  <a className="dropdown-item" onClick={()=>{setViewStatus()}}>All</a>
                                  <a className="dropdown-item" onClick={()=>{setViewStatus('Delivered')}}>Delivered</a>
                                  <a className="dropdown-item" onClick={()=>{setViewStatus('Dispatched')}}>Dispatched</a>
                                  <a className="dropdown-item" onClick={()=>{setViewStatus('Pending')}}>Pending</a>
                                  <a className="dropdown-item" onClick={()=>{setViewStatus('Cancelled')}}>Cancelled</a>
                                </div>
                              </div>
                            </th>
                        </thead>
                        {orders && orders.length!=0 ?
                        <tbody>
                            {orders.map((order, index)=>(
                                <tr style={index%2==0?{backgroundColor:"#ddd"}:{backgroundColor:"#eee"}} onClick={()=>{setOrder(order)}}>
                                    <td className="p-3">{index+1}</td>
                                    <td className="p-3">{setDate(order.date)[0]}</td>
                                    <td className="p-3">{order.userName}</td>
                                    <td className="p-3">{order.product.name}</td>
                                    <td className="p-3">{order.quantity}</td>
                                    <td className="p-3">&#8377; {order.product.price}</td>
                                    <td className="p-3">&#8377; {order.product.price * order.quantity}</td>
                                    <td className='p-3'>{order.payment}</td>
                                    <td className='p-3'>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                        :<>No Orders</>}
                    </Table>
                   
                </div>
            </Container>
        </div>
    )
}

export default Orderlist
