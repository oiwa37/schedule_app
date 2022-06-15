import React,{ Fragment, useState, useEffect  } from 'react';
import ReactDOM from 'react-dom';
import { zeroPadding } from '../common/Common';
import { DayHeader } from './dayHeader/DayHeader';
import GetSchedule from '../month/getSchedule/GetSchedule';
import { sliceTime } from '../common/Common';
import { sliceValue } from '../common/Common';

export const Day = (props) => {

    const { currentDate, setCurrentDate, daySchedule, setDaySchedule } = props;

    const [ year, setYear ] = useState(new Date().getFullYear())  //年(4桁)
    const [ month, setMonth ] = useState(new Date().getMonth()+1) //0~11のため+1
    const [ date, setDate ] =useState(new Date().getDate());


    //タイムテーブルを作る
    let timeTable = [];
    //開始・終了時間は後で、useStateでユーザーの設定値を取得させる
    let startTime = 6; //default
    let endTime = 18; //default
    let x = 10000;
    let y = 20000;
    for(let i = startTime; i <= endTime; i++  ) {
        timeTable.push(i);
    }

    // let timeTable = {};
    // let x = 10000;
    // for(let i = startTime; i <= endTime; i++  ) {
    //     timeTable.id = i + x ;
    //     timeTable.value = i ;
    //     console.log(timeTable);
    // }

    // 登録済みのスケジュールデータを取得
    let rows = GetSchedule();

        //カレンダーの日付と同じ日付のデータのみにフィルタリング
        function filterDate(dateVal){
            if(dateVal.sch_date == daySchedule){
                return dateVal;
            } 
        }



        const ex = () =>{
            const date1 = new Date('2022-06-10 10:00:00');
            const date2 = new Date('2022-06-10 12:00:00');
            
            const diff = date2.getTime() - date1.getTime();
            console.log(Math.abs(diff) / (60*60*1000));
            
        }






    return (
        <div className="day">
            <DayHeader currentDate={currentDate} setCurrentDate={setCurrentDate} month={month} date={date}/>
            <div className="time-table">
                <table>
                    <tbody>
                            {timeTable.map((value,i)=>(
                            <tr key={i + x}>
                                <td className="time-tag" id="time-tag">{value}:00</td>

                                <td className="time-content" id="time-contents" >
                                {rows.filter(filterDate).map((schVal,schIndex) =>(
                                sliceValue(schVal.sch_time) == value &&
                                <div className='content-detail' key ={schIndex + y}>
                                    <span>{sliceTime(schVal.sch_time)} - {sliceTime(schVal.sch_end_time)}</span>{schVal.sch_contents}</div>
                                ))}
                                </td>                               
                            </tr>
                            ))} 
                    </tbody>
                </table>
            </div>

        </div>
    )
}

