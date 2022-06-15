import React,{ Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Todo } from './todo/Todo';
import { Day } from './day/Day';
import Month from './month/Month';
import { Header } from './common/Header'
import { Footer } from './common/Footer';
import { zeroPadding } from './common/Common';
import { main } from '@popperjs/core';


function Example(){
    const [ year, setYear ] = useState(new Date().getFullYear())  //年(4桁)
    const [ month, setMonth ] = useState(new Date().getMonth()+1) //0~11のため+1
    const [ date, setDate ] =useState(new Date().getDate()); //日付
    const [ currentDate, setCurrentDate ] = useState( month + '月' + date + '日') //今日の月日 ○月○日
    const [ daySchedule, setDaySchedule ] = useState(year + '-' + zeroPadding(month) + '-' + zeroPadding(date)
    ); //2022-06-09表記の日付




    let main= '';
    if (!localStorage.getItem('auth_token')){
        main = (
            <div>ログインしてください</div>
    );
    } else {
    main = (
        <div className="body">
            <Todo />
            <Day currentDate={currentDate} setCurrentDate={setCurrentDate} daySchedule={daySchedule} setDaySchedule={setDaySchedule} />
            <Month currentDate={currentDate} setCurrentDate={setCurrentDate} daySchedule={daySchedule} setDaySchedule={setDaySchedule}/>
        </div>
    );
    }


    return (
        <Fragment>
            <div className='main-content'>
                {main}
            </div>            
            <Footer />
        </Fragment>
    );
}

export default Example;

// if (document.getElementById('app')) {
//     ReactDOM.render(<Example />, document.getElementById('app'));
// }