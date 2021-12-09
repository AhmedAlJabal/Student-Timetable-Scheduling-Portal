<?php

use Barryvdh\DomPDF\PDF;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController; 
use App\Http\Controllers\ScheduleController; 
use App\Http\Controllers\CourseController; 
use \Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    if (Auth::check() == true) {
        return redirect()->route('home');
    }else{
        return view('auth.login');
    }
})->name('welcome');


Route::get('/home', [HomeController::class,'index'])->name('home')->middleware('auth');




Route::get('/getSchedule',[ScheduleController::class,'getSchedules'])->middleware('auth');




Auth::routes([
    'reset' => false,
    'verify' => false,
    'register' => false,
]);


//routing to manual
Route::get('/choose_Courses_Manual',[CourseController::class,'routeToManual'])->middleware('auth');
Route::get('/getCourses',[CourseController::class,'getCourses'])->middleware('auth');
Route::get('/createManual', function(){
    return view('createManual');
})->middleware('auth');


Route::get('/getSectionsManual',[CourseController::class,'getsectionsManual'])->middleware('auth');
Route::get('/getChoosenSection',[CourseController::class,'getChoosenSection'])->middleware('auth');

Route::get('/ManualPDFDownload',[CourseController::class,'ManualPdfDownload'])->middleware('auth');






//saving the schedule
Route::get('/saveSchedule',[ScheduleController::class,'saveSchedule'])->middleware('auth');

//getting the schedules
Route::get('/getUserSchedules',[ScheduleController::class,'getUserSchedules'])->middleware('auth');

//delete a schedule
Route::get('/deleteScedule',[ScheduleController::class,'deleteScedule'])->middleware('auth');

//viewing schedules
Route::get('/viewSchedule', function(){
    return view('viewSchedule');
})->middleware('auth');

//retriving the selected schedule sections
Route::get('/getScheduleSections',[ScheduleController::class,'getScheduleSections'])->middleware('auth');


// creating the ics file
Route::get('/createics',[ScheduleController::class,'createics'])->middleware('auth');


//setting the calandar notifications
Route::get('/setNotifications',function(){
    Mail::send(new \App\Mail\notificationMail());
})->middleware('auth');




//routing to automatic
Route::get('/choose_Courses_Automatic',[CourseController::class,'routeToAutomatic'])->middleware('auth');

Route::get('/createAutomatic', function(){
    return view('createAutomatic');
})->middleware('auth');

Route::get('/getsectionsAutomatic',[CourseController::class,'getsectionsAutomatic'])->middleware('auth');