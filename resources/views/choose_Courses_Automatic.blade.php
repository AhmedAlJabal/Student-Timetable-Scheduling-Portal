@extends('layouts.app')


@section('content')
<script src="{{asset('js/ChooseCourses.js')}}" defer></script>
<div class="container">

  
 <div class="row">
    <div class="col-md-6">   
          
   
              <form method="get" action="#">
                  @csrf

                  <div class="input-group mb-3">
                    <select class="custom-select" name="redi" id="redi">
                      <option selected>Choose a major</option>
                      @foreach($majors as $major)
                      <option  value="{{$major->SEC_COLLEGE}}">{{$major->SEC_COLLEGE}} </option>  
                      @endforeach
                    </select>
                  </div>
                </form>   
            </form>
    </div> 
    
    <div class="col-md-6">
      <h3>available credit</h3>  
      <h4 id="creditHeader" style="color: blue"> <span id="currentCredit">0 </span> / <span id="availableCredit">{{$credit}}</span></h4>
    </div>  
    
</div>


<div class="row" style="margin-top: 3em;"> 
      <div class="col-md-6" style="overflow:scroll;height:35em; overflow: auto;">
        
        <div>
          <table class="table">
            <thead class="thead-dark" style="position: -webkit-sticky;
            position: sticky;
            top: 0;
            padding: 5p">
              <tr>
                <th scope="col">College</th>
                <th scope="col">Course name</th>
                <th scope="col">Credit</th>
                <th scope="col">Add</th>
              </tr>
            </thead>
        

      
            <tbody id="courses">
                    @isset($courses)
                    @foreach ($courses as $course)
                        <tr>
                            <td>{{$course->SEC_COLLEGE}}</td>
                            <td>{{$course->SEC_SHORT_TITLE}}</td>
                            <td><button class="btn btn-link" id='courseList' onclick="alerthi(this)" value="{{$course->SEC_SHORT_TITLE}}">add</button></td>
                        </tr>
                    @endforeach
                    @endisset
            </tbody>

          </table>
        </div>
 
      </div>

      <div class="col-md-6">
        <table class="table" >
          <thead class="thead-light">
            <tr>
              <th scope="col">Course name</th>
              <th scope="col">Credit</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody id="selectedCourses">
          </tbody>
        </table>



      </div>


</div>


<div class="row" style="margin-top: 3em;">
      
      <button type="button" onclick="goToAutomatic()" class="btn btn-primary">continue</button>
      
</div>

</div>
@endsection