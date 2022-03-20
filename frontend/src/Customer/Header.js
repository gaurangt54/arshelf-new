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

    // Save data of user in Header (Common for all Screens)
    // Gets Categories for Nav Menu
    useEffect(()=>{
        const u = JSON.parse(localStorage.getItem('user'));
        if(u)
            saveUser(u)
        apiCall(`getCategories`, 'GET', null)
        .then(res=>{
            getCategories(res.data.data)
        })
    }, [])

    // To Logout
    const logout = () => {
        saveUser()
        props.history.push('/login')
    }

    return (
        <div id="nav-section">
            <Navbar className="navbar" expand="md" bg="dark" variant="dark" style={{"font-family":"Comfortaa"}}>
                <Navbar.Brand className="brand" onClick={()=>{props.history.push('/')}} style={{"font-size":"24px"}}>
                    ARShelf<br/>
                    <div style={{fontSize:"10px"}}>Shop Easy with AR</div>
                    
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    <Nav className="mx-auto"> 
                    
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
                    
                </Navbar.Collapse>
                <Nav className="">
                    <div className='row'>
                        <div className="col my-2 my-md-3 ">
                            <a onClick={()=>{props.history.push('/wishlist')}} className="navbar-icon "><FontAwesomeIcon id="wishlist-icon" icon={faHeart}/></a>
                        </div>
                        <div className='col cart-box my-2 my-md-3'>
                            <a onClick={()=>{props.history.push('/cart')}} className="navbar-icon"><FontAwesomeIcon id="cart-icon" icon={faCartArrowDown}/></a>
                            {user?<span>{user.cart.length}</span>:null} 
                        </div>
                        <div className="col my-md-1">
                        {!user?
                        <Button type="button" className=" mx-2" onClick={()=>{props.history.push('/login')}}>Log In</Button>
                        :
                        <NavDropdown className="user-dropdown" style={{right:0, left:"auto"}} title={ <a href="#" className="navbar-icon mx-md-1" ><FontAwesomeIcon id="user-icon" icon={faUserCircle}/></a>} id="basic-nav-dropdown">
                            <NavDropdown.Item >{user.name}</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{props.history.push('/profile')}}>My Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{props.history.push('/orders')}}>My Orders</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{props.history.push('/approvals')}}>My Requests</NavDropdown.Item>
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                        }
                        </div>

                    </div>
                        
                        
                        
                    </Nav>
            </Navbar>
        </div>
    )
}

export default withRouter(Header)
