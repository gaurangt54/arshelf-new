import React, {useState} from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Login from "./Login";

import AddProduct from "./AddProduct";

import Orderlist from "./Orderlist";

import AddCategory from "./AddCategory";
import ManageCategory from "./ManageCategory";
import Home from "./Home";
import UpdateProduct from "./UpdateProduct";
import ManageProduct from "./ManageProduct";

function Routes() {

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    };
    
    const [token, setToken] = useState(getToken());

    const url = window.location.pathname;

    const saveToken = userToken => {
        console.log(userToken)
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    if(!token && url.includes("/admin")) {
        return <Login setToken={saveToken} />
    }

    return (
        <BrowserRouter>
        <Header token={token} setToken={setToken}/>

            <Route exact path="/admin/" component={Home} ></Route>
            <Route exact path="/admin/addCategory" component={AddCategory} ></Route>
            <Route exact path="/admin/manageCategory" component={ManageCategory} ></Route>

            <Route exact path="/admin/addProduct" component={AddProduct} ></Route>
            <Route exact path="/admin/manageProduct" component={ManageProduct} ></Route>
            <Route exact path="/admin/updateProduct/:id" component={UpdateProduct} ></Route>
            <Route exact path="/admin/orderlist" component={Orderlist} ></Route>
        </BrowserRouter>
    );
}

export default Routes;
