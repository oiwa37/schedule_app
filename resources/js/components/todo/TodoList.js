import axios from 'axios';
import { set } from 'lodash';
import React,{ Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import GetSchedule from '../month/getSchedule/GetSchedule';
import UpdateForm from '../month/update/updateForm';
import { todos } from '../common/Common';
import { zeroPadding } from '../common/Common';
// import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@material-ui/icons/Edit';
import { TodayOutlined } from '@material-ui/icons';


export const TodoList = ({task,setTask}) => {

    //データの編集用
    const [editTask, setEditTask] = useState({id:'',sch_category:'',sch_contents:'',sch_date:'',sch_hour:'',sch_min:'',sch_end_hour:'',sch_end_min:''})

    // スケジュールデータを取得
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
        const [ editData, setEditData ] = useState({id:'',sch_category:'',sch_contents:'',sch_status:'', sch_date:'',sch_hour:'',sch_min:'',sch_end_hour:'',sch_end_min:''});

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

    return (
        <div className="todoList">
                {todoList.filter(todos).map((todo,index) => (
                    <div className="todoGroup" key={index}  id={todo.sch_id}>
                        <label className="my-checkbox" >
                            <input type= "checkbox"  name="checkbox"/>
                            <span className="checkmark"></span>
                            <div className="todoText">{todo.sch_contents}</div>
                        </label>
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


