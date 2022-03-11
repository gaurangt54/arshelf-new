import React, { useState, useEffect, useContext } from "react";
import { Context } from "./Context";

import {Container, Row, Col, Card, Button} from 'react-bootstrap'; 
import apiCall from '../Utils/apiCall'; 

function Cart(props) {

    const [user, saveUser] = useContext(Context);
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        let t = 0
        if(user && user.cart){
            user.cart.map((product)=>{
                t += product.price * product.quantity               
            })
            setTotal(t)
        }
    }, [user])

    const removeFromCart = (product) => {
        user.cart.map((cartItem, index)=>{
            if(cartItem.id===product.id){
                user.cart.splice(index,1);
            }               
        })

        apiCall(`updateUser`, 'PUT', null, {email:user.email, cart:user.cart})
            .then(res=>{ 
                console.log(res.data)
                saveUser({...user, cart:user.cart})
                alert("Product Removed from Cart")
            })
            .catch(err=>{ 
                alert("Something went wrong")
            })
    }

    const increaseQuantity = (product) => {
        user.cart.map((cartItem, index)=>{
            if(cartItem.id===product.id){
                user.cart[index].quantity+=1
            }               
        })

        apiCall(`updateUser`, 'PUT', null, {email:user.email, cart:user.cart})
            .then(res=>{ 
                console.log(res.data)
                saveUser({...user, cart:user.cart})
                alert("Product Quantity Increased")
            })
            .catch(err=>{ 
                alert("Something went wrong")
            })
    }

    const decreaseQuantity = (product) => {
        user.cart.map((cartItem, index)=>{
            if(cartItem.id===product.id){
                user.cart[index].quantity>1 ? user.cart[index].quantity-=1 : user.cart.splice(index,1);
            }               
        })

        apiCall(`updateUser`, 'PUT', null, {email:user.email, cart:user.cart})
            .then(res=>{ 
                console.log(res.data)
                saveUser({...user, cart:user.cart})
                alert("Product Quantity Decreased")
            })
            .catch(err=>{ 
                alert("Something went wrong")
            })
    }

    return <div>
        <Container fluid className="p-5" style={{backgroundColor:"#eeeeee"}}>
            
            <Row>
                <Col md={9}>
                <div className="p-4" style={{fontWeight:"bold", fontSize:"32px"}}>
                    Cart
                </div>
                </Col>
                <Col md={3}>
                <button className="btn btn-secondary btn-block m-4" onClick={()=>{props.history.push('/checkout')}}>Proceed to Chekout (₹{total})</button>
                </Col>
            </Row>
            <Row>
                {user && user.cart && user.cart.length!==0?
                    user.cart.map((product,index)=>(
                        <Col xl={3} lg={4} md={6}>
                        <Card className="card-card product-card">

                            
                            <div className="contain-card-img">
                            <model-viewer className="viewer" style={{height:"250px",width:"100%",backgroundColor:"#17171A!important"}} src={product.arFile} alt='A 3D model of a chair' camera-orbit="-90deg" auto-rotate='' camera-controls='' background-color='#455A64'></model-viewer>
                            </div>
                            <hr />
                            
                            <Card.Body>
                                <Card.Text className="container text-center">
                                    <strong style={{fontSize:"20px"}}>{product.name}</strong>
                                    <br />
                                    <p className="para">{product.quantity} x ₹{product.price} = ₹{(product.quantity*product.price)}</p>
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-outline-secondary" onClick={()=>{decreaseQuantity(product)}} style={{marginRight:"0px"}}>-</button>
                                        <button type="button" class="btn btn-secondary" style={{marginRight:"0px"}}>{product.quantity}</button>
                                        <button type="button" class="btn btn-outline-secondary" onClick={()=>{increaseQuantity(product)}}>+</button>
                                        <Button className="btn-secondary" onClick={()=>{removeFromCart(product)}}>Remove</Button>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    ))
                :null}
            </Row>
        </Container>
    </div>;
}

export default Cart;
