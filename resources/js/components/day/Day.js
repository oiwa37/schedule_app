import React,{ Fragment, useState, useEffect  } from 'react';
import ReactDOM from 'react-dom';
import { zeroPadding } from '../common/Common';
import { DayHeader } from './dayHeader/DayHeader';
import GetSchedule from '../month/getSchedule/GetSchedule';


export const Day = (props) => {

    const { currentDate, setCurrentDate, daySchedule, setDaySchedule } = props;

    const [ year, setYear ] = useState(new Date().getFullYear())  //年(4桁)
    const [ month, setMonth ] = useState(new Date().getMonth()+1) //0~11のため+1
    const [ date, setDate ] =useState(new Date().getDate());


    //タイムテーブルを作る
    let timeTable = [];
    //開始・終了時間は後で、useStateでユーザーの設定値を取得させる
    let startTime = 6;
    let endTime = 18;
    let x = 10000;
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
    //↓のため、カレンダークリックで出てくる入力フォームをカレンダー上部にボタン設置に変更

    //前準備 日付部分の表示(初期値＝今日、カレンダーの日付選択で、日付が変わるようにする)
    // ①日付があったデータを取得
    // ②時間の枠＝予定の時間で取得し、表示



    useEffect(()=>{
        console.log(daySchedule);
        rows.filter(filterDate).map((schVal,schIndex) =>
        console.log(schVal)
        )
    }
        ,[daySchedule])

        //タイムテーブルにデータベースから取得したデータをフィルタリングして表示する
        //daySchedule =  カレンダーでクリックした日付データ ex)20220610
        const showSch = () =>{

        }

        function filterDate(val){
            if(val.sch_date == daySchedule){
                return val;
            } 
        }




    return (
        <div className="day">
            <DayHeader currentDate={currentDate} setCurrentDate={setCurrentDate} month={month} date={date}/>
            <div className="time-table">
                <table>
                    <tbody>
                            {timeTable.map((value,i)=>(
                            <tr key={i + x}>
                                <td className="time-tag">{value}:00</td>
                                <td className="time-content" id="time-contents"></td>
                            </tr>
                            ))} 
                    </tbody>
                </table>
            </div>

        </div>
    )
}

