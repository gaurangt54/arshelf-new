/* eslint-disable */
import React, { useState, useEffect } from "react";

import apiCall from '../Utils/apiCall'; 

import './style.css';
import {Container, Row, Col, Table, Button} from 'react-bootstrap';

function CustomizationRequests(props) {

    const [approvals, getapprovals] = useState();
    const [pages, setPages] = useState();
    const [page, setPage] = useState();
    const [total, setTotal] = useState();
    const [payload, setPayload] = useState({});
    const [viewStatus, setViewStatus] = useState();

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
        apiCall(`getCustomizationRequests`, "POST", null, {status:viewStatus})
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
    }, [viewStatus])

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

    const setapprovalStatus = (status) => {
        setapproval({...approval, status: status})
        apiCall(`updateCustomizationRequest`, 'PUT', null, {approval:approval, status:status})
        .then(res=>{
            alert(res.data.message);
            setapproval()
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
                    <div className="p-4" style={{fontWeight:"bold", fontSize:"40px"}}>Approvals</div>
                    {approval?
                        <div className="mb-3 p-3 text-center status-box" style={{backgroundColor:"#cfdee3", textAlign:"center"}}>
                            <div className="close-order" onClick={()=>{setapproval()}}>x</div>
                            Change Customization Reuqest of {approval.userName}'s {approval.product.name} to 
                            {approval.status==='Pending'?null:<button className="btn btn-warning" type="button" onClick={()=>{setapprovalStatus("Pending")}} >Pending</button>}
                            {approval.status==='Accepted'?null:<button className="btn btn-primary" type="button" onClick={()=>{setapprovalStatus("Accepted")}}>Accepted</button>}
                            {approval.status==='Declined'?null:<button className="btn btn-success" type="button" onClick={()=>{setapprovalStatus("Declined")}}>Declined</button>}
                            {approval.status==='Cancelled'?null:<button className="btn btn-danger" type="button" onClick={()=>{setapprovalStatus("Cancelled")}}>Cancelled</button>}
                            
                    </div>:null}
                    
                    <Table striped hover responsive className="admin-tables">
                        <thead style={{backgroundColor:"#eee"}}>
                            <th className="p-3">Sr. No.</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Customer Name</th>
                            <th className="p-3">Product</th>
                            <th className="">
                            <div className="dropdown">
                                <p className="dropdown-toggle hidden" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  Status (All)
                                </p>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                  <a className="dropdown-item" onClick={()=>{setViewStatus()}}>All</a>
                                  <a className="dropdown-item" onClick={()=>{setViewStatus('Accepted')}}>Accepted</a>
                                  <a className="dropdown-item" onClick={()=>{setViewStatus('Declined')}}>Declined</a>
                                  <a className="dropdown-item" onClick={()=>{setViewStatus('Pending')}}>Pending</a>
                                  <a className="dropdown-item" onClick={()=>{setViewStatus('Cancelled')}}>Cancelled</a>
                                </div>
                              </div>
                            </th>
                            <th className="p-3">Customization</th>
                            <th className="p-3">Change Status</th>
                        </thead>
                        {approvals && approvals.length!=0 ?
                        <tbody>
                            {approvals.map((approval, index)=>(
                                <tr style={index%2==0?{backgroundColor:"#ddd"}:{backgroundColor:"#eee"}} >
                                    <td className="p-3">{index+1}</td>
                                    <td className="p-3">{setDate(approval.date)[0]}</td>
                                    <td className="p-3">{approval.userName}</td>
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
                                    <td>
                                    <button className="btn btn-secondary p-n2" onClick={approval.status!="Ordered"?()=>{setapproval(approval)}:null}>
                                        Change Status
                                    </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        :<>No approvals</>}
                    </Table>
                                
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

export default CustomizationRequests
