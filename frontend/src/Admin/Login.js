/* eslint-disable */
import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import loginImg from "../Customer/images/login.jpg";
import apiCall from '../Utils/apiCall'; 
import PropTypes from 'prop-types';

function Login({ setToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("previous username:" + email);
        var emailId = email;
        var pass = password;
        console.log("User: " + emailId + " & pass: " + pass);
        let request = {
            email: email,
            password: pass,
        };
        console.log(request);


        apiCall(`login`, 'POST', null, request)
            .then((res) => {
                if (res.data.success) {
                    if(res.data.role == 'user'){
                        alert("You are not an authorized user");
                    }
                    else if(res.data.role == 'admin'){
                        alert(res.data.message);
                        setToken(res.data.accessToken);
                    }
                } else {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Something went wrong, please try again!");
            });
    };

    return (
        <>
           
            <div>
                <Container fluid="lg">
                    <Row style={{ height: "85vh" , padding: "1rem" }}>
                        <Col sm={8}>
                            <div className="loginImage">
                                <img src={loginImg} width="100%" height="600vh"alt="" />
                            </div>
                        </Col>

                        <Col sm={4}>
                            <div style={{ padding: "60px 0 0 40px", margin: "0 auto",}}>
                                <div className="heading" style={{ textAlign: "center" }}>
                                    <h1>LOGIN</h1>
                                </div>
                                <div>
                                    <Form>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email ID:</Form.Label>
                                            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your registered Email ID" />
                                        </Form.Group><br />
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Password:</Form.Label>
                                            <Form.Control type="password" id="inputPassword" onChange={(e) =>setPassword(e.target.value)} placeholder="Enter your Password" />
                                        </Form.Group>
                                        <Form.Group controlId="formLoginButton">
                                            <Button variant="primary" type="submit" onClick={onSubmit} block style={{margin: "30px 0px", width: "95%",}}>LOGIN</Button>
                                        </Form.Group>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Login;


Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }