/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import { Context } from "./Context";

import {Container, Row, Col, Form, Button} from 'react-bootstrap'; 
import apiCall from '../Utils/apiCall'; 

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartPlus, faArrowRight, faTrash } from "@fortawesome/free-solid-svg-icons";

import Rating from "./Rating";

function Product(props) {

    const [product, getProduct] = useState();
    const [quantity, setQuantity] = useState(1);
    const [review, addReview] = useState({});
    const [reviews, setReviews] = useState();
    const [newReview, setNewReview] = useState(true);
    
    const [user, saveUser] = useContext(Context);

    // Get Product Details
    useEffect(()=>{
        const id = props.match.params.id;
        apiCall(`getProductById`, 'GET', id)
        .then(res=>{
            const p = res.data.data
            let r = 0

            // Calculating Total Ratings 
            if(p.reviews && p.reviews.length!=0){
            p.reviews.map(rv=>{
                r += Number(rv.rating)
            })}
            setReviews(r); //Saving Total Reviews
            getProduct(p);
        }).catch(err => {
            alert("Something went wrong, please try again!");
            console.log(err)
        });
        
    }, [])

    // Checking whether user has already Reviewed Product
    useEffect( ()=>{
        
        if(product && user && product.reviews){
            product.reviews.map(rv=>{
                if(user.name === rv.userName)
                    setNewReview(false)
            })
        }
    }, [product, user])

    // Adding to Cart
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
    
    // Adding to Wishlist
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

    // Adding new Review
    const submitReview = (e) => {
        
        e.preventDefault();
        if(!user){
            alert("Please Login to add a Review")
        }
        else{
            const r = review;
            r['productId'] = product._id;
            r['userEmail'] = user.email;
            r['userName'] = user.name;
            if(review.rating===''){
                alert("Select Ratings");
            }
            else{
                apiCall(`addReview`, 'POST', null, r)
                .then(res=>{ 
                    alert("Review Submitted")
                    window.location.reload()
                })
                .catch(err=>{ 
                    alert("Something went wrong")
                })
            }
        }
        
    }

    //Delete Review 
    const deleteReview = (index) => {
        let r = product.reviews;
        r.splice(index, 1)
        getProduct({...product, reviews:r})
        apiCall(`updateProduct`, 'PUT', null, {_id:product._id, reviews:r})
        .then(res=>{
            alert("Review Deleted");
            window.location.reload();
        })
        .catch(err=>{
            alert(err.data.message);
        })
    }
    
    // Giving AR File and Going to Customize Site
    const customize = (ar) => {
        const a = ar.split("/")
        let al = a[a.length-1]
        props.history.push(`/customizer/${product._id}`)
        // window.location.href = (`https://arshelf-testing.herokuapp.com/app3/${al}`)
    }

    return (
        <div>
            {product?
            <Container>
                <Row className="mx-3">
                    <Col md={6}>
                        <div className="threeObj text-center">
                        <model-viewer style={{height:"500px",width:"100%",backgroundColor:"#17171A!important"}} src={product.arFile} ar alt='A 3D model of a robot' camera-orbit="-90deg" auto-rotate='' camera-controls='' background-color='#455A64'></model-viewer>
                        <p className='mt-3'>Dimension in inches: {product.length} * {product.breadth} * {product.height}. </p>
                        <button className="btn btn-outline-primary" onClick={()=>{customize(product.arFile)}}>Click here to Customize<FontAwesomeIcon className='ml-1' icon={faArrowRight}/></button>

                        {/* <input type="color" className="choose-color" value="#fdfdfd"/>
                        <input type="color" className="choose-color" value="#ff0000"/>
                        <input type="color" className="choose-color" value="#00ff00"/>
                        <input type="color" className="choose-color" value="#0000ff"/> */}
                        </div>
                    </Col>
                    <Col md={6} className="my-auto">
                    <div>
                        <p className="prod-title">{product.name}</p>
                        <p className="prod-price">Price: <span>₹{product.price}</span></p>
                        <Rating value={product.reviews ? reviews/product.reviews.length : 0} text={`${product.reviews ?product.reviews.length:0} reviews`} color={'#f8e825'} />
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
                <Row className="m-50"> 
                <p className="prod-title">Reviews</p>
                {product.reviews && product.reviews.length!==0?
                product.reviews.map((review, index)=>(
                    <div className="review-box">
                        {user && review.userName===user.name?
                        <div className='add-to-wishlist' onClick={()=>{deleteReview(index)}}>                        
                            <a href="#" className="my-3 mx-2"><FontAwesomeIcon id="wishlist-icon" icon={faTrash}/></a>
                        </div>
                        :null}
                        <div style={{fontSize:"18px"}}>{review.userName}</div>
                        <div style={{fontSize:"14px", color:"#888888"}}>{review.date}</div>
                        <Rating className="mb-n1" value={review.rating}  color={'#f8e825'} />
                        <div style={{marginTop:"-15px", fontSize:"15px"}}>{review.message}</div>
                        <hr/>
                    </div>
                )):<p>No Reviews</p>}
                </Row>
                
                {newReview?
                    <Row> 
                        <p className="prod-title">Write a Review</p>
                        <Form onSubmit={submitReview}>
                            <Form.Group controlId='rating'>
                                <Form.Label>Rating</Form.Label>
                                <select onChange={(e)=>{addReview({...review, rating:e.target.value})}}>
                                    <option value=''>Select...</option>
                                    <option value='1'>1 - Poor</option>
                                    <option value='2'>2 - Fair</option>
                                    <option value='3'>3 - Good</option>
                                    <option value='4'>4 - Very Good</option>
                                    <option value='5'>5 - Excellent</option>
                                </select>
                            </Form.Group>

                            <Form.Group controlId='comment'>
                                <Form.Label>Review</Form.Label>
                                <Form.Control type="text"as="textarea" className="form-textarea" rows={3} style={{resize:'none'}} onChange={(e)=>{addReview({...review, message:e.target.value})}} required/>
                            </Form.Group>

                            <button type='submit' className="btn btn-primary my-3"> Submit</button>

                        </Form>
                    </Row>:null}
            </Container> 
            :<Container className="text-center m-50" style={{height:"61.4vh"}}>
                Loading...    
            </Container>}
                               
        </div>
    )
}

export default Product