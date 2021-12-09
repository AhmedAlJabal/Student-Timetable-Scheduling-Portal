<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use APP\Models\Course;
use Illuminate\Pagination\Paginator;
use App\config\Session;
use Barryvdh\DomPDF\Facade as PDF; 
// use Barryvdh\DomPDF\PDF  as PDF;
//use Barryvdh\DomPDF\PDF;
use SebastianBergmann\Environment\Console;
use Symfony\Component\VarDumper\Cloner\Data;
use Illuminate\Support\Facades\DB;
//use PDF;

class CourseController extends Controller
{
    //

    


    public function routeToManual(Request $req)
    {
        
        $majors = \App\Models\Course::select('SEC_COLLEGE')->distinct()->get();
        
        

        $courses = \App\Models\Course::select('SEC_SHORT_TITLE', 'SEC_COLLEGE')->where('SEC_COLLEGE',  $req->major)->distinct()->get();

        $credit = auth()->user()->credit;

        return view('choose_courses_Manual', compact('majors', 'courses','credit'));
        
    }

    public function routeToAutomatic(Request $req)
    {
        
        $majors = \App\Models\Course::select('SEC_COLLEGE')->distinct()->get();
        
        

        $courses = \App\Models\Course::select('SEC_SHORT_TITLE', 'SEC_COLLEGE')->where('SEC_COLLEGE',  $req->major)->distinct()->get();

        $credit = auth()->user()->credit;

        return view('choose_courses_Automatic', compact('majors', 'courses','credit'));
        
    }

    public function getCourseManual(Request $req){
        
        $req->major;
        

        $majors = \App\Models\Course::select('SEC_COLLEGE')->distinct()->get();
        
        $courses = \App\Models\Course::select('SEC_SHORT_TITLE', 'SEC_COLLEGE')->where('SEC_COLLEGE',  $req->major)->distinct()->get();
        

        return view('choose_courses_Manual', compact('majors', 'courses'));
        

    }


    public function getCourses(Request $req){

       
        // $courses = \App\Models\Course::select('SEC_SHORT_TITLE', 'SEC_COLLEGE', 'SEC_CREDIT_HOURS')->where('SEC_COLLEGE',  $req['major'])
        // ->distinct()->get();

        $courses = DB::table('courses')
        ->select('SEC_SHORT_TITLE', 'SEC_COLLEGE', 'SEC_CREDIT_HOURS')
        ->whereRaw('SEC_COLLEGE = ? and SEC_CREDIT_HOURS != ?', [$req['major'], 0] )
        ->distinct()
        ->get();

        return response()->json([
            'courses' => $courses
        ]);
    }

    //used for manual
    public function getsectionsManual(Request $req){
        $courses = explode(",",$req['selectedCourses']);
        $dictionary = [];

        foreach($courses as $course){
            $info =  \App\Models\Course::select('SEC_CRN', 'SEC_SECTION','SEC_START_TIME','SEC_END_TIME','SEC_WK_DAYS','SEC_MAX_EMROLLMENT','SEC_ENROLLED_STUDENTS')->where('SEC_SHORT_TITLE',  $course)->get();
            //,'SEC_START_TIME','SEC_END_TIME','SEC_WK_DAYS'
            $dictionary[$course] = $info;
            
        }

        return response($dictionary);

    }

    //used for automatic
    public function getsectionsAutomatic(Request $req){
        $courses = explode(",",$req['selectedCourses']);
        $dictionary = [];

        foreach($courses as $course){
            $info =  \App\Models\Course::select('SEC_CRN')
            ->whereRaw('SEC_SHORT_TITLE = ? and SEC_SECTION not like ?',  [$course, 'L%'])
            ->distinct()
            ->get();


            $dictionary[$course] = $info;
            
        }

        return response($dictionary);
    }

    public function getChoosenSection(Request $req){

        $CRNs = explode(",", $req["choosenCRN"]);

        error_log(implode(",",$CRNs));

    
        $dictionary = [];
        
         foreach($CRNs as $CRN){
            
             $info =  \App\Models\Course::select('SEC_SHORT_TITLE','SEC_SECTION','SEC_START_TIME','SEC_HOURS_PER_WK',
             'SEC_WK_DAYS','SEC_TUTOR','SEC_BUILDING','SEC_ROOM','SEC_MAX_EMROLLMENT','SEC_ENROLLED_STUDENTS')->where('SEC_CRN',  $CRN)->get();
             $dictionary[$CRN] = $info;
            
         }

        return response($dictionary);
        
    }




}
