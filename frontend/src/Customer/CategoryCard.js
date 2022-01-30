import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import categoryImage from './images/category.jpg';

function CategoryCard(props) {

    const {category} = props

    return (
        <Card className="card-card" onClick={()=>{props.history.push(`/category/${category._id}`)}}>
            <div className="contain-card-img mt-4">
                <img src={categoryImage} />
            </div>
            <hr />
            <Card.Body>
                <Card.Text className="container">
                    <strong style={{fontSize:"30px"}}>{category.name}</strong>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default withRouter(CategoryCard);
