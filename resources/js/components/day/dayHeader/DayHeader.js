import React from 'react';

export const DayHeader = (props) => {
    
    const { currentDate } = props;

    return (
        <div className="day-header">
            {/* 初期値は今日の日付 カレンダークリックで該当の日付の日程を取ってくる */}
            <h1 id="days">{currentDate}</h1> 
        </div>

    )
}
