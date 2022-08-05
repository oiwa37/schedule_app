<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller; 
use Illuminate\Http\Request; 
use App\Models\Schedule; 


class ScheduleController extends Controller { 

  //スケジュールの一覧を取得
    public function scheduleindex(Request $request){ 
        
        // $schedules = Schedule::all();  全データ取得から
        //ここを個々のユーザのデータ取得に変える
        $schedules = Schedule::where('user_id','=', $request->id)->get(); 
        return response()->json($schedules); 
    }


    //スケジュールの登録処理
    public function create(Request $request){
        $schedules = new Schedule;
        $schedules->user_id = $request->user_id;
        $schedules->sch_date = $request->sch_date;
        $schedules->sch_time = $request->sch_time;
        $schedules->sch_end_time = $request->sch_end_time;
        $schedules->sch_category = $request->sch_category;
        $schedules->sch_contents = $request->sch_contents;
        $schedules->sch_status = $request->sch_status;
        // $schedules->sch_memo = $request->sch_memo;
        $schedules->save();
        return response()->json($schedules);
    }

    //更新用データを取得
    public function edit(Request $request){
        $schedules = Schedule::find($request->id);
        return $schedules;
    }

    //データを更新
    public function update(Request $request){
        // $id = (int) $request->input('id');
        $schedules = Schedule::find($request->id);
        $schedules->sch_date = $request->sch_date;
        $schedules->sch_time = $request->sch_time;
        $schedules->sch_end_time = $request->sch_end_time;
        $schedules->sch_category = $request->sch_category;
        $schedules->sch_contents = $request->sch_contents;
        $schedules->sch_status = $request->sch_status;
        // $schedules->sch_memo = $request->sch_memo;
        
        $schedules->save();
        return $schedules;
    }

        //ステータスを更新
        public function updateStatus(Request $request){
            // $id = (int) $request->input('id');
            $schedules = Schedule::find($request->id);
            $schedules->sch_status = $request->sch_status;
            $schedules->save();
            return $schedules;
        }


    //データを削除
    public function delete(Request $request){
        $schedule = Schedule::find($request->id);
        $schedule->delete();
        $schedules = Schedule::all();
        return $schedules;
    }

    //該当の日付のデータを取得
    public function dateTable(Request $request){
        $schedules = Schedule::where('sch_date', '=', $request->date)
                                ->where('user_id','=', $request->id)->get();
        return response()->json($schedules); 
    }
}
