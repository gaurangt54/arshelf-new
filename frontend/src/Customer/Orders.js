/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import { Context } from "./Context";

import apiCall from '../Utils/apiCall'; 

import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Container, Row, Col, Table, Button} from 'react-bootstrap';

function Orders(props) {

    const [user, saveUser] = useContext(Context);
    const [payload, setPayload] = useState({});
    const [orders, getOrders] = useState();
    const [pages, setPages] = useState();
    const [page, setPage] = useState();
    const [total, setTotal] = useState();
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
        if(user){
            apiCall(`getOrders`, "POST", null, {userEmail: user.email})
            .then((res) => {
                setPayload({...payload, userEmail: user.email})
                getOrders(res.data.orders);
                setPages(res.data.pages)
                setPage(res.data.page)
                setTotal(res.data.total)
            })
            .catch((err) => {
                console.log(err);
                alert("Something went wrong");
            });
        }

    }, [user])

    const paging = (page) => {
        let p = payload;
        p['page'] = page;
        setPayload(p)

        apiCall(`getOrders`, "POST", null, payload)
        .then((res) => {
            getOrders(res.data.orders);
            setPages(res.data.pages)
            setPage(res.data.page)
            setTotal(res.data.total)
        })
        .catch((err) => {
            console.log(err);
            alert("Something went wrong");
        });
    }

    // Change Order Status
    const setOrderStatus = (status) => {
        setOrder({...order, status: status})

        // Update Order
        apiCall(`updateOrder`, 'PUT', null, {order:order, status:status})
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
            <Container fluid style={{backgroundColor:"#fafafa", padding:"1.5rem", minHeight:"88vh"}}>
                <div className="text-center" >
                    <div className="p-4" style={{fontWeight:"bold", fontSize:"40px"}}>Orders</div>
                    {order?
                        <div className="mb-3 p-3" style={{backgroundColor:"#ffcfcf", textAlign:"center"}}>
                                Do you want to cancel Order <u>{order.product.name}</u> ? 
                                <button className="btn btn-danger" type="button" onClick={()=>{setOrderStatus("Cancelled")}}>Yes</button> 
                                <button className="btn btn-primary" type="button" onClick={()=>{setOrder()}}>No</button>
                    </div>:null}
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
                            <th className="p-3">Cancel Order</th>
                        </thead>
                        <tbody>
                            {orders.map((order, index)=>(
                                <tr style={index%2==0?{backgroundColor:"#ddd"}:{backgroundColor:"#eee"}}>
                                    <td className="p-3">{index+1}</td>
                                    <td className="p-3">{setDate(order.date)[0]}</td>
                                    <td className="p-3" onClick={order.approvalId?()=>{props.history.push(`arview/${order.approvalId}`)}:null}>
                                        {order.product.name}
                                        {order.customization?" (CST)":null}
                                    </td>
                                    <td className="p-3">{order.quantity}</td>
                                    <td className="p-3">&#8377; {order.product.price}</td>
                                    <td className="p-3">&#8377; {order.product.price * order.quantity}</td>
                                    <td className='p-3'>{order.payment}</td>
                                    <td className='p-3'>{order.status}</td>
                                    <td className=''>
                                        {order.status!=='Cancelled' ?
                                        <button className="btn btn-danger p-n2" onClick={()=>{setOrder(order)}}>Cancel</button>:
                                        <button className="btn btn-dark p-n2" disabled >Cancel</button>

                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>:null}
                    
                    <Row className="mt-5">
                    {pages && total && pages.length!==0 ?
                    <>
                    <div className="pagination">
                        <button className={page===1?"pageDisabled":"pageNo"} onClick={()=>paging(page-1)} disabled={page===1?true:false}>&#60;</button>
                            {pages.map((i) => {
                                return <button className={page===i?"pageActive":"pageNo"} onClick={()=>paging(i)}>{i}</button>
                            })}
                        <button className={page===pages.length?"pageDisabled":"pageNo"} onClick={()=>paging(page+1)} disabled={page===pages.length?true:false}>&#62;</button>
                    </div>

                    <div className=" my-2 text-center text-gray-600">
                        Showing {(page-1)*5+1} - {page===pages.length?total.length:page*5} out of {total.length} Orders
                    </div>
                    </> : null}
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default Orders
