import React from "react";
import { Switch } from "react-router-dom";

import MyRoute from "./MyRoute";
// paginas:
import Aluno from '../pages/Aluno/Index';
import Alunos from '../pages/Alunos/Index';
import Fotos from '../pages/Fotos/Index';
import Register from '../pages/Register/Index';
import Login from "../pages/Login/Index";
import Page404 from '../pages/Page404/index';

export default function Routes() {

    return (
        <Switch>
            <MyRoute exact path="/" component={Alunos} isClosed={false} />
            <MyRoute exact path="/aluno/:id/edit" component={Aluno} isClosed />
            <MyRoute exact path="/aluno/" component={Aluno} isClosed />
            <MyRoute exact path="/fotos/:id" component={Fotos} isClosed />
            <MyRoute exact path="/login/" component={Login} isClosed={false} />
            <MyRoute exact path="/register/" component={Register} isClosed={false} />
            <MyRoute path="*" component={Page404} />            
        </Switch>
    );
}