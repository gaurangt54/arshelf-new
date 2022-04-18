import React from 'react'
import {Card} from 'react-bootstrap';
import {withRouter} from 'react-router-dom'; 
import backendUrl from '../backendUrl'

function RelatedProduct(props) {

    const {product} = props;
    console.log(props)

    return (
        <Card className="card-card" onClick={()=>{props.history.push(`/product/${product._id}`)}}>
            <div className="contain-card-img">
            <model-viewer className="viewer" style={{height:"250px",width:"100%",backgroundColor:"#17171A!important"}} src={`${backendUrl}/download/${product.arFile}`} ar alt='A 3D model of a chair' camera-orbit="-90deg" auto-rotate='' camera-controls='' background-color='#455A64'></model-viewer>
            </div>
            <hr />
            <Card.Body>
                <Card.Text className="container">
                    <strong style={{fontSize:"18px"}}>{product.name}</strong>
                    <br /><br />
                    <p className="para">From ₹ {product.price}</p>
                    
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default withRouter(RelatedProduct)
