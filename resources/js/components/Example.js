import React,{ Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Todo } from './todo/Todo';
import { Day } from './day/Day';
import Month from './month/Month';
import { Header } from './common/Header'
import { Footer } from './common/Footer';


function Example(){

    return (
        <Fragment>
            <Header />
            <div className="body">
                <Todo />
                <Day />
                <Month />
            </div>
            <Footer />
        </Fragment>
    );
}

export default Example;

if (document.getElementById('app')) {
    ReactDOM.render(<Example />, document.getElementById('app'));
}