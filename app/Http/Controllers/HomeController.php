<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use APP\Models\Course;
use App\Models\Schedule;
use App\Models\ScheduleSection;
use Illuminate\Pagination\Paginator;
use App\config\Session;
use Barryvdh\DomPDF\Facade as PDF; 
// use Barryvdh\DomPDF\PDF  as PDF;
//use Barryvdh\DomPDF\PDF;
use SebastianBergmann\Environment\Console;
use Symfony\Component\VarDumper\Cloner\Data;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
       $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
        
    }

    public function getSchedules(Request $req){

        // $uid = auth()->user()->id;

        // $schedules = \App\Models\Schedule::select('uniqueid', 'name')->where('userid',  $uid)->get();

        // return response($schedules);
    }

}
