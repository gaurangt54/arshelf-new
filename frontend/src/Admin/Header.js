/* eslint-disable */
import React, {useState} from 'react'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

function Header(props) {

    const [token, setToken] = useState(props.token);

    const set = () => {
        localStorage.removeItem('token');
        props.setToken();
        setToken();
    }

    return (
        <div>
            <Navbar expand="lg" bg="dark" variant="dark" className="p-3">
                <Navbar.Brand className="brand" onClick={()=>{props.history.push('/admin/')}}>
                    ARShelf
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">    
                        <NavDropdown className="px-1" title="Category" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={()=>{props.history.push('/admin/addCategory')}}>Add</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>{props.history.push('/admin/manageCategory')}}>Manage</NavDropdown.Item>
                        </NavDropdown> 
                        <NavDropdown className="px-1" title="Product" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={()=>{props.history.push('/admin/addProduct')}}>Add</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>{props.history.push('/admin/manageProduct')}}>Manage</NavDropdown.Item>
                        </NavDropdown> 
                        <Nav.Link className="px-2" onClick={()=>{props.history.push('/admin/orderlist')}}>Orders</Nav.Link>
                        <Nav.Link className="px-3" href="/admin/approvals">Customization Approvals</Nav.Link>
                    
                        <button type="button" className="btn btn-logout" onClick={set}>Log Out</button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default withRouter(Header)
