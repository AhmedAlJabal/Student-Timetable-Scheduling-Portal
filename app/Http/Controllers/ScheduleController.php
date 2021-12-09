<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use APP\Models\Course;
use App\Models\Schedule;
use App\Models\ScheduleSection;
use Illuminate\Pagination\Paginator;
use App\config\Session;

use SebastianBergmann\Environment\Console;
use Symfony\Component\VarDumper\Cloner\Data;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Auth;


use DateTime;
use Carbon\Carbon;

use RRule\RRule;

use Spatie\IcalendarGenerator\Components\Calendar;
use Spatie\IcalendarGenerator\Components\Event;








class ScheduleController extends Controller
{
    //

    public function saveSchedule(Request $req){

        $uniqueid = Str::random(9);

        $schedule = new Schedule();
        $schedule->userid =auth()->user()->id;
        $schedule->uniqueid = $uniqueid;
        $schedule->name = $req->name;

        $schedule->save();
        $scheduleid = $schedule->id;

        $sections = explode(",",$req->passedCRN);
        

        foreach($sections as  $section){
            $scheduleSection = new ScheduleSection();
            $scheduleSection->scheduleid  = $scheduleid;
            $scheduleSection->crn = $section;

            $scheduleSection->save();
        }

        return ['success' => true, 'message' => 'New Schedule created'];
        
    }

    public function getUserSchedules(){

        $userid = auth()->user()->id;

        $schedules = \App\Models\Schedule::select('uniqueid', 'name','created_at')->where('userid', $userid)->get();

        return response($schedules);

    }

    public function deleteScedule(Request $req){

        $uniqueid = $req["selectedSchedule"];

        $idrecord = \App\Models\Schedule::select('id')->where('uniqueid', $uniqueid)->get();

        $id = $idrecord[0]["id"];
        
        $data = \App\Models\Schedule::find($id);

        
        $data->delete();

        //$schedule = \App\Models\Schedule::where('uniqueid',$uniqueid)->delete();

        
        return ['success' => true, 'message' => 'Schedule deleted'];
    }

    public function getScheduleSections(Request $req){
        $uniqueid = $req->selectedSchedule;

        //getting the id record
        $idrecord = \App\Models\Schedule::select('id')->where('uniqueid', $uniqueid)->get();
        
        //getting the schedule id
        $id = $idrecord[0]["id"];

        //getting all the sections in the schedule
        $sections = \App\Models\ScheduleSection::select('crn')->where('scheduleid', $id)->get();

        // //returning the sections
        return response($sections);
    }


    public function createics(Request $req){


        $CRNs = explode(",", $req["choosenCRN"]);

        $calendar = Calendar::create()
        ->name('your schedule');
        // ->withTimezone('Asia/Bahrain');
        

       

        
        foreach($CRNs as $CRN){

            $info = \App\Models\Course::select('SEC_SHORT_TITLE','SEC_SECTION','SEC_START_TIME','SEC_HOURS_PER_WK','SEC_WK_DAYS','SEC_TUTOR','SEC_BUILDING','SEC_ROOM')
            ->where('SEC_CRN',  $CRN)->get();

            $count = \App\Models\Course::where('SEC_CRN',  $CRN)->count();

            $x =0;
            
            

            while($x < $count){
                $title = $info[$x]['SEC_SHORT_TITLE'];
                $building = $info[$x]['SEC_BUILDING'];
                $room = $info[$x]['SEC_ROOM'];
                $address = "building: " . $building . " room: " .$room;
               

                $datstart   = '2021-09-14 ';
                $datend     = '2022-01-12 ';
                // $datstart   = '2018-09-01 ';
                // $datend     = '2019-01-01 ';


                $time = substr_replace($info[$x]['SEC_START_TIME'], ":", 2, 0);

                $hour = substr($info[$x]['SEC_START_TIME'],0,2);
                $hour = (int)$hour - 3;

                $hour = (string)$hour;

                if(strlen($hour) == 1){
                    $time = '0'.$hour. substr( $time ,2,5);
                }
                elseif(strlen($hour) == 2){
                    $time = $hour. substr( $time ,2,5);
                }
                                
                            

                //for the day
                if(trim($info[$x]["SEC_WK_DAYS"]) == "U"){
                    $rrule = new RRule([
                        'FREQ' => 'weekly',
                        'BYDAY' => 'SU',
                        'DTSTART' => $datstart .$time,
                        'UNTIL' => $datend
                    ]);
                   
                }elseif(trim($info[$x]["SEC_WK_DAYS"]) == "M"){
                    $rrule = new RRule([
                        'FREQ' => 'weekly',
                        'BYDAY' => 'MO',
                        'DTSTART' => $datstart .$time,
                        'UNTIL' => $datend
                    ]);
                }elseif(trim($info[$x]["SEC_WK_DAYS"]) == "T"){
                    $rrule = new RRule([
                        'FREQ' => 'weekly',
                        'BYDAY' => 'TU',
                        'DTSTART' => $datstart .$time,
                        'UNTIL' => $datend
                    ]);
                    
                }elseif(trim($info[$x]["SEC_WK_DAYS"]) == "W"){
                    $rrule = new RRule([
                        'FREQ' => 'weekly',
                        'BYDAY' => 'WE',
                        'DTSTART' => $datstart .$time,
                        'UNTIL' => $datend
                    ]);
                    
                }elseif(trim($info[$x]["SEC_WK_DAYS"]) == "R"){
                    $rrule = new RRule([
                        'FREQ' => 'weekly',
                        'BYDAY' => 'TH',
                        'DTSTART' => $datstart .$time,
                        'UNTIL' => $datend
                    ]);
                }

                foreach ($rrule as $occurrence) {

                    $calendar ->event(
                        Event::create($title)
                        ->address($address)
                        ->addressName('Bahrain Polytechnic')
                        ->startsAt(new DateTime($occurrence->format('r')))
                        // ->withTimezone('Asia/Bahrain')                
                        ->alertMinutesBefore(15, $title . ' class is starting in 15 minutes')
                        );
                    
                }
                
                //to go to the next section
                $x += 1;

            
            }
            
            
        }

       
        return response($calendar->get(), 200, [
           'Content-Type' => 'text/calendar',
           'Content-Disposition' => 'attachment; filename="Schedule.ics"',
           'charset' => 'utf-8',
        ]);

           


    }


}
