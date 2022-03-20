/* eslint-disable */
import React, {useState} from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Context } from "./Context.js";
import apiCall from '../Utils/apiCall'; 

import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Product from "./Product";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Category from "./Category";
import Cart from "./Cart";
import Wishlist from "./Wishlist";
import Checkout from "./Checkout";
import Orders from "./Orders";
import Profile from "./Profile";
import Customizer from "./Customizer.js";
import ARView from "./ARView.js";
import Approvals from "./Approvals.js";

function App(){

    const [user, setUser] = useState();

    const saveUser = (u) => {
        setUser(u);
        if(u)
            localStorage.setItem('user', JSON.stringify(u));
        else
            localStorage.removeItem('user');
    }

    return(
        <BrowserRouter>
            <Context.Provider value={[user, saveUser]}>
                {!window.location.pathname.includes("/admin") ? (
                    <Header />
                ) : null}
                <Route exact path="/" component={Home} ></Route>
                <Route exact path="/login" component={SignIn} ></Route>
                <Route exact path="/register" component={SignUp} ></Route>
                <Route exact path="/category/:id" component={Category} ></Route>
                <Route exact path="/product/:id" component={Product} ></Route>
                <Route exact path="/cart" component={Cart} ></Route>
                <Route exact path="/arview/:id" component={ARView} ></Route>
                <Route exact path="/customizer/:id" component={Customizer} ></Route>
                <Route exact path="/checkout" component={Checkout} ></Route>
                <Route exact path="/approvals" component={Approvals} ></Route>
                <Route exact path="/orders" component={Orders} ></Route>
                <Route exact path="/profile" component={Profile} ></Route>
                <Route exact path="/wishlist" component={Wishlist} ></Route>

                {!window.location.pathname.includes("/admin") ? (
                    <Footer />
                ) : null}
            </Context.Provider>
        </BrowserRouter>  
        
    )
}

export default App;