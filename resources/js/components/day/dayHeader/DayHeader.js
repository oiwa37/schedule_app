import React,{ Fragment, useState, useEffect  } from 'react';

export const DayHeader = (props) => {
    
    const { currentDate, setCurrentDate, month, date } = props;


    //todoと同じで全データ取得後にフィルターをかける？
    //該当の日付でデータを取得したいのが本音
    return (
        <div className="day-header">
            {/* 初期値は今日の日付 カレンダークリックで該当の日付の日程を取ってくる */}
            <h1 id="days">{currentDate}</h1> 
        </div>

    )
}
