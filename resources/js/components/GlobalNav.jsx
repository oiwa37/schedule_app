import React, { Fragment } from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function GlobalNav () {
    const history = useHistory();

    //ログアウト機能
    const logoutSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/logout').then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token', res.data.token);
                localStorage.removeItem('auth_name', res.data.username);
                history.push('/top');
                location.reload();
            } 
        });
    }

    //ログインチェックし、
    //未ログインの場合は、ログイン・サインアップボタンを表示
    //ログインの場合は、ログアウトボタンを表示する。
    let AuthButtons = ''; 
    if (!localStorage.getItem('auth_token')){
        AuthButtons = (
            <ul>
                <li>
                    <Link to="/login" style={{textDecoration: 'none'}}>
                        <span className='login-btn'>Log In</span>
                    </Link>
                </li>
                <li>
                    <Link to="/register" style={{textDecoration: 'none'}}>
                        <span className='register-btn'>Sign Up</span>
                    </Link>
                </li>
            </ul>
        );
    } else {
        AuthButtons = (
                <div onClick={logoutSubmit}>
                    <span className="logout-btn">Log Out</span>
                </div>
        );
    }

    return(
        <Fragment>
            <div className='header'>
                    <Link to="/top">
                        <span className='header-title'>Schedule App</span>
                    </Link>
                <div className='global-nav'>
                        {AuthButtons}
                </div>
            </div>
        </Fragment>
    )
}

export default GlobalNav;