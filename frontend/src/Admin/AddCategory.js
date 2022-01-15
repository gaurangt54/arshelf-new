import React, {useState, useEffect} from 'react'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import apiCall from '../Utils/apiCall'; 

function AddCategory(props) {

    const [category, setCategory] = useState();

    const submit = (e) => {
        e.preventDefault();
        console.log(category);

        apiCall(`addCategory`, 'POST', null, category)
        .then(res=>{
            alert(res.data.message);
            props.history.push('/admin/manageCategory')

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
                                <h3><FontAwesomeIcon id="formicon" icon={faPlusCircle} style={{fontSize:"30px",marginRight:"10px"}} />Add Category</h3>
                            </div>
                            <div className="mainpanel-form">
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label className="formlabel">Category Name :</Form.Label>
                                        <Form.Control type="text" onChange={(event)=>{ setCategory({name: event.target.value}) }} placeholder="Category Name" />
                                    </Form.Group>
                                    
                                    <Form.Group controlId="formLoginButton">
                                        <Button variant="primary" type="submit" className="btn-submit" onClick={(e)=>{submit(e)}}>Submit</Button>
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

export default AddCategory
