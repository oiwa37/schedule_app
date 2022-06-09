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
    let startTime = 6;
    let endTime = 18;
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
    //↓のため、カレンダークリックで出てくる入力フォームをカレンダー上部にボタン設置に変更



    // useEffect(()=>{
    //     console.log(daySchedule);
    //     rows.filter(filterDate).map((schVal,schIndex) =>
    //         console.log(schVal)
    //     )
    // }
    //     ,[daySchedule])

        //タイムテーブルにデータベースから取得したデータをフィルタリングして表示する
        //daySchedule =  カレンダーでクリックした日付データ ex)20220610

        //カレンダーの日付と同じ日付のデータのみにフィルタリング
        function filterDate(dateVal){
            if(dateVal.sch_date == daySchedule){
                return dateVal;
            } 
        }

        // //追加する子要素を作成
        // const newElement = document.createElement("div");
        // const newContent = document.createTextNode("ここに予定タイトル");
        // newElement.appendChild(newContent); //div要素にテキストを追加
        // newElement.setAttribute('id', 'contentId');

        // const parentDiv = document.getElementById('time-contents');
        // parentDiv.insertBefore(newElement, parentDiv.firstChild);



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
                                <div className='kari' key ={schIndex + y}>
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

