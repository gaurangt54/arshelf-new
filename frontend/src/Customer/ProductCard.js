import React from 'react'
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {withRouter} from 'react-router-dom'; 

function ProductCard(props) {

    const {product} = props;

    return (
        <Card className="card-card product-card" onClick={()=>{props.history.push(`/product/${product._id}`)}}>
            <div className='add-to-wishlist'>                        
                <a href="#" className="my-3 mx-2"><FontAwesomeIcon id="wishlist-icon" icon={faHeart}/></a>
            </div>

            <div className="contain-card-img">
            <model-viewer className="viewer" style={{height:"250px",width:"100%",backgroundColor:"#17171A!important"}} src={product.arFile} ar alt='A 3D model of a chair' camera-orbit="-90deg" auto-rotate='' camera-controls='' background-color='#455A64'></model-viewer>
            </div>
            <hr />
            
            <Card.Body>
                <Card.Text className="container">
                    <strong style={{fontSize:"20px"}}>{product.name}</strong>
                    <br />
                    <p className="para">From ₹ {product.price}</p>
                    <Button className="btn-secondary" >Add to Cart</Button>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default withRouter(ProductCard)
