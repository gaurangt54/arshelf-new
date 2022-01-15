import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import CustomerRoutes from "./Customer/Routes"
import AdminRoutes from "./Admin/Routes"

function App(){
    return(
        
        <BrowserRouter>
            <Route path="/" component={CustomerRoutes} ></Route>
            <Route path="/admin/" component={AdminRoutes} ></Route>
        </BrowserRouter>
        
    )
}

export default App;