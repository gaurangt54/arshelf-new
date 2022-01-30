/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import { Context } from "./Context";

import "bootstrap/dist/css/bootstrap.min.css";
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import loginImg from "./images/login.jpg";
import apiCall from '../Utils/apiCall'; 

function SignIn(props) {
    const [user, saveUser] = useContext(Context);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

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
        apiCall(`login`, 'POST', null, request)
            .then((res) => {
                if (res.data.success) {
                    alert(res.data.message);
                    if(res.data.role == 'user'){
                        localStorage.setItem('user', JSON.stringify(res.data.user));
                        saveUser(res.data.user)
                        props.history.push("/");
                    }
                    else if(res.data.role == 'admin'){
                        props.history.push("/admin");
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

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user)
            props.history.push('/')
    }, [])

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
                                    <div>
                                        <p>
                                            Don't have an account?{" "}
                                            <a href="/register">Create one</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default SignIn;
