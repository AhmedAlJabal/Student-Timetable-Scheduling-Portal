<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

use Facade\FlareClient\Stacktrace\File;

use Illuminate\Http\Request;


use DateTime;

use Auth;

use Carbon\Carbon;

use RRule\RRule;

use Spatie\IcalendarGenerator\Components\Calendar;
use Spatie\IcalendarGenerator\Components\Event;






class notificationMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(Request $req)
    {
        
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

    

        $data = $calendar->get();

        $this->from('Poly@mail.com');
        $this->to(auth()->user()->email);
        $this->subject('your schedule');
        $this->attachData($data, 'Schedule.ics');
        $this->markdown('mail.notificationmail');
        return $this;

    }

}