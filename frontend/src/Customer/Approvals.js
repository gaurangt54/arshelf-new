/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import { Context } from "./Context";

import apiCall from '../Utils/apiCall'; 

import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Container, Row, Col, Table, Button} from 'react-bootstrap';

function Approvals(props) {

    const [user, saveUser] = useContext(Context);
    const [payload, setPayload] = useState({});
    const [approvals, getapprovals] = useState();
    const [pages, setPages] = useState();
    const [page, setPage] = useState();
    const [total, setTotal] = useState();
    const [approval, setapproval] = useState();

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
            apiCall(`getCustomizationRequests`, "POST", null, {userEmail: user.email})
            .then((res) => {
                setPayload({...payload, userEmail: user.email})
                getapprovals(res.data.approvals);
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

        apiCall(`getCustomizationRequests`, "POST", null, payload)
        .then((res) => {
            getapprovals(res.data.approvals);
            setPages(res.data.pages)
            setPage(res.data.page)
            setTotal(res.data.total)
        })
        .catch((err) => {
            console.log(err);
            alert("Something went wrong");
        });
    }

    // Change approval Status
    const setapprovalStatus = (status) => {
        setapproval({...approval, status: status})

        // Update approval
        apiCall(`updateapproval`, 'PUT', null, {approval:approval, status:status})
        .then(res=>{
            alert(res.data.message);
            setapproval()
            window.location.reload()
        })
        .catch(err=>{
            alert("Something went wrong");
        })
    }

    const addToCart = (approval) => {
        
        const p = {
            id: approval.product._id,
            name: approval.product.name,
            arFile: approval.product.arFile,
            category_id: approval.product.category_id,
            price: approval.product.price,
            quantity: 1,
            customization: approval.customization,
            approvalId: approval._id
        }
        
        let cart = user.cart;
        cart.push(p) 

        apiCall(`updateUser`, 'PUT', null, {email:user.email, cart:cart})
        .then(res=>{ 
            saveUser({...user, cart:cart})
            alert("Product Added to Cart")
        })
        .catch(err=>{ 
            alert("Something went wrong")
        })
    
    }

    return (
        <div>
            <Container fluid style={{backgroundColor:"#fafafa", padding:"1rem 4rem 3rem 4rem", minHeight:"88vh"}}>
                <div className="text-center" >
                    <div className="p-4" style={{fontWeight:"bold", fontSize:"40px"}}>Approvals</div>
                    {approval?
                        <div className="mb-3 p-3" style={{backgroundColor:"#ffcfcf", textAlign:"center"}}>
                                Do you want to cancel approval <u>{approval.product.name}</u> ? 
                                <button className="btn btn-danger" type="button" onClick={()=>{setapprovalStatus("Cancelled")}}>Yes</button> 
                                <button className="btn btn-primary" type="button" onClick={()=>{setapproval()}}>No</button>
                    </div>:null}
                    {approvals && approvals.length!=0 ?
                    <Table striped hover responsive className="admin-tables">
                        <thead style={{backgroundColor:"#eee"}}>
                            <th className="p-3">Sr. No.</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Product Name</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Customization</th>
                            <th className="p-3">Cancel approval</th>
                        </thead>
                        <tbody>
                            {approvals.map((approval, index)=>(
                                <tr style={index%2==0?{backgroundColor:"#ddd"}:{backgroundColor:"#eee"}}>
                                    <td className="p-3">{index+1}</td>
                                    <td className="p-3">{setDate(approval.date)[0]}</td>
                                    <td className="p-3">{approval.product.name}</td>
                                    <td className='p-3'>{approval.status}</td>
                                    <td className=''>
                                        {approval.customization?
                                        <button className="btn btn-primary p-n2" onClick={()=>{props.history.push(`arview/${approval._id}`)}}>
                                            View
                                        </button>
                                        :"No Customization"
                                        }
                                    </td>
                                    <td className=''>
                                        {approval.status=='Cancelled' || approval.status=='Ordered' ?
                                        <button className="btn btn-dark p-n2" disabled >Cancel</button>:
                                        approval.status==='Accepted'?
                                        <button className="btn btn-dark p-n2" onClick={()=>{addToCart(approval)}} >Add to Cart</button>
                                        :
                                        <button className="btn btn-danger p-n2" onClick={()=>{setapproval(approval)}}>Cancel</button>
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
                        Showing {(page-1)*5+1} - {page===pages.length?total.length:page*5} out of {total.length} approvals
                    </div>
                    </> : null}
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default Approvals
