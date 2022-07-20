import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Footer } from './common/Footer';
import TopImg1 from '/images/test3.jpeg';
import TopImg2 from '/images/image.png';

export const Top = () => {
    
    return (
        <Fragment>
            <div className='top-content'>
                <div className='top-group'>
                    <div className='top-text'>
                        <h1>Schedule<br/><span>Management</span> App</h1>
                        <p>シンプルな操作でスケジュールを見て分かりやすく管理できるアプリです</p>
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
                    <img src={TopImg1} />
                </div>
            </div>

            <div className='middle-content'>
                <div className='top-des'>
                    <h3>機能紹介</h3>
                    <p>予定を管理しやすく、TODOリスト・タイムテーブル・スケジュールを一つの画面に</p>
                    <img src={TopImg2} />
                </div>
                {/* <div className='middle-des'>
                    <h3>その他紹介</h3>
                </div> */}
            </div>

            <div className='bottom-content'>
                <div className='bottom-text'>ここから始める</div>
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
