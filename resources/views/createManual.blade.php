@extends('layouts.app')

@section('content')
<script src="{{asset('js/CreateManual.js')}}" defer></script>
<div class="container">
    <div class="row">
        <p>Please select the desired sections from the table below and press generate to view the schedule</p>
    </div>

    

    <div style="margin-top: 2em;">
        {{-- nav bar --}}
        <nav class="nav nav-tabs nav-justified" id="courseNav">
            
            
          </nav>
          
         {{-- div for the navs  --}}
          <div class="tab-content" id="courseContent">
            
           
          </div>

      
    </div>  
      
   



    
    
    <!-- Button trigger modal -->
    {{-- data-target=".bd-example-modal-lg" --}}
    {{-- data-toggle="modal" --}}

    {{-- data-toggle="modal" data-target=".bd-example-modal-lg" --}}

    <button style="margin-top: 3em;" type="button" class="btn btn-primary" onclick="generateSchedule()"  id="scheduleBtn">Generate Schedule</button>
    <!-- Modal -->
    <div class="modal fade bd-example-modal-lg"   tabindex="-1"  aria-labelledby="myLargeModalLabel" aria-hidden="true" role="dialog"   id="myModal">
        <div class="modal-dialog modal-lg" style="width:80%;height:auto;">
          <div class="modal-content">
            <div class="modal-header" style="padding-top:2em; text-align: center;">
                {{-- <h5 class="modal-title" id="exampleModalLabel">Schedule</h5> --}}
                
                <input type="text" class="form-control" id="scheduleName" placeholder="Schedule name">

                <p style="padding-left: 2em; padding-top:0.3em;  visibility: hidden;" class="text-danger" id="clashTxt"> there is a clash please select diffrent sections</p>
                
                <button type="submit" class="btn btn-info" onclick="saveSchedule()" id="exportSchedule">Save</button>
                
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
            </div>   
                <div class="modal-body" id="pic">
                    <table class="table table-bordered" id="Schedule" style="line-height: 100%;">
                
                    </table>

                    <h4>Course info</h3>
                    <table class="table table-bordered" id="scheduleInfo">
                        <thead>
                            <th>CRN</th>
                            <th> Course name</th>
                            <th> Section</th>
                            <th> Tutor name</th>
                            <th> Color</th>
                        </thead>
                        <tbody id="Selection">

                        </tbody>
                    </table>
                </div>
            
          
        </div>
      </div>

    {{-- <div class="col-md-12 " style="overflow:scroll;height:25em; overflow: auto;">
        <table class="table table-bordered" id="Schedule">
                
        </table>
    </div> --}}

        

    



    </div>

    
      
      





</div>
@endsection