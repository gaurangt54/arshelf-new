/* eslint-disable */

import React, {useState, useEffect} from 'react'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import apiCall from '../Utils/apiCall'; 

import {storage} from '../firebase'

function AddProduct() {

    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({});

    useEffect(()=>{

        apiCall(`getCategories`, 'GET', null)
        .then(res=>{
            const data = res.data;
            const categories = [];
            for(let i =0; i< data.data.length; i++){
              categories.push({
                id: data.data[i]._id,
                name:data.data[i].name
              });
            };
            setCategories(categories);
          }).catch(err => {
            console.log(err);
            alert("Something went wrong, please try again!");
          });

    }, [])

    const submit = async (e) => {  
        e.preventDefault();       
        console.log(product)
        apiCall(`addProduct`, 'POST', null, product)
        .then(res=>{
            alert(res.data.message);
        })
        .catch(err=>{
            alert(err.data.message);
        })

    }

    return (
        <div>
            <Container>
                <Row>
                    <Col md={12} className="p-3">
                        <div>
                            <div className="heading formheading">
                                <h3><FontAwesomeIcon id="formicon" icon={faPlusCircle} style={{fontSize:"30px",marginRight:"10px"}} />Add Product</h3>
                            </div>
                            <div className="mainpanel-form">
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label className="formlabel">Product Name :</Form.Label>
                                        <Form.Control type="text" onChange={(event)=>{ setProduct({...product, name: event.target.value}) }} placeholder="Product Name" required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                        <Form.Label className="formlabel">Product Description:</Form.Label>
                                        <Form.Control type="text"as="textarea" className="form-textarea" rows={3} style={{resize:'none'}} onChange={(event)=>{ setProduct({...product, description: event.target.value}) }} placeholder="This is the description of the product" required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                        <Form.Label className="formlabel">Product Dealer:</Form.Label>
                                        <Form.Control type="text" style={{resize:'none'}} onChange={(event)=>{ setProduct({...product, dealer: event.target.value}) }} placeholder="Dealer who manufactured the product" required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                        <Form.Label className="formlabel">Product Dimension:</Form.Label>
                                        <Form.Control type="text" className="form-file" onChange={(event)=>{ setProduct({...product, dimension: event.target.value}) }} placeholder="l x b x h" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                        <Form.Label className="formlabel">Product 3D/AR File:</Form.Label>
                                        <Form.Control type="text" className="form-file" onChange={(event)=>{ setProduct({...product, arFile: event.target.value}) }} placeholder="Link of 3D/AR File" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                        <Form.Label className="formlabel">Category:</Form.Label>
                                        <br />
                                        <select onChange={(event)=>{ setProduct({...product, category_id: event.target.value}) }} required>
                                            <option value="0">-&nbsp;- &nbsp;Select&nbsp; -&nbsp;-</option>
                                            {categories.map((category,index) => (
                                                <option value={category.id}>{category.name}</option>
                                                ))}
                                        </select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                        <Form.Label className="formlabel">Price:</Form.Label>
                                        <Form.Control type="text" onChange={(event)=>{ setProduct({...product, price: event.target.value}) }} placeholder="00" required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                                        <Form.Label className="formlabel">Quantity:</Form.Label>
                                        <Form.Control type="text" onChange={(event)=>{ setProduct({...product, quantity: event.target.value}) }} placeholder="0" required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                                        <Form.Label className="formlabel">EOQ:</Form.Label>
                                        <Form.Control type="text" onChange={(event)=>{ setProduct({...product, eoq: event.target.value}) }} placeholder="0" required/>
                                    </Form.Group>
                                    <Form.Group controlId="formLoginButton">
                                        <Button variant="primary" type="submit" className="btn-submit btn-block"  onClick={(e)=>{submit(e)}}>Submit</Button>
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AddProduct
