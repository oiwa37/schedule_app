import React from 'react'

export const DeleteTodo = () => {
    const { editTask, setEditTask, editId } = props;



    //データの削除
    const deleteTodo = async(editId) => {
        getEditTask(editId);

        await axios
            .post('api/delete',{
                id: edit.id
            })
            .then((response)=>{
                console.log(response);
                

            })
            .catch(error=>{
                console.log(error);
            });
    }




    // バックエンドから該当のデータを取得
    function getEditTask(id){
        axios
            .post('/api/edit', {
                id: id
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



    return (
        <button href="/dashboard" onClick={deleteTask}>×</button>
    )
}
