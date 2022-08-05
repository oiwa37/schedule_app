<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


//
Route::group(['middleware'=>'api'],function(){
  Route::post('posts','App\Http\Controllers\Api\ScheduleController@scheduleindex');
  Route::post('posts/create','App\Http\Controllers\Api\ScheduleController@create');
  Route::post('edit','App\Http\Controllers\Api\ScheduleController@edit');
  Route::post('update','App\Http\Controllers\Api\ScheduleController@update');
  Route::post('updateStatus','App\Http\Controllers\Api\ScheduleController@updateStatus');
  Route::post('delete','App\Http\Controllers\Api\ScheduleController@delete');
  Route::post('date','App\Http\Controllers\Api\ScheduleController@dateTable');
  
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});
//ログイン機能追加 (認証前OK)
// Route::post('register', [AuthController::class, 'register']);
// Route::post('login', [AuthController::class, 'login']);
Route::post('register', 'App\Http\Controllers\Api\AuthController@register');
Route::post('login', 'App\Http\Controllers\Api\AuthController@login');

//認証済みでないと許可しない
Route::middleware('auth:sanctum')->group(function() {
  // Route::post('logout', [AuthController::class, 'logout']);
  Route::post('logout', 'App\Http\Controllers\Api\AuthController@logout');
});




