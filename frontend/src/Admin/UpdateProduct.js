/* eslint-disable */

import React, {useState, useEffect} from 'react'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Container,Row,Col,Form,Button} from 'react-bootstrap';

import axios from 'axios'; 
import backendUrl from '../backendUrl'

function UpdateProduct(props) {

    const id = props.match.params.id;
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({});

    useEffect(()=>{

        axios.get(`${backendUrl}/getProductById/${id}`)
        .then(res=>{
            setProduct(res.data.data)
        }).catch(err => {
            console.log(err);
            alert("Something went wrong, please try again!");
        });

        axios.get(`${backendUrl}/getCategories/`)
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
        
        axios.put(`${backendUrl}/updateProduct/`, product)
        .then(res=>{
            alert(res.data.message);
            props.history.push('/admin/manageProduct')
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
                        <div className="text-center p-4" style={{fontWeight:"bold", fontSize:"40px"}}>Update Product</div>
                            <div className="mainpanel-form">
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label className="formlabel">Product Name :</Form.Label>
                                        <Form.Control type="text" onChange={(event)=>{ setProduct({...product, name: event.target.value}) }} placeholder="Product Name" value={product.name} required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                        <Form.Label className="formlabel">Product Description:</Form.Label>
                                        <Form.Control type="text"as="textarea" className="form-textarea" value={product.description} rows={4} style={{resize:'none'}} onChange={(event)=>{ setProduct({...product, description: event.target.value}) }} placeholder="This is the description of the product" required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                        <Form.Label className="formlabel">Product Dimension (length x width x height in inches)</Form.Label><br/>
                                        <input type="text" className="form-file p-1 mr-3" value={product.length} onChange={(event)=>{ setProduct({...product, length: event.target.value}) }} placeholder="Length" />
                                        <input type="text" className="form-file p-1 mr-3" value={product.breadth} onChange={(event)=>{ setProduct({...product, breadth: event.target.value}) }} placeholder="Breadth" />
                                        <input type="text" className="form-file p-1 mr-3" value={product.height} onChange={(event)=>{ setProduct({...product, height: event.target.value}) }} placeholder="Height" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                        <Form.Label className="formlabel">Product 3D/AR File:</Form.Label>
                                        <Form.Control type="text" className="form-file" value={product.arFile} onChange={(event)=>{ setProduct({...product, arFile: event.target.value}) }} placeholder="Link of 3D/AR File" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                        <Form.Label className="formlabel">Category:</Form.Label>
                                        <br />
                                        <select onChange={(event)=>{ setProduct({...product, category_id: event.target.value}) }} required>
                                            <option value="0">-&nbsp;- &nbsp;Select&nbsp; -&nbsp;-</option>
                                            {categories.map((category,index) => (
                                                <option value={category.id} className={product.category_id===category.id?"bg-primary":null}>{category.name}</option>
                                                ))}
                                        </select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                        <Form.Label className="formlabel">Price:</Form.Label>
                                        <Form.Control type="text" value={product.price} onChange={(event)=>{ setProduct({...product, price: event.target.value}) }} placeholder="00" required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                                        <Form.Label className="formlabel">Quantity:</Form.Label>
                                        <Form.Control type="text" value={product.quantity} onChange={(event)=>{ setProduct({...product, quantity: event.target.value}) }} placeholder="0" required/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                                        <Form.Label className="formlabel">EOQ:</Form.Label>
                                        <Form.Control type="text" value={product.eoq} onChange={(event)=>{ setProduct({...product, eoq: event.target.value}) }} placeholder="0" required/>
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

export default UpdateProduct
