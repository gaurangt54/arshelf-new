/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import apiCall from "../Utils/apiCall";
import ProductCard from "./ProductCard";
import './style.css';

import Modal from 'react-modal';

function Category(props) {

    const id = props.match.params.id;
    const [category, getCategory] = useState();
    const [products, getProducts] = useState();
    const [payload, setPayload] = useState({category_id:id});
    const [pages, setPages] = useState();
    const [page, setPage] = useState();
    const [total, setTotal] = useState();
    const [dimensions, setDimensions] = useState();

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '100',
          backgroundColor: '#dddddd'
        },
    };

    // Gets CategoryId from URL and makes an API call for getting details of Category
    useEffect(() => {
        apiCall(`getCategoryById`, "GET", id)
        .then((res) => {
            getCategory(res.data.data);
        })
        .catch((err) => {
            console.log(err);
            alert("Something went wrong");
        });
    }, []);

    // Gets Products of Category ID mentioned in URL
    useEffect(()=>{
        apiCall(`getProducts`, "POST", null, payload)
        .then((res) => {
            getProducts(res.data.products);
            setPages(res.data.pages)
            setPage(res.data.page)
            setTotal(res.data.total)
        })
        .catch((err) => {
            console.log(err);
            alert("Something went wrong");
        });
    }, [payload])

    // New Page Number is mentioned and Next Range of Products are retrieved
    const paging = (page) => {
        let p = payload;
        p['page'] = page;
        setPayload(p)

        apiCall(`getProducts`, "POST", null, payload)
        .then((res) => {
            getProducts(res.data.products);
            setPages(res.data.pages)
            setPage(res.data.page)
            setTotal(res.data.total)
        })
        .catch((err) => {
            console.log(err);
            alert(err.data.message);
        });
    }

    return <div className="relative">
        {category && products ?
        <Container fluid className="p-5" style={{backgroundColor:"#eeeeee"}}>
            <Row>
                <Col md={12}>
                <div className="title-container text-center px-3 pb-3" style={{fontSize:"30px", fontWeight:"bold"}} >
                    {category.name}
                </div>
                </Col>
                <Col md={12} className="text-center">
                    <input className="input-lg-text" type="text" onChange={(event)=>{setPayload({...payload, name:event.target.value})}} placeholder="Product Name" />
                    {/* <input className="input-sm-text" type="text" onChange={(event)=>{setPayload({...payload, length:event.target.value})}} placeholder="Max Length" />
                    <input className="input-sm-text" type="text" onChange={(event)=>{setPayload({...payload, breadth:event.target.value})}} placeholder="Max Breadth" />
                    <input className="input-sm-text" type="text" onChange={(event)=>{setPayload({...payload, height:event.target.value})}} placeholder="Max Height" /> */}
                    <select onChange={(event)=>{setPayload({...payload, sort:event.target.value})}}>
                        <option value={1}>Newly Added</option>
                        <option value={2}>Price: Low to High</option>
                        <option value={3}>Price: High to Low</option>
                    </select>
                    <button className="btn btn-primary" onClick={()=>{setDimensions(true)}}>Search as per your Dimensions</button>

                </Col>
            </Row>

                    <Modal isOpen={dimensions} onRequestClose={()=>{setDimensions(false)}} style={customStyles} contentLabel="Example Modal">
                    <div className="p-1 text-center">
                        <h4>Enter your Dimensions</h4>
                        <input className="input-lg-text" type="text" onChange={(event)=>{setPayload({...payload, length:event.target.value})}} placeholder="Length in inches" /><br/>
                        <input className="input-lg-text" type="text" onChange={(event)=>{setPayload({...payload, breadth:event.target.value})}} placeholder="Breadth in inches" /><br/>
                        <input className="input-lg-text" type="text" onChange={(event)=>{setPayload({...payload, height:event.target.value})}} placeholder="Height in inches" /><br/>
                        <button className="btn btn-secondary m-3" onClick={()=>{setDimensions(false)}}>Proceed</button>
                    </div>
                    
                    </Modal>
            
            <Row className="my-3">
                {products.map((product, index)=>(
                    <Col xl={3} lg={4} md={6}>
                    <ProductCard key={index} product={product} />
                    </Col>
                ))}
            </Row>

            <Row className="mt-5">
            {pages && total && pages.length!==0 ?
            <>
            <div className="pagination">
                <button className={page===1?"pageDisabled":"pageNo"} onClick={()=>paging(page-1)} disabled={page===1?true:false}>&#60;</button>
                    {pages.map((i, index) => {
                        return <button key={index} className={page===i?"pageActive":"pageNo"} onClick={()=>paging(i)}>{i}</button>
                    })}
                <button className={page===pages.length?"pageDisabled":"pageNo"} onClick={()=>paging(page+1)} disabled={page===pages.length?true:false}>&#62;</button>
            </div>

            <div className=" my-2 text-center text-gray-600">
                Showing {(page-1)*12+1} - {page===pages.length?total.length:page*12} out of {total.length} Products
            </div>
            </> : null}
            </Row>
            
        </Container>
        :<Container className="text-center m-50" style={{height:"61.4vh"}}>
            Loading...    
        </Container>}
    </div>;
}

export default Category;
