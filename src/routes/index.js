import React from "react";
import { Switch } from "react-router-dom";
/*import { toast } from 'react-toastify';*/

import MyRoute from "./MyRoute";
import Login from "../pages/Login/Index";
import Page404 from '../pages/Page404/index';

export default function Routes() {

    return (
        <Switch>
            <MyRoute exact path="/" component={Login} /*isClosed*/ />
            <MyRoute path="*" component={Page404} />
        </Switch>
    );
}