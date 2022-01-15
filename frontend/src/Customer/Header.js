/* eslint-disable */
import React from 'react'

import {withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Navbar, Nav, Button} from 'react-bootstrap'; 
import { faCartArrowDown, faHeart } from "@fortawesome/free-solid-svg-icons";

function Header(props) {
    return (
        <div id="nav-section">
            <Navbar className="navbar" expand="md" bg="light" variant="light">
                <Navbar.Brand className="brand" onClick={()=>{props.history.push('/')}}>
                    ARShelf
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-2">    
                        <Nav.Link href="/arshelf/electronics">Electronics</Nav.Link>
                        <Nav.Link href="/arshelf/furniture">Furniture</Nav.Link>
                        <Nav.Link href="/arshelf/showpiece">Showpiece</Nav.Link>
                        <Nav.Link href="/arshelf/contactus">Contact Us</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <a href="#" className="navbar-icon my-2 mx-2 text-danger"><FontAwesomeIcon id="wishlist-icon" icon={faHeart}/></a>
                        <a href="#" className="navbar-icon my-2 mx-2"><FontAwesomeIcon id="cart-icon" icon={faCartArrowDown}/></a>
                        <Button type="button" className=" mx-2" onClick={()=>{props.history.push('/login')}}>Log In</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default withRouter(Header)
