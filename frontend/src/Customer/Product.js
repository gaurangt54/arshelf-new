import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Card, Button} from 'react-bootstrap'; 
import apiCall from '../Utils/apiCall'; 

function Product(props) {

    const [product, getProduct] = useState();

    useEffect(()=>{
        const id = props.match.params.id;
        console.log(id)
        apiCall(`getProductById`, 'GET', id)
        .then(res=>{
            getProduct(res.data.data)
          }).catch(err => {
            console.log(err);
            alert("Something went wrong, please try again!");
          });

    }, [])

    return (
        <div>
                {product?
                <Row className="m-50">
                    <Col md={6}>
                        <div className="threeObj">
                        <model-viewer style={{height:"500px",width:"100%",backgroundColor:"#17171A!important"}} src={product.arFile} ar alt='A 3D model of a robot' camera-orbit="-90deg" auto-rotate='' camera-controls='' background-color='#455A64'></model-viewer>
                        </div>
                    </Col>
                    <Col md={6} className="my-auto">
                    <div>
                        <p className="prod-title">{product.name}</p>
                        <p className="prod-price">Price: <span>₹{product.price}</span></p>
                        <p className="prod-stock">In Stock</p>
                        <p>Sold and fulfilled by {product.dealer}.</p>
                        <p>About this item</p>
                        <p>{product.dimension?product.dimension:<>Dimension in inches: 36 * 42 * 36.</>} </p>
                        {product.description}
                        {/* <ul>
                            <li>MV Furniture- Made In India Sheesham Wood Product | Direct Factory To Your Home</li>
                            <li>One Chair Multiple Uses : This chairs can be used as Dining Chair, Study Chair, pair with dressing table and much more..</li>
                            <li>Fits in your space, fits on your budget. Give Your Home A Luxurious Look With sheesham wood table</li>
                            <li>No Assembly Required : Chairs are Pre-Assembled</li>
                            <li>Package Includes : Set Of 2 Dining Chairs With Cushions</li>
                        </ul> */}
                    </div>
                    </Col>
                </Row>
                :<p>Loading...</p>}
                     
        </div>
    )
}

export default Product
