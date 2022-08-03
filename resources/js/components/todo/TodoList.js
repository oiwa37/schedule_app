import axios from 'axios';
import { set } from 'lodash';
import React,{ Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import GetSchedule from '../month/getSchedule/GetSchedule';
import UpdateForm from '../month/update/updateForm';
import { todos, todoTitleLimit } from '../common/Common';
import EditIcon from '@material-ui/icons/Edit';

export const TodoList = ({task,setTask}) => {
    const userId = localStorage.getItem('auth_id'); //ユーザーID

    //データの編集状態を管理
    const [editTask, setEditTask] = useState({id:'',sch_category:'',sch_contents:'',sch_date:'',sch_hour:'',sch_min:'',sch_end_hour:'',sch_end_min:''})

    // スケジュールデータを取得し格納
    let todoList = GetSchedule();

    //  データの削除
    // const deleteTodo = (sch_id) =>{
    //     axios
    //         .post('api/delete',{
    //             id:sch_id
    //         })
    //         .then((response)=>{
    //             console.log(response);
    //             return true;
    //         })
    //         .catch(error=>{
    //             console.log(error);
    //         });
    // }

    // 更新用ダイヤログ開閉機能
        const [ editOpen, setEditOpen ] = useState(false);
        const editHandleClickOpen = (e) =>{
            e.stopPropagation();
            setEditOpen(true);
            getEditData(e);
        };
        const editHandleClose = () =>{ setEditOpen(false); }

        //更新用データ配列
        const [ editData, setEditData ] = useState({id:'',sch_status:0,sch_category:'',sch_contents:'',sch_status:'', sch_date:'',sch_hour:'',sch_min:'',sch_end_hour:'',sch_end_min:''});

        // バックエンドから該当のデータを取得
        function getEditData(e){
            axios
                .post('/api/edit', {
                    id: e.currentTarget.id
                })
                .then(response => {
                    setEditData({
                        id:response.data.id,
                        sch_contents:response.data.sch_contents,
                        sch_category:response.data.sch_category,
                        sch_status:response.data.sch_status,
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

        //TODOの完了未完了をスイッチする。
        const editStatus = (e) =>{
            getEditData(e);

            if(editData.sch_status == 1){
                console.log("1");
                axios
                .post('/api/update',{
                    id: editData.id,
                    sch_category:editData.sch_category,
                    sch_contents:editData.sch_contents,
                    sch_status:2,
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
            }else if(editData.sch_status == 2){
                console.log("2");
                axios
                .post('/api/update',{
                    id: editData.id,
                    sch_category:editData.sch_category,
                    sch_contents:editData.sch_contents,
                    sch_status:1,
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
        }

        const todoIndex = 30000; //ユニークなキーを用意するため

    return (
        <div className="todoList">
                {todoList.filter(todos).map((todo,index) => (
                    <div className="todoGroup" key={todoIndex + index}  id={todo.sch_id}>
                        {/* <label className="my-checkbox" id={todo.sch_id} onClick={editStatus}> */}
                        {/* 完了ステータスであれば(未完了ステータス1でなければ)、チェックボックスにチェックが入る */}
                        {todo.sch_status == 1 ? <input type="checkbox"  name="checkbox" onChange={editStatus} id={todo.sch_id}/>:
                        <input type="checkbox"  name="checkbox" checked onChange={editStatus} id={todo.sch_id} /> }  
                            {/* <span className="checkmark"></span> */}
                            <div className="todoText">{todoTitleLimit(todo.sch_contents)}</div>
                        {/* </label> */}
                        <div className="icons">    
                            <button className="edit-btn"  id={todo.sch_id} onClick={editHandleClickOpen}>
                                <EditIcon />
                            </button>
                            {/* <button className="del-btn" onClick={()=>deleteTodo(todo.sch_id)} >
                                <CloseIcon />
                            </button> */}
                        </div>
                    </div>
                ))}
            <UpdateForm open={editOpen} onClose={editHandleClose} editData = {editData} setEditData = {setEditData} />
        </div>
    )
}


