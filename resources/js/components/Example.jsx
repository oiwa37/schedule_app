import React,{ Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import { Todo } from './todo/Todo';
import { Day } from './day/Day';
import Month from './month/Month';
import { Footer } from './common/Footer';
import moment from 'moment';
import 'moment/locale/ja';

function Example(props){
    
    const now = moment(new Date());                                              // 今日の日付 Fri Jan 01 2021 05:59:01 GMT+0900 
    const [ currentDate, setCurrentDate ] = useState(now.format('M月DD日(dd)'))  // 6月01日(日) （初期値:今日）
    const [ days, setDays ] = useState(now.format('YYYY-MM-DD'))                // 2022-06-09表記の日付 
    const [ daySchedule, setDaySchedule ] = useState([])                        // 日付のデータ格納
    
    //ログインチェックで分岐。ログイン状態の場合のみ画面表示
    let main = '';
    if (!localStorage.getItem('auth_token')){
        main = (
            <div>ログインしてください</div>
    );
    } else {
    main = (
        <div className="body">
            <Todo />
            <Day currentDate={currentDate} setCurrentDate={setCurrentDate} daySchedule={daySchedule} setDaySchedule={setDaySchedule} days={days} setDays={setDays}/>
            <Month  currentDate={currentDate} setCurrentDate={setCurrentDate} daySchedule={daySchedule} setDaySchedule={setDaySchedule} days={days} setDays={setDays}/>
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
