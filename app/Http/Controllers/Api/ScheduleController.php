<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller; 
use Illuminate\Http\Request; 
use App\Models\Schedule; 


class ScheduleController extends Controller { 

  //スケジュールの一覧を取得
    public function scheduleindex(Request $request){ 
        $schedules = Schedule::all(); 

        return response()->json($schedules); 
    }

  //スケジュールの一覧を取得
    // public function todoindex(Request $request){ 
    //     $todos = Schedule::select('*');
    //     $todos->whereNull('sch_date');
    //     return response()->json($todos); 
    // }


    //スケジュールの登録処理
    public function create(Request $request){
        $schedules = new Schedule;
        $schedules->sch_date = $request->sch_date;
        $schedules->sch_time = $request->sch_time;
        $schedules->sch_end_time = $request->sch_end_time;
        $schedules->sch_category = $request->sch_category;
        $schedules->sch_contents = $request->sch_contents;
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
        // $schedules->sch_memo = $request->sch_memo;
        
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
}
