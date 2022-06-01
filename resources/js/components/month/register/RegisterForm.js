import React from 'react';
import PropTypes from 'prop-types';
import Register from './Register';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


function RegisterForm(props){

    const { open, onClose, formData, setFormData } = props;

    // RegisterForm.propTypes = {
    //     handleClose:PropTypes.func.isRequired,
    //     handleClickOpen:PropTypes.bool.isRequired,
    // };

    const handleClose = () =>{
        onClose();
    };




    //入力値を一時保存
    const inputChange = (e) =>{
        const key = e.target.name;
        const value = e.target.value;
        formData[key] = value;
        let datas = Object.assign({},formData); //{}にデータをコピー
        setFormData(datas);
        console.log(datas);
    }

    return (
        
    //  スケジュール登録ダイヤログ 
    <Dialog onClose={handleClose} open={open} >
    <DialogTitle>スケジュール登録</DialogTitle>
    <DialogContent>
        {/* <DialogContentText>
            スケジュール登録
        </DialogContentText> */}
        <TextField required 
            margin="dense"
            id="sch_contents"
            name="sch_contents"
            label="予定"
            type="text"
            fullWidth variant="standard" 
            onChange={inputChange}/>
        <TextField 
            margin="dense"
            id="sch_date"
            name="sch_date"
            label=""
            type="date"
            fullWidth variant="standard" 
            onChange={inputChange}/>
        <InputLabel id="sch_time_label">開始時刻</InputLabel>
        <Select 
            labelId="sch_hour" 
            id="sch_hour_select"
            name="sch_hour" 
            label="Hour" 
            variant="standard" 
            defaultValue="00"  
            onChange={inputChange}>
            <MenuItem value="00">00</MenuItem>
            <MenuItem value="01">01</MenuItem>
            <MenuItem value="02">02</MenuItem>
            <MenuItem value="03">03</MenuItem>
            <MenuItem value="04">04</MenuItem>
            <MenuItem value="05">05</MenuItem>
            <MenuItem value="06">06</MenuItem>
            <MenuItem value="07">07</MenuItem>
            <MenuItem value="08">08</MenuItem>
            <MenuItem value="09">09</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="11">11</MenuItem>
            <MenuItem value="12">12</MenuItem>
            <MenuItem value="13">13</MenuItem>
            <MenuItem value="14">14</MenuItem>
            <MenuItem value="15">15</MenuItem>
            <MenuItem value="16">16</MenuItem>
            <MenuItem value="17">17</MenuItem>
            <MenuItem value="18">18</MenuItem>
            <MenuItem value="19">19</MenuItem>
            <MenuItem value="20">20</MenuItem>
            <MenuItem value="21">21</MenuItem>
            <MenuItem value="22">22</MenuItem>
            <MenuItem value="23">23</MenuItem>
        </Select>
        <Select 
            labelId="sch_min"
            id="sch_min_select" 
            name="sch_min" 
            label="Min" 
            variant="standard" 
            defaultValue="00" 
            onChange={inputChange}>
            <MenuItem value="00">00</MenuItem>
            <MenuItem value="15">15</MenuItem>
            <MenuItem value="30">30</MenuItem>
            <MenuItem value="45">45</MenuItem>
        </Select>
        <InputLabel id="sch_end_time_label">終了時刻</InputLabel>
        <Select 
            labelId="sch_end_hour" 
            id="sch_end_hour_select" 
            name="sch_end_hour" 
            label="endHour" 
            variant="standard" 
            defaultValue="00" 
            onChange={inputChange}>
            <MenuItem value="00">00</MenuItem>
            <MenuItem value="01">01</MenuItem>
            <MenuItem value="02">02</MenuItem>
            <MenuItem value="03">03</MenuItem>
            <MenuItem value="04">04</MenuItem>
            <MenuItem value="05">05</MenuItem>
            <MenuItem value="06">06</MenuItem>
            <MenuItem value="07">07</MenuItem>
            <MenuItem value="08">08</MenuItem>
            <MenuItem value="09">09</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="11">11</MenuItem>
            <MenuItem value="12">12</MenuItem>
            <MenuItem value="13">13</MenuItem>
            <MenuItem value="14">14</MenuItem>
            <MenuItem value="15">15</MenuItem>
            <MenuItem value="16">16</MenuItem>
            <MenuItem value="17">17</MenuItem>
            <MenuItem value="18">18</MenuItem>
            <MenuItem value="19">19</MenuItem>
            <MenuItem value="20">20</MenuItem>
            <MenuItem value="21">21</MenuItem>
            <MenuItem value="22">22</MenuItem>
            <MenuItem value="23">23</MenuItem>
        </Select>
        <Select 
            labelId="sch_end_min"
            id="sch_end_min_select" 
            name="sch_end_min" 
            label="endMin" 
            variant="standard" 
            defaultValue="00" 
            onChange={inputChange}>
            <MenuItem value="00">00</MenuItem>
            <MenuItem value="15">15</MenuItem>
            <MenuItem value="30">30</MenuItem>
            <MenuItem value="45">45</MenuItem>
        </Select>
        <InputLabel id="sch_category_label">カテゴリー</InputLabel>
        <Select 
            labelId="sch_category" 
            id="sch_category_select" 
            name="sch_category" 
            label="Category" 
            variant="standard" 
            defaultValue="なし" 
            onChange={inputChange}>
            <MenuItem value="なし">なし</MenuItem>
            <MenuItem value="仕事">仕事</MenuItem>
            <MenuItem value="遊び">遊び</MenuItem>
            <MenuItem value="その他">その他</MenuItem>
        </Select>
        {/* <TextField 
            margin="dense" 
            id="sch_memo" 
            name="sch_memo" 
            label="メモ" 
            type="text" 
            fullWidth variant="standard" 
            value=""
            onChange={inputChange}/> */}
    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Register formData={formData}/>
    </DialogActions>
    </Dialog>

    );
}




export default RegisterForm;