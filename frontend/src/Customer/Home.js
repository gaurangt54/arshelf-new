/* eslint-disable */
import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Card, Button} from 'react-bootstrap'; 
import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta } from 'react-countdown';

import './style.css';
import apiCall from '../Utils/apiCall'; 

import chair from './images/chair.glb';
import chairUsdz from './images/chair.usdz';
import CategoryCard from './CategoryCard';

import Carousel from 'react-grid-carousel'

function Home() {

    const [categories, getCategories] = useState();
    console.log(categories)

    useEffect(()=>{
        apiCall(`getCategories`, 'GET', null)
        .then(res=>{
            getCategories(res.data.data)
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
        <div style={{"font-family":"Comfortaa"}}> 
            <Container fluid className="home-container" id="home" style={{backgroundColor:"#212529"}}>
                <Row>
                    <Col md={6}>               
                        <div className="image-container">
                            <model-viewer className="viewer" style={{height:"470px",width:"100%",backgroundColor:"#17171A!important"}} src={chair} ios-src={chairUsdz} ar alt='A 3D model of a chair' camera-orbit="-90deg" auto-rotate='' camera-controls='' background-color='#455A64'></model-viewer>
                            
                        </div>
                    </Col>
                    <Col md={6} className="my-auto">
                        <div className="text-container">
                            
                            <h1 className="text text-light">Best deals on furnitures, showpiece and electronics item.</h1> 
                            <h2 style={{color:"#cccccc", marginBottom:"20px"}}>
                                    Season Sale <span style={{color:"#cccccc",fontWeight:"800",fontSize:"40px",margin:"6px"}}>|</span> 
                                    Special Offers <span style={{color:"#cccccc",fontWeight:"800",fontSize:"40px",margin:"6px"}}>|</span> Get 20% Dicount
                            </h2>
                            <div className="text-small">So what are you waiting for? <strong>Order now!!</strong></div>
                            <p style={{fontSize:"20px",fontWeight:"600",color:"#cccccc"}}>SPECIAL DHAMAKA OFFERS ENDS IN
                                <span style={{fontSize:"32px",color:"#007bff",margin:"20px"}}><Countdown date={Date.now() + 1000000000} renderer={renderer} />
                            </span></p>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container fluid className="p-5" id="aboutus" style={{backgroundColor:"#eeeeee"}}>
            <Row>
                <Col md={6} className="px-5"> 
                <div className="title-container text-center" >
                    <h2>About Us</h2>
                    <hr className="hr-style" />
                </div>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </Col>

                <Col md={6} className="px-5 text-center align-center"> 
                <img src="https://www.ikea.com/ext/ingkadam/m/55f24c0fc725d96e/original/PH181390-crop001.jpg?f=s" height="300px" />
                </Col>
                
            </Row>
                
            </Container>

            {categories && categories.length!==0? 
            <Container fluid id="features" className="py-5" style={{backgroundColor:"#dddddd", textAlign:"center"}}>
                    <div className="title-container text-center" >
                        <h2>Categories</h2>
                        <hr className="hr-style" />
                    </div>
                    <Carousel cols={3} rows={1} gap={10} loop>
                    {
                        categories.map((category, index)=>(
                            <Carousel.Item>
                                <CategoryCard key={index} category={category} />
                            </Carousel.Item>
                        ))
                    }
                    </Carousel>
            </Container> :null}

            <Container id="contactus" fluid className="p-5" style={{backgroundColor:"#eeeeee"}}>
            <Row>
  
                <Col md={6} className="px-5 text-center align-center"> 
                    <img src="https://www.ikea.com/ext/ingkadam/m/55f24c0fc725d96e/original/PH181390-crop001.jpg?f=s" height="300px" />
                </Col>

                <Col md={6} className="px-5"> 
                <div className="title-container text-center" >
                    <h2>Contact Us</h2>
                    <hr className="hr-style" />
                </div>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </Col>

                
            </Row>
            </Container>

            

        </div>
    )
}

export default Home

