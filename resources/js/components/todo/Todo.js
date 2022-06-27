import React,{ Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { InputForm } from './InputForm';
import { TodoList } from './TodoList';

import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
{/* <FontAwesomeIcon icon={faThumbtack}/> */}

export const Todo = () => {

  const username = localStorage.getItem('auth_name'); //ユーザーネーム
  const userId = localStorage.getItem('auth_id'); //ユーザーID
  
    //スケジュールの状態を管理
    // const [schedules, setSchedules] = useState([]);
    //Todoの状態を管理
    const [task, setTask]= useState({user_id:userId,id:'',sch_contents:'',sch_category:'なし',sch_date:'',sch_hour:'00',sch_min:'00',sch_end_hour:'00',sch_end_min:'00'});



  return (
    <Fragment>
      <div className="todo">
      <h1>Todo List   </h1>
        {/* 入力フォーム */}
        <InputForm task={task} setTask={setTask} />
        {/* TodoListを表示する */}
        <TodoList task={task} setTask={setTask} />
      </div>
    </Fragment>
    )
}
