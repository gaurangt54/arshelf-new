import React, { useState, useEffect, useContext } from "react";
import { Context } from "./Context";

import { Container, Row, Col, Button, Form } from "react-bootstrap";
import apiCall from "../Utils/apiCall";

function Profile() {
    
    const [user, saveUser] = useContext(Context);
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const changePassword = (e) => {
        e.preventDefault();
        if(newPassword !== confirmPassword)
            alert("New Password & Confirm Password doesn't match")
        else{
            apiCall(`changePassword`, 'POST', null, {email: user.email, oldPassword:oldPassword, newPassword:newPassword})
            .then(res=>{ 
                console.log(res.data)
                alert(res.data.message)
            })
            .catch(err=>{ 
                alert("Something went wrong")
            })
            
        }
    }

    return <div>
        {user?
        <Container fluid className="p-4" style={{backgroundColor:"#fafafa"}}>
            <div className="p-2 text-center" style={{fontWeight:"bold", fontSize:"32px"}}>
                My Profile
            </div>
            <hr />
            <Row>
                <Col md={6}>
                <div className="p-2 text-center" style={{fontWeight:"bold", fontSize:"24px"}}>
                    My Details
                </div>
                <div className="mainpanel-form p-2">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className="formlabel">Full Name :</Form.Label>
                        <Form.Control type="text" placeholder="Full Name" value={user.name} onChange={(e)=>{saveUser({...user, name: e.target.value})}} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label className="formlabel">Email Id.:</Form.Label>
                        <Form.Control type="text" className="form-file" value={user.email} placeholder="Email Id." disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label className="formlabel">Phone Number:</Form.Label>
                        <Form.Control type="text" className="form-file" value={user.phoneNumber} onChange={(e)=>{saveUser({...user, phoneNumber: e.target.value})}}  placeholder="Phone Number" />
                    </Form.Group>
                </div>
                </Col>

                <Col md={6}>
                <div className="p-2 text-center" style={{fontWeight:"bold", fontSize:"24px"}}>
                    Change Password
                </div>
                <div className="mainpanel-form p-2">
                    <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className="formlabel">Old Password :</Form.Label>
                        <Form.Control type="password" placeholder="Old Password" onChange={(e)=>{setOldPassword(e.target.value)}} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label className="formlabel">New Password:</Form.Label>
                        <Form.Control type="password" placeholder="New Password" onChange={(e)=>{setNewPassword(e.target.value)}} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label className="formlabel">Confirm New Password:</Form.Label>
                        <Form.Control type="password" placeholder="Confirm New Password" onChange={(e)=>{setConfirmPassword(e.target.value)}} required/>
                    </Form.Group>
                    <Button className="btn-secondary btn-block my-3" onClick={changePassword}>Change Password</Button>
                    </Form>
                </div>
                </Col>
            </Row>
            
        </Container>:null}
    </div>;
}

export default Profile;
