import React,{ Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

export const InputForm = (props) => {
    const {task,setTask} = props;
    const[inputText, setInputText] = useState("")

    // タスクを登録処理
    const inputChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        task[key] = value;
        let datas = Object.assign({},task); //{}にデータをコピー
        setTask(datas);
        console.log(datas);
    }

     //登録処理
    const createTask = async() => {
        //空入力を防ぐ
        if(task.sch_contents == ''){
            return;
        }
        //入力値を渡す
        await axios
            .post('/api/posts/create',{
                sch_category:task.sch_category,
                sch_contents:task.sch_contents,
                // sch_memo:task.sch_memo,
                sch_date:task.sch_date,
                sch_time:task.sch_hour + ':' + task.sch_min,
                sch_end_time:task.sch_end_hour + ':' + task.sch_end_min
            })
            .then((response)=>{
                const tempTasks = tasks;
                tempTasks.push(response.data);
                setTasks(tempTasks)
                setTask('');
            })
            .catch(error=>{
                console.log(error);
            })
    }

    return (
        <div className="inputForm">
            <form onChange={inputChange}>
                <input type="text" id="sch_id" name="sch_contents" />
                <button  onClick={createTask}>追加</button>
            </form>
        </div>
    )
}
