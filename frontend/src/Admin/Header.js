import React, {useState} from 'react'
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';
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
            <Navbar expand="lg" className="grey-bg">
                <Navbar.Brand className="brand" href="">
                    ARShelf
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">    
                        <NavDropdown title="Category" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={()=>{props.history.push('/admin/addCategory')}}>Add</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>{props.history.push('/admin/manageCategory')}}>Manage</NavDropdown.Item>
                        </NavDropdown> 
                        <NavDropdown title="Product" id="basic-nav-dropdown">
                            <NavDropdown.Item className="active" onClick={()=>{props.history.push('/admin/addProduct')}}>Add</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/admin/manageproduct">Manage</NavDropdown.Item>
                        </NavDropdown> 
                        <Nav.Link onClick={()=>{props.history.push('/admin/orderlist')}}>Orders</Nav.Link>
                        <Nav.Link href="/admin/shipment">Shipment Details</Nav.Link>
                    
                        <Button type="button" className="btn-logout" onClick={set}>Log Out</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default withRouter(Header)
