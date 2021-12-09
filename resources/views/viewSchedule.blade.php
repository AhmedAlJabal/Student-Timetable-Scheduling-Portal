@extends('layouts.app')

@section('content')
<script src="{{asset('js/viewSchedule.js')}}" defer></script>

<div class="container">
    <div class="row" id="pic">
            <div class="col-md-12" id="scheduleDiv" style="box-shadow:0 .5rem 1rem rgba(0,0,0,.15) !important;">
                <h3>Week at a glance</h3>
                <table class="table table-bordered" id="Schedule" style="line-height: 100%; margin-top:1em;">
            
                </table>
                

                
            </div>
            {{-- shadow p-3 mb-5 bg-white rounded" --}}
            <div class="col-md-12" id="infoDiv" style="margin-top: 2em; box-shadow:0 .5rem 1rem rgba(0,0,0,.15) !important;">
                <h3>Schedule  information</h3>
                    <table class="table table-bordered" id="scheduleInfo">
                        <thead>
                            <th>CRN</th>
                            <th> Course name</th>
                            <th> Section</th>
                            <th> Tutor name</th>
                            <th>Building Num</th>
                            <th>Room Num</th>
                            <th> Color</th>
                        </thead>
                        <tbody id="Selection">
    
                        </tbody>
                    </table>
            </div>
    </div>
    <div class="row" style="margin-top: 2em;">
        <button type="button" onclick="exportPDF()" class="btn btn-success" style="margin-left: 1em;" style="padding-left: 2em;">Export to PDF</button>
        <button type="button" onclick="setNotifications()" class="btn btn-info" style="margin-left: 3em;">generate calander notifications</button>

    </div>
</div>


@endsection