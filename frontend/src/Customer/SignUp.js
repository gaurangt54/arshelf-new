/* eslint-disable */
import React, { useState }  from 'react'

import "bootstrap/dist/css/bootstrap.min.css";
import {Container, Row, Col, Form, Button,} from "react-bootstrap";
import loginImg from "./images/signup.jpg";
import apiCall from '../Utils/apiCall'; 

function SignUp(props) {

   	const [user, setUser] = useState({}) 

    const onSubmit = (event) => {
		event.preventDefault()
		console.log(user)
		if(user.confirmPassword === user.password){
			
			apiCall(`signup`, 'POST', null, user).then( (res)=> {
				console.log(res.data);
				alert(res.data.message);

				console.log("About to Redirect!");
				props.history.push("/"); 

			})
			.catch((err)=>{
				console.log("Error: "+err);
				alert(res.data.message);
				 
			})

		}else{
			alert("Please enter correct credentials!");
		}

		
	}

    return (
        <>
			<div>
		        <Container fluid="lg">
		          <Row style={{height:"80vh"}}>
		            <Col md={5}>
		              <div style={{padding:"20px 0 0 20px",margin:"0 auto"}}>
		              <div className="heading" style={{textAlign:"center"}}>
		                <h1>REGISTER</h1>
		              </div>
		              <div>
		                <Form onSubmit={onSubmit}>
		                	<Form.Group controlId="formBasicName">
			                    <Form.Label>Name:</Form.Label>
			                    <Form.Control type="text" onChange={(e) => setUser({...user, name: e.target.value})} placeholder="Enter your Name" required />
			                </Form.Group><br/>
		                  <Form.Group controlId="formBasicEmail">
		                    <Form.Label>Email Id:</Form.Label>
		                    <Form.Control type="email" onChange={(e) => setUser({...user, email: e.target.value})} placeholder="Enter your Email Id" required />
		                  </Form.Group><br/>
		                   <Form.Group className="mb-3" controlId="formBasicPhoneNo">
		                        <Form.Label>Phone Number:</Form.Label>
		                        <Form.Control type="number" onChange={(e) => setUser({...user, phoneNumber: e.target.value})} placeholder="Enter your Phone Number" required />
		                    </Form.Group>
		                  <Form.Group controlId="formBasicPassword">
		                    <Form.Label>Password:</Form.Label>
		                    <Form.Control type="password" onChange={(e) => setUser({...user, password: e.target.value})} placeholder="Enter your Password" required />
		                  </Form.Group><br/>
		                  <Form.Group controlId="formBasicConfirmPassword">
		                    <Form.Label>Confirm Password:</Form.Label>
		                    <Form.Control type="password" onChange={(e) => setUser({...user, confirmPassword: e.target.value})} placeholder="Re-enter Password" required />
		                  </Form.Group>
		                  <Form.Group controlId="formLoginButton">
		                    <Button variant="primary" type="submit" block style={{margin:"30px 0px",width:"100%"}}>Register</Button>
		                  </Form.Group>
		                </Form>
		                <div>
		                  <p>Already registered? <a href="/login">Login</a></p>
		                </div>
		              </div>
		              </div>
		            </Col>
		            <Col md={7}>
		              <div className="loginImage">
		                <img src={loginImg} width="100%" height="700vh" style={{padding:"20px 0 0 20px",margin:"0 auto"}} alt=""/>
		              </div>
		            </Col>
		          </Row>
		        </Container>
		      </div>	
		    </>
    )
}

export default SignUp