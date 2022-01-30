/* eslint-disable */
import React, {useState, useEffect, useContext} from 'react'
import { Context } from "./Context";

import {withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap'; 
import { faCartArrowDown, faHeart, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import apiCall from '../Utils/apiCall'; 

function Header(props) {

    const [categories, getCategories] = useState()
    const [user, saveUser] = useContext(Context);

    useEffect(()=>{

        const u = JSON.parse(localStorage.getItem('user'));
        if(u)
            saveUser(u)
        console.log(user)
        apiCall(`getCategories`, 'GET', null)
        .then(res=>{
            getCategories(res.data.data)
        })
    }, [])

    const logout = () => {
        saveUser()
        props.history.push('/login')
    }

    return (
        <div id="nav-section">
            <Navbar className="navbar" expand="md" bg="dark" variant="dark" style={{"font-family":"Comfortaa"}}>
                <Navbar.Brand className="brand" onClick={()=>{props.history.push('/')}} style={{"font-size":"24px"}}>
                    ARShelf
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    <Nav className="ml-auto"> 
                    
                        <Nav.Link className="px-3" href="/#aboutus">About Us</Nav.Link>
                        {categories && categories.length !==0 ?
                        <NavDropdown className="px-3" title="Products" id="basic-nav-dropdown">
                            {categories.map((category, index)=>(
                                <NavDropdown.Item href={`/category/${category._id}`} >{category.name}</NavDropdown.Item>
                            ))}
                        </NavDropdown>
                        :null}
                        <Nav.Link className="px-3" href="/#contactus">Contact Us</Nav.Link>

                    </Nav>
                    <Nav className="ml-auto">
                        <a onClick={()=>{props.history.push('/wishlist')}} className="navbar-icon my-3 mx-2"><FontAwesomeIcon id="wishlist-icon" icon={faHeart}/></a>
                        <a onClick={()=>{props.history.push('/cart')}} className="navbar-icon my-3 mx-2"><FontAwesomeIcon id="cart-icon" icon={faCartArrowDown}/></a>
                        {!user?
                        <Button type="button" className=" mx-2" onClick={()=>{props.history.push('/login')}}>Log In</Button>
                        :
                        <NavDropdown className="my-2 mx-2 user-dropdown" style={{right:0, left:"auto"}} title={ <a href="#" className="navbar-icon mx-1" ><FontAwesomeIcon id="user-icon" icon={faUserCircle}/></a>} id="basic-nav-dropdown">
                            <NavDropdown.Item >{user.name}</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{props.history.push('/profile')}}>My Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{props.history.push('/orders')}}>My Orders</NavDropdown.Item>
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default withRouter(Header)
