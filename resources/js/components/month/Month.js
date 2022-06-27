import React,{ Fragment, useState, useEffect  } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Navigation from './navigation/Navigation';
import { zeroPadding, sliceYear } from '../common/Common';
import RegisterForm from './register/RegisterForm';
import UpdateForm from './update/updateForm';
import GetSchedule from './getSchedule/GetSchedule';


function Month(props){
    const {currentDate, setCurrentDate, daySchedule, setDaySchedule, days, setDays } = props;

    const [year,setYear] = useState(new Date().getFullYear())  //年(4桁)
    const [month,setMonth] = useState(new Date().getMonth()+1) //0~11のため+1
    const last = new Date(year,month,0).getDate()              //第三引数0は最終日を取得 (当月)
    const prevlast = new Date(year,month-1,0).getDate()        //先月の最終日を取得
    const calendar = createCalendar(year,month) 
    const WeekChars = [ "(日)", "(月)", "(火)", "(水)", "(木)", "(金)", "(土)" ];

    const username = localStorage.getItem('auth_name');         //ユーザーネーム
    const userId = localStorage.getItem('auth_id');             //ユーザーID



    // 登録済みのスケジュールデータを取得
    let rows = GetSchedule();

    //登録用ダイヤログ開閉処理
    const [ open, setOpen ] = useState(false);
    const handleClickOpen = (e) =>{ 
        setOpen(true); 
    };
    const handleClose = () =>{ setOpen(false); };

    //新規登録用データ配列
    const [formData,setFormData] = useState({user_id:userId,sch_contents:'',sch_date:'',sch_hour:'00',sch_min:'00',sch_end_hour:'00',sch_end_min:'00',sch_category:'なし'});

    // 更新用ダイヤログ開閉機能
    const [ editOpen, setEditOpen ] = useState(false);
    const editHandleClickOpen = (e) =>{
        e.stopPropagation();
        setEditOpen(true);
        getEditData(e);
    };
    const editHandleClose = () =>{ setEditOpen(false); }

    //更新用データ配列
    const [ editData, setEditData ] = useState({id:'', user_id:userId, sch_category:'',sch_contents:'',sch_date:'',sch_hour:'',sch_min:'',sch_end_hour:'',sch_end_min:''});

    // バックエンドから該当のデータを取得
    function getEditData(e){
        axios
            .post('/api/edit', {
                id: e.currentTarget.id
            })
            .then(response => {
                setEditData({
                    id:response.data.id,
                    sch_category:response.data.sch_category,
                    sch_contents:response.data.sch_contents,
                    sch_status:response.data.sch_status,
                    // sch_memo:response.data.sch_memo, //メモ機能追加時にコメントアウト解除
                    sch_date:response.data.sch_date,
                    sch_hour:response.data.sch_time.substr(0,2),
                    sch_min:response.data.sch_time.substr(3,2),
                    sch_end_hour:response.data.sch_end_time.substr(0,2),
                    sch_end_min:response.data.sch_end_time.substr(3,2)
                });
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }


    const [schedules,setSchedules] = useState([])
    //カレンダーの日付クリックで該当の日のタイムテーブルを表示
    //クリックイベントで日付を取得し、表示する
    const scheduleOpen = (e) =>{
        let valDay = e.currentTarget.id; //Idが日付
        const numDay = Number(valDay);
        const textMsg = document.getElementById('current-month');  
        const msg = textMsg.textContent; //ex)2022年1月
        const res = msg.replace(/[^0-9]/g, ''); //20221
        const resLength = res.length;



        if(resLength < 6){ //一桁の月
            const a = res.slice(0, 4) //2022
            const b = '-0' 
            const c = res.slice(4)  //1 月部分
            const resMsg = a + b + c //2022-06
            const dbDate = resMsg + '-' + zeroPadding(valDay); //2022-06-18
            const separateMonth = resMsg.slice(-2); //月毎に分岐させるため月を取得
            const checkDay = new Date(dbDate);
            const week = checkDay.getDay(); //曜日を取得

                switch(separateMonth){
                    case '01':
                    case '03':
                    case '05':
                    case '07':
                    case '08':
                        // 31日までの月の場合
                        if (0 < numDay && numDay < 32 ){
                            setCurrentDate(c  + '月' + numDay  + '日' + WeekChars[week]);
                            setDays(dbDate);
                        } else {
                            console.log('該当の日付なし');
                        }
                        break
                    case '04':  
                    case '06':    
                    case '09':
                        // 30日までの月の場合
                        if (0 < numDay && numDay < 31 ){
                            setCurrentDate(c  + '月' + numDay  + '日' + WeekChars[week]);
                            setDays(dbDate);
                        } else {
                            console.log('該当の日付なし');
                        }
                    default:
                        // 28日までの月の場合
                        if (0 < numDay && numDay < 29 ){
                            setCurrentDate(c  + '月' + numDay  + '日' + WeekChars[week]);
                            setDays(dbDate);
                        } else {
                            console.log('該当の日付なし');
                        }
                }
        }else{
            //二桁の月
            const a = res.slice(0, 4)
            const b = '-'
            const c = res.slice(4)
            const resMsg = a + b + c
            const dbDate = resMsg + '-' + zeroPadding(valDay);
            const separateMonth = resMsg.slice(-2);
            const checkDay = new Date(dbDate);
            const week = checkDay.getDay(); //曜日を取得

            switch(separateMonth){
                case '10':
                case '12':
                    // 31日までの月の場合
                    if (0 < numDay && numDay < 32 ){
                            setCurrentDate(c  + '月' + numDay  + '日' + WeekChars[week]);
                        setDays(dbDate);
                    } else {
                        console.log('該当の日付なし');
                    }
                    break
                case '11':  
                    // 30日までの月の場合
                    if (0 < numDay && numDay < 31 ){
                            setCurrentDate(c  + '月' + numDay  + '日' + WeekChars[week]);
                        setDays(dbDate);
                    } else {
                        console.log('該当の日付なし');
                    }
                    break
                default:
                    console.log('なし');
            }
        }
    }
    

    return (
        <div className="month">
            <Navigation year={year} month={month} setYear={setYear} setMonth={setMonth}  open={open} setOpen={setOpen}onClose={handleClose} formData={formData} setFormData={setFormData} />
            <table className="calender-table">
                <thead>
                    <tr>
                        <th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>
                    </tr>
                </thead>
                <tbody>
                    {calendar.map((week,i) => (
                        <tr key={week.join('')}>
                            {week.map((day,j) => (
                                <td key={`${i}${j}`} id={day} onClick={scheduleOpen}>
                                    <div>
                                            {day > last ? <div className="disable">{day - last}</div> : day <= 0 ? <div className="disable">{prevlast + day}</div> : day}
                                        
                                        <div className="schedule-area">
                                            {rows.map((schedule,k) => (
                                                schedule.sch_date == year + '-' + zeroPadding(month) + '-' + zeroPadding(day) &&
                                                    <div className='schedule-title' key={k} id={schedule.sch_id}     onClick={editHandleClickOpen} >{schedule.sch_contents}</div>
                                            ))}
                                        </div>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))} 
                </tbody>
            </table>
            <RegisterForm open={open} onClose={handleClose} formData={formData} setFormData={setFormData}  />
            <UpdateForm open={editOpen} onClose={editHandleClose} editData = {editData} setEditData = {setEditData} />
        </div>
    );
}

function createCalendar(year,month){
    const first = new Date(year,month - 1,1).getDay()

    return [0,1,2,3,4,5].map((weekIndex) => {
        return [0,1,2,3,4,5,6].map((dayIndex) => {
            const day = dayIndex + 1 + weekIndex * 7
            return day - first 
        })
    })
}


export default Month;
