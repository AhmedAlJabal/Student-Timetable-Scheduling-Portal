@extends('layouts.app')

@section('content')
<script src="{{asset('js/CreateAutomatic.js')}}" defer></script>

<div class="container">
    <div class="row">   
        <p id="nocombotxt" class="text-danger" style=" visibility: hidden;">there are no available schedules for the courses you choose</p>
    </div>

    
    
        <div class="text-center" style="position: fixed; left: 50%;
                                        top: 50%;
                                        transform: translate(-50%, -50%);" id="spinner">
            <div class="spinner-border text-primary" style="width: 5rem; height: 5rem;" role="status">
            </div>
            
            <h3 style="margin-top: 2rem;">Generating your schedules please wait</h3>
            <h6 style="margin-top: 0.5rem;">note: this may take anywhere from 10 seconds to 3 minutes depending on the amount of sections in each course</h6>
        </div>
    
  

        
                        
                <div style="overflow:scroll;height:40em; overflow: auto; visibility: hidden;" id="schedulesDiv">
                    <table class="table table-bordered">
                        <thead class="thead-dark" style="position:-webkit-sticky;
                            position: sticky;
                            top: 0;
                            padding: 5p">
                            <th scope="col">
                                #
                            </th>
                            <th scope="col">
                                Courses CRNs
                            </th>

                            <th scope="col">
                                view
                            </th>


                        </thead>
                        <tbody id=availableSchedulues>
                        </tbody>    
                        
                    </table>
                </div>

    <!-- Modal -->
    <div class="modal fade bd-example-modal-lg"   tabindex="-1"  aria-labelledby="myLargeModalLabel" aria-hidden="true" role="dialog"  id="myModal">
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
                    <table class="table table-bordered" id="Schedule" style="line-height: 100%; visibility =hidden">
                
                    </table>

                    <h4>Course info</h3>
                    <table class="table table-bordered" id="scheduleInfo">
                        <thead>
                            <th>CRN</th>
                            <th>Course name</th>
                            <th>Section</th>
                            <th>Tutor name</th>
                            <th>Cap</th>
                            <th>Act</th>
                            <th>Rem</th>
                            <th>Color</th>
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