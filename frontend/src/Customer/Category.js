import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import apiCall from "../Utils/apiCall";
import ProductCard from "./ProductCard";
import './style.css';

function Category(props) {

    const id = props.match.params.id;
    const [category, getCategory] = useState();
    const [products, getProducts] = useState();
    const [payload, setPayload] = useState({category_id:id});
    const [pages, setPages] = useState();
    const [page, setPage] = useState();
    const [total, setTotal] = useState();

    useEffect(() => {
        apiCall(`getCategoryById`, "GET", id)
        .then((res) => {
            getCategory(res.data.data);
        })
        .catch((err) => {
            console.log(err);
            alert(err.data.message);
        });
    }, []);

    useEffect(()=>{
        apiCall(`getProducts`, "POST", null, payload)
        .then((res) => {
            getProducts(res.data.products);
            setPages(res.data.pages)
            setPage(res.data.page)
            setTotal(res.data.total)
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err);
            alert("Something went wrong");
        });
    }, [payload])

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
                <Col md={3}>
                <div className="title-container px-3" style={{fontSize:"28px", fontWeight:"bold"}} >
                    {category.name}
                </div>
                </Col>
                <Col md={9}>
                    <input className="input-lg-text" type="text" onChange={(event)=>{setPayload({...payload, name:event.target.value})}} placeholder="Product Name" />
                    <input className="input-sm-text" type="text" onChange={(event)=>{setPayload({...payload, length:event.target.value})}} placeholder="Max Length" />
                    <input className="input-sm-text" type="text" onChange={(event)=>{setPayload({...payload, breadth:event.target.value})}} placeholder="Max Breadth" />
                    <input className="input-sm-text" type="text" onChange={(event)=>{setPayload({...payload, height:event.target.value})}} placeholder="Max Height" />
                    <select>
                        <option value={0}>Newly Added</option>
                        <option value={1}>Price: Low to High</option>
                        <option value={-1}>Price: High to Low</option>
                        <option value={2}>Highly Rated</option>
                    </select>
                </Col>
            </Row>
            
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
                    {pages.map((i) => {
                        return <button className={page===i?"pageActive":"pageNo"} onClick={()=>paging(i)}>{i}</button>
                    })}
                <button className={page===pages.length?"pageDisabled":"pageNo"} onClick={()=>paging(page+1)} disabled={page===pages.length?true:false}>&#62;</button>
            </div>

            <div className=" my-2 text-center text-gray-600">
                Showing {(page-1)*12+1} - {page===pages.length?total.length:page*12} out of {total.length} Products
            </div>
            </> : null}
            </Row>
            
        </Container>
        :null}
    </div>;
}

export default Category;
