/* eslint-disable */
import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Card, Button} from 'react-bootstrap'; 
import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta } from 'react-countdown';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './style.css';
import apiCall from '../Utils/apiCall'; 

import chair from './images/chair.glb';
import chairUsdz from './images/chair.usdz';
import RelatedProduct from './RelatedProduct';

function Home() {

    const [products, getProducts] = useState();
    console.log(products)

    useEffect(()=>{
        apiCall(`getProducts`, 'GET', null)
        .then(res=>{
            getProducts(res.data.data)
        })
    }, [])

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    const renderer = ({ hours = 11, minutes = 12, seconds = 60 }) => (
        <span>{zeroPad(hours)}h :{zeroPad(minutes)}m :{zeroPad(seconds)}s</span>
    );

    return (
        <div>
            <Container fluid className="home-container" id="home">
                <Row>
                    <Col md={6}>               
                        <div className="image-container">
                            <model-viewer className="viewer" style={{height:"470px",width:"100%",backgroundColor:"#17171A!important"}} src={chair} ios-src={chairUsdz} ar alt='A 3D model of a chair' camera-orbit="-90deg" auto-rotate='' camera-controls='' background-color='#455A64'></model-viewer>
                            
                        </div>
                    </Col>
                    <Col md={6} className="my-auto">
                        <div className="text-container">
                            
                            <h1 className="text">Best deals on furnitures, showpiece and electronics item.</h1> 
                            <h2 style={{color:"#585858", marginBottom:"20px"}}>
                                    Season Sale <span style={{color:"#007bff",fontWeight:"800",fontSize:"40px",margin:"6px"}}>|</span> 
                                    Special Offers <span style={{color:"#007bff",fontWeight:"800",fontSize:"40px",margin:"6px"}}>|</span> Get 20% Dicount
                            </h2>
                            <div className="text-small">So what are you waiting for? <strong>Order now!!</strong></div>
                            <p style={{fontSize:"20px",fontWeight:"600",color:"#808080"}}>SPECIAL DHAMAKA OFFERS ENDS IN
                                <span style={{fontSize:"35px",color:"#007bff",margin:"20px"}}><Countdown date={Date.now() + 1000000000} renderer={renderer} />
                            </span></p>
                        </div>
                    </Col>
                </Row>
            </Container>

            {products && products.length!==0? 
            <Container fluid id="features" className="my-4 py-4" style={{backgroundColor:"#dddddd", textAlign:"center"}}>
                <Row>
                    <div className="title-container text-center" >
                        <h2>Furniture</h2>
                        <hr className="hr-style" />
                    </div>
                    {
                        products.map((product, index)=>(
                            <Col md={4}>
                                <RelatedProduct key={index} product={product} />
                            </Col>
                        ))
                    }
                </Row>
                
            </Container> :null}

        </div>
    )
}

export default Home
