import React,{ Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Example from './Example';
import Register from './Register';
import Login from './Login';
import { Top } from './Top';
import GlobalNav from './GlobalNav';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
    const token = localStorage.getItem('auth_token');
    const username = localStorage.getItem('auth_name');
    const userId = localStorage.getItem('auth_id');
    console.log(username);
    console.log(userId);
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});



function App(){
    return (
        <BrowserRouter>
            <GlobalNav />
            <Switch>
                <Route path="/top">
                    <Top />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route exact path="/">
                    <Example />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App;

if (document.getElementById('nav')) {
    ReactDOM.render(<App />, document.getElementById('nav'));
}