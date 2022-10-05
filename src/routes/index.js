import React from "react";
import { Switch } from "react-router-dom";

import MyRoutes from "./MyRoute";
import Login from "../pages/Login/Index";
import Page404 from '../pages/Page404/index';

export default function Routes() {
    return (        
        <Switch>
            <MyRoutes exact path="/" component={Login} isClosed />
            <MyRoutes path="*" component={Page404} />
        </Switch>        
    );
}