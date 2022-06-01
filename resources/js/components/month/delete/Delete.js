import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

function Delete(props){
    const { editData } = props;

    //削除処理
    const deleteSchedule = async( post ) =>{
        await axios
            .post('api/delete',{
                id:editData.id
            })
            .then((response)=>{
                this.setState({
                    posts:response.posts
                });
            })
            .catch(error=>{
                console.log(error);
            });
    }

    return (
        <Button href="/dashboard" onClick={deleteSchedule}>Delete</Button>
    );
}

export default Delete;