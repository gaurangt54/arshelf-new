import React, { useState, useEffect, useContext } from "react";
import { Context } from "./Context";

import {Container, Row, Col, Card, Button} from 'react-bootstrap'; 
import apiCall from '../Utils/apiCall'; 

function Wishlist() {

    const [user, saveUser] = useContext(Context);
    const [wishlist, setWishlist] = useState();

    useEffect(()=>{
        if(user)
        {
            apiCall(`getProducts`, "POST", null, {wishlist: user.wishlist})
            .then((res) => {
                setWishlist(res.data.total);
                console.log(wishlist)
            })
            .catch((err) => {
                console.log(err);
                alert("Something went wrong");
            });
        }
    }, [user])

    const addToCart = (product) => {
        if(user.cart.find(c=> c.name===product.name)){
            alert("Product already exists in cart")
        }
        else{

            user.wishlist.map((cartItem, index)=>{
                if(cartItem.id===product.id){
                    user.wishlist.splice(index,1);
                }               
            })

            const p = {
                id: product._id,
                name: product.name,
                arFile: product.arFile,
                category_id: product.category_id,
                price: product.price,
                quantity: 1
            }
            let cart = user.cart;
            cart.push(p) 
    
            apiCall(`updateUser`, 'PUT', null, {email:user.email, cart:cart})
            .then(res=>{ 
                console.log(res.data)
                saveUser({...user, cart:cart})
                alert("Product Added to Cart")
            })
            .catch(err=>{ 
                alert("Something went wrong")
            })
    
        }
    }

    const removeFromWishlist = (product) => {
        console.log("Click")

        user.wishlist.map((cartItem, index)=>{
            if(cartItem.id===product.id){
                user.wishlist.splice(index,1);
            }               
        })

        apiCall(`updateUser`, 'PUT', null, {email:user.email, wishlist:user.wishlist})
            .then(res=>{ 
                console.log(res.data)
                saveUser({...user, wishlist:user.wishlist})
                alert("Product Removed from Wishlist")
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
                    Wishlist
                </div>
                </Col>
                <Col md={3}>
                </Col>
            </Row>
            <Row>
                {user && wishlist && wishlist.length!==0?
                    wishlist.map((product,index)=>(
                        <Col xl={3} lg={4} md={6}>
                        <Card className="card-card product-card">

                        <div className='add-to-wishlist' onClick={()=>{removeFromWishlist(product)}}>                        
                            <a href="#" className="my-3 mx-2" >x</a>
                        </div>

                            <div className="contain-card-img">
                            <model-viewer className="viewer" style={{height:"250px",width:"100%",backgroundColor:"#17171A!important"}} src={product.arFile} alt='A 3D model of a chair' camera-orbit="-90deg" auto-rotate='' camera-controls='' background-color='#455A64'></model-viewer>
                            </div>
                            <hr />
                            
                            <Card.Body>
                                <Card.Text className="container text-center">
                                <strong style={{fontSize:"20px"}}>{product.name}</strong>
                                <br />
                                <p className="para">From ₹ {product.price}</p>
                                <Button className="btn-secondary" onClick={()=>{addToCart(product)}} >Add to Cart</Button>
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

export default Wishlist;
