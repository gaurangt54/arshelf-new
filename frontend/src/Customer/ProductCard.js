/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import { Context } from "./Context";
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {withRouter} from 'react-router-dom'; 
import apiCall, {mainBackendUrl} from '../Utils/apiCall'; 

function ProductCard(props) {

    const {product} = props;
    const [user, saveUser] = useContext(Context);

    const addToCart = (product, quantity) => {
        if(user.cart.find(c=> c.name===product.name)){
            alert("Product already exists in cart")
        }
        else{
            const p = {
                id: product._id,
                name: product.name,
                arFile: product.arFile,
                category_id: product.category_id,
                price: product.price,
                quantity: quantity
            }
            let cart = user.cart;
            cart.push(p) 
    
            apiCall(`updateUser`, 'PUT', null, {email:user.email, cart:cart})
            .then(res=>{ 
                saveUser({...user, cart:cart})
                alert("Product Added to Cart")
            })
            .catch(err=>{ 
                alert("Something went wrong")
            })
    
        }
    }
    
    const addToWishlist = (product) => {
        if(user.wishlist.find(c=> c.name===product.name)){
            alert("Product already exists in wishlist")
        }
        else{
            let wishlist = user.wishlist;
            wishlist.push(product._id) 
    
            apiCall(`updateUser`, 'PUT', null, {email:user.email, wishlist:wishlist})
            .then(res=>{ 
                saveUser({...user, wishlist:wishlist})
                alert("Product Added to Wishlist")
            })
            .catch(err=>{ 
                alert("Something went wrong")
            })
        }
        
    }

    return (
        <Card className="card-card product-card" >
            <div className='add-to-wishlist' onClick={()=>{addToWishlist(product)}}>                        
                <a href="#" className="my-3 mx-2"><FontAwesomeIcon id="wishlist-icon" icon={faHeart}/></a>
            </div>

            <div className="contain-card-img">
            <model-viewer className="viewer" style={{height:"250px",width:"100%",backgroundColor:"#17171A!important"}} src={`${mainBackendUrl}/download/${product.arFile}`} ar alt='A 3D model of a chair' camera-orbit="-90deg" auto-rotate='' camera-controls='' background-color='#455A64'></model-viewer>
            </div>
            <hr />
            
            <Card.Body onClick={()=>{props.history.push(`/product/${product._id}`)}}>
                <Card.Text className="container">
                    <strong style={{fontSize:"20px"}}>{product.name}</strong>
                    <br />
                    <div className="para">From ₹ {product.price}</div>
                    <Button className="btn-secondary" onClick={()=>{addToCart(product, 1)}}>Add to Cart</Button>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default withRouter(ProductCard)
