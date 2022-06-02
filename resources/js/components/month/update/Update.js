import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';


function Update(props){
  const { editData } = props;

    //ダイアログデータを登録
    const updateSchedule = async() => {
      //空入力を防ぐ
      if(editData.sch_title==''){
        return;
    }
      //入力値をセットしてpostリクエストで送る
      await axios
      .post('/api/update',{
        id: editData.id,
        sch_category:editData.sch_category,
        sch_contents:editData.sch_contents,
        sch_status:editData.sch_status,
        // sch_memo:editData.sch_memo,
        sch_date:editData.sch_date,
        sch_time:editData.sch_hour + ':' + editData.sch_min,
        sch_end_time:editData.sch_end_hour + ':' + editData.sch_end_min
      })
      .then((response)=>{
        setEditData(response.data);
      })
      .catch(error=>{
        console.log(error);
      })
      }
  
      return (
          <Button href="/dashboard" onClick={updateSchedule}>Subscribe</Button>
      );
}

export default Update;