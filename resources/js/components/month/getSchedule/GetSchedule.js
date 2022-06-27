import React,{useState,useEffect} from 'react';
import axios from 'axios';

function GetSchedule(){

    
    //スケジュールのデータ
    const [schedules,setSchedules] = useState([])
    const userId = localStorage.getItem('auth_id'); //ユーザーID


    //画面読み込み時に、1度だけ起動
    useEffect(()=>{
        getScheduleData();
    },[])

    //DBからデータ一覧を取得
    const getScheduleData = () =>{
        axios
            .post('/api/posts',{
                id : userId
            })
            .then(response=>{
                setSchedules(response.data); //データをセット
                // console.log(response.data); 
            }).catch(()=>{
                console.log('通信に失敗しました');
            });
    }

    //データ格納の空配列を作成
    let rows = [];

    //スケジュールデータをrowに格納する
    schedules.map((schedule)=>
        rows.push({
            sch_id:schedule.id,
            sch_category:schedule.sch_category,
            sch_contents:schedule.sch_contents,
            sch_status:schedule.sch_status,
            // sch_memo:schedule.sch_memo,
            sch_date:schedule.sch_date,
            sch_time:schedule.sch_time,
            sch_end_time:schedule.sch_end_time
        })
    );

    return rows
}


export default GetSchedule;