import React,{ Fragment, useState, useEffect  } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Navigation from './navigation/Navigation';
import { zeroPadding } from '../common/Common';
import RegisterForm from './register/RegisterForm';
import UpdateForm from './update/updateForm';
import GetSchedule from './getSchedule/GetSchedule';


function Month(){

    const [year,setYear] = useState(new Date().getFullYear())  //年(4桁)
    const [month,setMonth] = useState(new Date().getMonth()+1) //0~11のため+1
    const last = new Date(year,month,0).getDate()  //第三引数0は最終日を取得 (当月)
    const prevlast = new Date(year,month-1,0).getDate() //先月の最終日を取得
    const calendar = createCalender(year,month) 

    // 登録済みのスケジュールデータを取得
    let rows = GetSchedule();

    //登録用ダイヤログ開閉処理
    const [ open, setOpen ] = useState(false);
    const handleClickOpen = (e) =>{ 
        // const thisMonth = document.getElementsByClassName('this-month');
        // console.log(thisMonth);
        // const d = e.currentTarget.id
        // const  md =  + '-' + zeroPadding(day)
        // console.log(clickday);  日付の取得はできた！
        setOpen(true); 
    };
    const handleClose = () =>{ setOpen(false); };

    //新規登録用データ配列
    const [formData,setFormData] = useState({sch_category:'なし',sch_contents:'',sch_date:'',sch_hour:'00',sch_min:'00',sch_end_hour:'00',sch_end_min:'00'});


    // 更新用ダイヤログ開閉機能
    const [ editOpen, setEditOpen ] = useState(false);
    const editHandleClickOpen = (e) =>{
        e.stopPropagation();
        setEditOpen(true);
        getEditData(e);
    };
    const editHandleClose = () =>{ setEditOpen(false); }

    //更新用データ配列
    const [ editData, setEditData ] = useState({id:'',sch_category:'',sch_contents:'',sch_date:'',sch_hour:'',sch_min:'',sch_end_hour:'',sch_end_min:''});


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
                    // sch_memo:response.data.sch_memo,
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

    return (
        <div className="month">
            <Navigation year={year} month={month} setYear={setYear} setMonth={setMonth}/>
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
                                <td key={`${i}${j}`} id={day} 
                                onClick={handleClickOpen}>
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

function createCalender(year,month){
    const first = new Date(year,month - 1,1).getDay()

    return [0,1,2,3,4,5].map((weekIndex) => {
        return [0,1,2,3,4,5,6].map((dayIndex) => {
            const day = dayIndex + 1 + weekIndex * 7
            return day - first 
        })
    })
}


export default Month;
