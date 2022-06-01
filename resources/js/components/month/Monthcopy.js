import React,{ Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Navigation from './navigation/Navigation';
import { zeroPadding } from '../common/Common';
import RegisterForm from './register/RegisterForm';
import UpdateForm from './update/updateForm';
import GetSchedule from './getSchedule/GetSchedule';


function Month(){

    const weeks = ['日', '月', '火', '水', '木', '金', '土']
    const date = new Date()
    const [year,setYear] = useState(new Date().getFullYear())  //年(4桁)
    const [month,setMonth] = useState(new Date().getMonth()+1) //0~11のため+1
    const config = { show: 3, }
    
    function showCalendar(year, month) {
        for ( i = 0; i < config.show; i++) {
            const calendarHtml = createCalendar(year, month)
            const sec = document.createElement('section')
            sec.innerHTML = calendarHtml
            document.querySelector('#calendar').appendChild(sec)

            month++
            if (month > 12) {
                year++
                month = 1
            }
        }
    }
    
    function createCalendar(year, month) {
        const startDate = new Date(year, month - 1, 1) // 月の最初の日を取得
        const endDate = new Date(year, month,  0) // 月の最後の日を取得
        const endDayCount = endDate.getDate() // 月の末日
        const lastMonthEndDate = new Date(year, month - 1, 0) // 前月の最後の日の情報
        const lastMonthendDayCount = lastMonthEndDate.getDate() // 前月の末日
        const startDay = startDate.getDay() // 月の最初の日の曜日を取得
        let dayCount = 1 // 日にちのカウント
        let calendarHtml = '' // HTMLを組み立てる変数
    
        calendarHtml += '<h1>' + year  + '/' + month + '</h1>'
        calendarHtml += '<table>'
    
        // 曜日の行を作成
        for (let i = 0; i < weeks.length; i++) {
            calendarHtml += '<td>' + weeks[i] + '</td>'
        }
    
        for (let w = 0; w < 6; w++) {
            calendarHtml += '<tr>'
    
            for (let d = 0; d < 7; d++) {
                if (w == 0 && d < startDay) {
                    // 1行目で1日の曜日の前
                    let num = lastMonthendDayCount - startDay + d + 1
                    calendarHtml += '<td class="is-disabled">' + num + '</td>'
                } else if (dayCount > endDayCount) {
                    // 末尾の日数を超えた
                    let num = dayCount - endDayCount
                    calendarHtml += '<td class="is-disabled">' + num + '</td>'
                    dayCount++
                } else {
                    calendarHtml += '<td>' + dayCount + '</td>'
                    dayCount++
                }
            }
            calendarHtml += '</tr>'
        }
        calendarHtml += '</table>'
    
        return calendarHtml
    }
    
    function moveCalendar(e) {
        document.querySelector('#calendar').innerHTML = ''
    
        if (e.target.id === 'prev') {
            month--
    
            if (month < 1) {
                year--
                month = 12
            }
        }
    
        if (e.target.id === 'next') {
            month++
    
            if (month > 12) {
                year++
                month = 1
            }
        }
    
        showCalendar(year, month)
    }
    
    document.querySelector('#prev').addEventListener('click', moveCalendar)
    document.querySelector('#next').addEventListener('click', moveCalendar)
    
    showCalendar(year, month)



    // スケジュールデータを取得
    let rows = GetSchedule();



    //登録用ダイヤログ開閉処理
    const [ open, setOpen ] = useState(false);
    const handleClickOpen = (e) =>{ 
        setOpen(true); 
    };
    const handleClose = () =>{ setOpen(false); };

    //新規登録用データ配列
    const [formData,setFormData] = useState({sch_category:'',sch_contents:'',sch_memo:'',sch_date:'',sch_hour:'',sch_min:''});


    // 更新用ダイヤログ開閉機能
    const [ editOpen, setEditOpen ] = useState(false);
    const editHandleClickOpen = (e) =>{
        e.stopPropagation();
        setEditOpen(true);
        getEditData(e);
    };
    const editHandleClose = () =>{ setEditOpen(false); }

    //更新用データ配列
    const [ editData, setEditData ] = useState({id:'',sch_category:'',sch_contents:'',sch_memo:'',sch_date:'',sch_hour:'',sch_min:''});
    

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
                    sch_memo:response.data.sch_memo,
                    sch_date:response.data.sch_date,
                    sch_hour:response.data.sch_time.substr(0,2),
                    sch_min:response.data.sch_time.substr(3,2)
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
                                        <div>
                                            {day > last ? day - last : day <= 0 ? prevlast + day : day}
                                        </div>
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
            <RegisterForm open={open} onClose={handleClose} formData={formData} setFormData={setFormData}/>
            <UpdateForm open={editOpen} onClose={editHandleClose} editData = {editData} setEditData = {setEditData} />
        </div>
    );
}

// function createCalender(year,month){
//     const first = new Date(year,month - 1,1).getDay()

//     return [0,1,2,3,4,5].map((weekIndex) => {
//         return [0,1,2,3,4,5,6].map((dayIndex) => {
//             const day = dayIndex + 1 + weekIndex * 7
//             return day - first 
//         })
//     })
// }


export default Month;
