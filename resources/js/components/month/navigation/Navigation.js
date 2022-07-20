import React from 'react';
import RegisterForm from '../register/RegisterForm';

function Navigation(props){

    const { year, month, setYear, setMonth, open, setOpen, onClose, formData, setFormData } = props;


    //月のナビゲーションボタン
    const onClick = n => () => {
        const nextMonth = month + n
        if (12 < nextMonth) {
          setMonth(1)
          setYear(year + 1)
        } else if (nextMonth < 1) {
          setMonth(12)
          setYear(year - 1)
        } else {
          setMonth(nextMonth)
        }
    }

    //登録用ダイヤログ開閉処理
    const handleClickOpen = (e) =>{ setOpen(true); };
    const handleClose = () =>{ setOpen(false); };

    return(
        <div className="calender-header">
            <h1 className = "this-month" id="current-month">{`${year}年${month}月`}</h1>
            <div className = "register-form"  onClick={handleClickOpen}>スケジュール登録</div>
            <div className="calender-nav">
                <button onClick={onClick(-1)}>{'<先月'}</button>
                <button onClick={onClick(1)}>{'翌月>'}</button>
            </div>
            <RegisterForm open={open} onClose={handleClose} formData={formData} setFormData={setFormData}  />
        </div>
    )
}

export default Navigation;