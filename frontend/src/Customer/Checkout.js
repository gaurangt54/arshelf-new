/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import { Context } from "./Context";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

import axios from 'axios'; 
import backendUrl from '../backendUrl' 

function Checkout(props) {

    const [user, saveUser] = useContext(Context);
    const [deliveryAddress, setDeliveryAddress] = useState();
    const [totalCost, setTotalCost] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [payment, setPayment] = useState(0)
    const [loading, setLoading] = useState(false)

    // User Cart Total Cost & Quantity is calculated
    useEffect(()=>{
        let t = 0
        let q = 0
        if(user && user.cart){
            user.cart.map((product)=>{
                t += product.price * product.quantity  
                q += product.quantity           
            })
            setTotalCost(t)
            setTotalQuantity(q)
        }
    }, [user])

    // Creates an Order
    const submit = (e) => {
        e.preventDefault();
        setLoading(true)
        const order = {
            user:user,
            deliveryAddress: deliveryAddress,
            payment: payment
        }

        // API Call to Create Order
        axios.post(`${backendUrl}/createOrder/`, order)
        .then(res=>{ 
            console.log(res.data)
            saveUser({...user, cart:[]})
            setLoading(false)
            alert(res.data.message)
            props.history.push('/orders')
        })
        .catch(err=>{ 
            alert("Something went wrong")
        })
        
    }

    const razorpay = () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onerror = () => {
        alert('Razorpay SDK failed to load. Are you online?');
        };
        script.onload = async () =>{
            try{
                setLoading(true)
                const a = (totalCost + (totalQuantity * 250)) * 100
                const result = await axios.post(`${backendUrl}/makePayment/`, {amount: a});

                const { amount, id: order_id, currency } = result.data;

                const {
                    data: { key: razorpayKey },
                } = await axios.get(`${backendUrl}/getRazorpayKey/`);

                const order = {
                    user:user,
                    deliveryAddress: deliveryAddress,
                    payment: payment
                }

                const options = {
                    key: razorpayKey,
                    amount: amount.toString(),
                    currency: currency,
                    name: user.name,
                    description: 'ARShelf Order',
                    order_id: order_id,
                    handler: async function (response) {
                      await axios.post(`${backendUrl}/createOrder/`, order)
                      .then(res=>{ 
                          console.log(res.data)
                          saveUser({...user, cart:[]})
                          setLoading(false)
                          alert(res.data.message)
                          props.history.push('/orders')
                      })
                    },
                    prefill: {
                      name: user.name,
                      email: user.email,
                      contact: user.phoneNumber,
                    },
                    notes: {
                      address: deliveryAddress,
                    },
                    theme: {
                      color: '#80c0f0',
                    },
                };

                setLoading(false);
                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            }
            catch(err){
                console.log(err)
                setLoading(false)
            }
        }
        document.body.appendChild(script);
    }


    return <div>
        {user?
        <Container fluid className="p-5" style={{backgroundColor:"#fafafa"}}>
            <div className="p-2" style={{fontWeight:"bold", fontSize:"32px"}}>
                    Checkout
                </div>
            <Form>
            <Row>
                <Col md={7}>
                <div className="mainpanel-form p-2">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className="formlabel">Full Name :</Form.Label>
                            <Form.Control type="text" placeholder="Full Name" value={user.name} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label className="formlabel">Delivery Address:</Form.Label>
                            <Form.Control type="text"as="textarea" className="form-textarea" onChange={(e)=>{setDeliveryAddress(e.target.value)}} rows={3} style={{resize:'none'}} placeholder="Delivery Address" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label className="formlabel">Email Id.:</Form.Label>
                            <Form.Control type="text" className="form-file" value={user.email} placeholder="Email Id." disabled/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label className="formlabel">Phone Number:</Form.Label>
                            <Form.Control type="text" className="form-file" value={user.phoneNumber} placeholder="Phone Number" />
                        </Form.Group>
                    
                </div>
                </Col>
                <Col md={5}>
                    {loading?<p>Placing Order</p>
                    :<div className="p-2">
                    {user && user.cart && user.cart.length!==0?
                        user.cart.map((product,index)=>(
                            <Row style={{backgroundColor:"#eee", padding:"0.5rem"}}>
                                <Col sm={3} >
                                <model-viewer className="viewer" style={{height:"50px",width:"100%",backgroundColor:"#17171A!important"}} src={`${backendUrl}/download/${product.arFile}`} alt='A 3D model of a chair' camera-orbit="-90deg" auto-rotate='' camera-controls='' background-color='#455A64'></model-viewer>
                                </Col>
                                <Col sm={6} className="my-auto">
                                    {product.name}<br/>
                                    {product.quantity} x ₹{product.price}
                                </Col>
                                <Col sm={3} className="text-right my-auto" style={{fontSize:"20px", fontWeight:"700"}}>
                                ₹ {product.quantity * product.price}
                                </Col>
                                
                            </Row>
                        ))
                    :<>No Items</>}
                    
                    {user && user.cart && user.cart.length!==0?
                    <>
                    <hr style={{margin:0}} />
                    <Row style={{backgroundColor:"#eee", padding:"1rem 0.5rem 0.5rem 0.5rem"}}>
                        
                        <Col sm={6} className="my-auto" style={{fontSize:"20px", fontWeight:"700"}}>
                            Subtotal
                        </Col>
                        <Col sm={6} className="text-right my-auto" style={{fontSize:"20px", fontWeight:"700"}}>
                            ₹ {totalCost}
                        </Col>
                    </Row>
                    <Row style={{backgroundColor:"#eee", padding:"0.5rem"}}>
                        
                        <Col sm={6} className="my-auto" style={{fontSize:"20px", fontWeight:"700"}}>
                            Shipping
                        </Col>
                        <Col sm={6} className="text-right my-auto" style={{fontSize:"20px", fontWeight:"700"}}>
                            ₹ {totalQuantity * 250}
                        </Col>
                    </Row>
                    <hr style={{margin:0}} />
                    <Row style={{backgroundColor:"#eee", padding:"1rem 0.5rem 0.5rem 0.5rem"}}>
                        
                        <Col sm={6} className="my-auto" style={{fontSize:"24px", fontWeight:"700"}}>
                            Total
                        </Col>
                        <Col sm={6} className="text-right my-auto" style={{fontSize:"24px", fontWeight:"700"}}>
                            ₹ {totalCost + (totalQuantity * 250)}
                        </Col>
                    </Row>

                    <hr style={{margin:0}} />
                    <Row style={{backgroundColor:"#eee", padding:"1rem 0.5rem 0.5rem 1rem"}}>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="payment" value="COD" onClick={()=>{setPayment("COD")}} id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                            Cash On Delivery
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="payment" value="Online" onClick={()=>{setPayment("Online")}} id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                            Online Transaction
                        </label>
                    </div>
                    <Button className="btn-secondary btn-block my-3" onClick={payment==="Online"?razorpay:submit} disabled={payment===0 || !deliveryAddress}>Proceed to {payment==="COD"?"Order":"Payment"}</Button>
                        
                    </Row>

                    </>:null}


                    </div>}
                </Col>   
            </Row>
            </Form>
        </Container>
        :null}
    </div>;
}

export default Checkout;
