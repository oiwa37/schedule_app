import React, { Fragment } from 'react'
import {Link, useHistory} from 'react-router-dom';
import Register from './Register';
import { Footer } from './common/Footer';
import Test from '../../../storage/app/public/test3.jpeg';
import TbdImg1 from '../../../storage/app/public/cat1.jpg';
import TbdImg2 from '../../../storage/app/public/cat2.jpg';
import TbdImg3 from '../../../storage/app/public/cat4.jpg';

export const Top = () => {

    
    return (
        <Fragment>
            <div className='top-content'>
                <div className='top-group'>
                    <div className='top-text'>
                        <h1>Schedule<br/><span>Management</span> App</h1>
                        <p>ここに簡単な説明を入れるここに簡単な説明を入れるここに簡単な説明を入れる</p>
                        <div className='button'>
                            <ul>
                                <li>
                                    <Link to="/register" style={{textDecoration: 'none'}}>
                                        <span>Get started</span>
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link to="/login">
                                        <span>Login</span>
                                    </Link>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                    <img src={Test} />
                </div>
            </div>
            <div className='middle-content'>
                <div className='top-des'>
                    <h3>gif?でドロップアンドドラッグ操作の紹介</h3>
                    <img src={TbdImg1} />
                </div>
                <div className='middle-des'>
                    <h3>その他できることや操作方法の紹介</h3>
                    <img src={TbdImg2} />
                    <img src={TbdImg3} />

                </div>
            </div>
            <div className='bottom-content'>
                <div className='bottom-text'>適当な文言</div>
                <div className='button'>
                    <ul>
                        <li>
                            <Link to="/register" style={{textDecoration: 'none'}}>
                                <span>Get started</span>
                            </Link>
                        </li>
                    </ul>
                </div>   
            </div>
            
            <Footer />
        </Fragment>
    )
}
