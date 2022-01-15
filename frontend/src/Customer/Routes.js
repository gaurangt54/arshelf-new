import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import AR from "./AR";
import Header from "./Header";
import Home from "./Home";
import Product from "./Product";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function App(){
    return(
        <BrowserRouter>
            {!window.location.pathname.includes("/admin") ? (
                    <Header />
            ) : null}
            
            <Route exact path="/" component={Home} ></Route>
            <Route exact path="/login" component={SignIn} ></Route>
            <Route exact path="/register" component={SignUp} ></Route>
            <Route exact path="/product/:id" component={Product} ></Route>
            <Route exact path="/ar" component={AR} ></Route>
            
        </BrowserRouter>  
        
    )
}

export default App;