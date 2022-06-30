import React,{ useEffect, useState } from 'react';
import { sliceTime, sliceValue } from '../common/Common';
import moment from 'moment';
import 'moment/locale/ja';
import { DayHeader } from './dayHeader/DayHeader';
import UpdateForm from '../month/update/updateForm';

export const Day = (props) => {
    const { currentDate, setCurrentDate, daySchedule, setDaySchedule, days, setDays } = props;
    const userId = localStorage.getItem('auth_id'); //ユーザーID

    // 更新用ダイヤログ開閉機能
    const [ editOpen, setEditOpen ] = useState(false);
    //クリックイベント
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
                id: e.currentTarget.id - 40000
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
    
    //DBから該当の日付のデータを取得(各ユーザーの)
    const getDateData = (e) =>{
        axios
            .post('/api/date',{
                date:days,
                id:userId
            })
            .then(response=>{
                setDaySchedule(response.data); //データをセット
                console.log(response.data); 
            }).catch(()=>{
                console.log('通信に失敗しました');
            });
    }

    //currentDate(日付)が変わるタイミングでデータ取得
    useEffect(()=>{
        getDateData();
    },[currentDate])
    
    //案2）タイムテーブル用
    const base_time = moment(days); //テーブルの開始時刻
    let block_size = 55;  //1時間の縦幅
    let block_number = 0; //開始時刻を0として連番をつける

    const times = []; //時刻とblock_number格納用の配列
    for(let i = 0; i < 24; i++ ){
        times.push({
            time: base_time.format('HH:mm'),
            block_number
        })
        base_time.add(1,'hours');
        block_number++;
    }

    let style = {}; //CSSスタイル用配列
    //日付が変わったタイミングで入っている予定をリセット 
    useEffect(()=>{removeChildren();},[currentDate])
    const removeChildren = () =>{
        const ele = document.getElementsByClassName('time-content');
        const childEle = document.querySelectorAll('.time-content *');
        console.log(ele);
        console.log(childEle);
        for(let i=0; i < childEle.length; i++){
            childEle[i].remove();
        }
    }




    return (
        <div className="day">
            <DayHeader currentDate={currentDate} />

            <div className="time-table" id='time-table'>
                    <div className='tag-tables'>
                        { times.map((val,index) => (
                            <div className="time-tag"   key={index} 
                            style={{height:`${block_size}px`, top:`${val.block_number} * ${block_size}`}}>
                            {val.time}</div>
                        ))}
                    </div>
                    <div className='content-tables' >
                        { times.map((schVal, schIndex)=>(
                            <div className="time-content relative" key={schIndex} id={schIndex}
                            style={{height:`${block_size}px`, top:`${schVal.block_number} * ${block_size}`}}>
                                    
                                    { daySchedule.map((dayVal, dayIndex)=>{
                                        let schid = schIndex;
                                        const targetId = document.getElementById(schid); 
                                        const timeTable = document.getElementById('time-table'); //スクロール表示領域の要素を取得
                                        timeTable.scrollTop = 330; //スクロール初期位置を設定
                                        if(schIndex == sliceValue(dayVal.sch_time)){
                                            const time_from = sliceValue(dayVal.sch_time);
                                            const time_to = sliceValue(dayVal.sch_end_time);
                                            const between = Math.abs(time_from - time_to);
                                            const start = time_from * block_size;
                                            let style = {
                                                top:`${start}`,
                                                height:`${block_size * between}`
                                            }                                            


                                            //案1）スケジュールの表示  
                                            // let newElement = document.createElement('div');
                                            // let newContent = document.createTextNode(dayVal.sch_contents);
                                            // newElement.appendChild(newContent);
                                            // newElement.setAttribute('class', 'content-detail');
                                            // newElement.setAttribute('style', `height:${block_size * between}px`);
                                            // targetId.insertBefore(newElement, targetId.firstChild);
                                            
                                            //案2）スケジュールの表示 
                                            const schTime = sliceTime(dayVal.sch_time);
                                            const schEndTime = sliceTime(dayVal.sch_end_time);
                                            targetId.innerHTML = `<div class='content-detail' style=height:${block_size * between}px id=${dayVal.id + 40000}><span>${schTime} - ${schEndTime}</span><p>${dayVal.sch_contents}</p></div>`
                                            let detailClick = document.getElementById(dayVal.id + 40000);
                                            detailClick.addEventListener('click',editHandleClickOpen);
                                        }
                                    })}
                            </div>
                        ))}    
                    </div>        
            </div>
            <UpdateForm open={editOpen} onClose={editHandleClose} editData = {editData} setEditData = {setEditData} />
        </div>
    )
}



