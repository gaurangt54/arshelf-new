import React, { useState, useEffect, useContext } from "react";
import { Context } from "./Context";

import {Container, Row, Col, Card, Button} from 'react-bootstrap'; 
import apiCall from '../Utils/apiCall'; 

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartPlus } from "@fortawesome/free-solid-svg-icons";


function Product(props) {

    const [product, getProduct] = useState();
    const [quantity, setQuantity] = useState(1);

    const [user, saveUser] = useContext(Context);
    console.log(user)

    useEffect(()=>{
        const id = props.match.params.id;
        apiCall(`getProductById`, 'GET', id)
        .then(res=>{
            getProduct(res.data.data)
        }).catch(err => {
            alert("Something went wrong, please try again!");
        });

    }, [])

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
                console.log(res.data)
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
                console.log(res.data)
                saveUser({...user, wishlist:wishlist})
                alert("Product Added to Wishlist")
            })
            .catch(err=>{ 
                alert("Something went wrong")
            })
        }
        
    }

    return (
        <div>
            <Container>
            {product?
                <Row className="m-50">
                    <Col md={6}>
                        <div className="threeObj text-center">
                        <model-viewer style={{height:"500px",width:"100%",backgroundColor:"#17171A!important"}} src={product.arFile} ar alt='A 3D model of a robot' camera-orbit="-90deg" auto-rotate='' camera-controls='' background-color='#455A64'></model-viewer>
                        <p className='mt-3'>Dimension in inches: {product.length} * {product.breadth} * {product.height}. </p>
                        </div>
                    </Col>
                    <Col md={6} className="my-auto">
                    <div>
                        <p className="prod-title">{product.name}</p>
                        <p className="prod-price">Price: <span>₹{product.price}</span></p>
                        <p className="prod-stock">In Stock
                        <div class="btn-group ml-3">
                            <button type="button" class="btn btn-outline-secondary" style={{marginRight:"0px"}} disabled={quantity===1} onClick={()=>{setQuantity(quantity-1)}}>-</button>
                            <button type="button" class="btn btn-secondary" style={{marginRight:"0px"}}>{quantity}</button>
                            <button type="button" class="btn btn-outline-secondary" disabled={quantity===product.quantity} onClick={()=>{setQuantity(quantity+1)}}>+</button>
                        </div>
                        </p>
                        <button className="btn btn-outline-danger" onClick={()=>{addToWishlist(product)}}>Add to Wishlist <FontAwesomeIcon className='ml-1' icon={faHeart}/></button>
                        
                        <button className="btn btn-outline-dark mr-3" onClick={()=>{addToCart(product, quantity)}}>Add to Cart <FontAwesomeIcon className='ml-1' icon={faCartPlus}/></button>
                        <br/><br/>
                        {product.description}
                    </div>
                    </Col>
                </Row>
                :<p>Loading...</p>}
            </Container>                    
        </div>
    )
}

export default Product