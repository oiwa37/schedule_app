import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Example from './Example';
import Register from './Register';
import Login from './Login';
import { Top } from './Top';
import GlobalNav from './GlobalNav';
import axios from 'axios';


// axios.defaults.baseURL = "http://localhost/";  ローカル環境でのdefaultURL
axios.defaults.baseURL = "https://oiwa1105.com/schedule_app/public/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
    const token = localStorage.getItem('auth_token');
    const username = localStorage.getItem('auth_name');
    const userId = localStorage.getItem('auth_id');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

function App(){
    return (
        <BrowserRouter
            basename="/schedule_app/public">
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
                <Redirect to = "/top" />
            </Switch>
        </BrowserRouter>
    )
}

export default App;

if (document.getElementById('nav')) {
    ReactDOM.render(<App />, document.getElementById('nav'));
}