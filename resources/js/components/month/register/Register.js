import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

function Register(props){
    const {formData} = props;

    //登録処理
    const createSchedule = async() => {

      //空入力を防ぐ
    if(formData.sch_title == ''){
        return;
    }
        //入力値を投げる
        await axios
            .post('/api/posts/create',{
                sch_category:formData.sch_category,
                sch_contents:formData.sch_contents,
                // sch_memo:formData.sch_memo,
                sch_date:formData.sch_date,
                sch_time:formData.sch_hour + ':' + formData.sch_min,
                sch_end_time:formData.sch_end_hour + ':' + formData.sch_end_min
            })
            .then((response)=>{
                //戻り値をセット
                const tempSchedules = schedules;
                tempSchedules.push(response.data);
                setSchedules(tempSchedules)
                setFormData('');
            })
            .catch(error=>{
                console.log(error);
            })
    }
    return (
        <Button href="/dashboard" onClick={createSchedule}>Subscribe</Button>
    );
}

                export default Register;