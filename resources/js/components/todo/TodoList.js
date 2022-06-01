import axios from 'axios';
import { set } from 'lodash';
import React,{ Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import GetSchedule from '../month/getSchedule/getSchedule';

export const TodoList = ({task,setTask}) => {

    //データの編集用
    const [editTask, setEditTask] = useState({id:'',sch_category:'',sch_contents:'',sch_date:'',sch_hour:'',sch_min:'',sch_end_hour:'',sch_end_min:''})

    // スケジュールデータを取得
    let todoList = GetSchedule();

    /**
     * スケジュールから日付がNullのデータを取得する
     * (todoでは日付が入っていないデータを表示する)
     * @param array value  
     * @returns array value 
     */
    function todos(value) {
        if(value.sch_date == null){
            return value;
        }
    }

    /**
     * バックエンドから該当のデータを取得
     * @param int id TodoのID 
     * @return void
     */
    const getEditTask = (id) => {
        axios
            .post('/api/edit', {
                id:id
            })
            .then(response => {
                setEditTask({
                    id:response.data.id,
                    sch_category:response.data.sch_category,
                    sch_contents:response.data.sch_contents,
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

        //  データの削除
        const deleteTodo = async(sch_id) =>{
            await axios
                .post('api/delete',{
                    id:sch_id
                })
                .then((response)=>{
                    console.log(response);
                    return true;
                })
                .catch(error=>{
                    console.log(error);
                });
        }
        
    return (
        <div className="todoList">
                {todoList.filter(todos).map((todo,index) => (
                    <div className="todoGroup" key={index}  id={todo.sch_id}  >
                            <input type= "checkbox"  name="checkbox"/>
                            <div className="todoText" >{todo.sch_contents}</div>
                    <div className="icons">
                        {/* <button onClick={() => editTodo(todo.sch_id)}></button> */}
                        <button className="del-btn" href="/dashboard" onClick={()=>deleteTodo(todo.sch_id)} >×</button>
                        {/* <button id={todo.sch_id} onClick={() => deleteTask(editTask)}>×</button> */}
                    </div>
                    </div>
                ))}
        </div>
    )


}


