@extends('layouts.app')

@section('content')
<script src="{{asset('js/homePage.js')}}" defer></script>

<div class="container">
    <div class="row justify-content-center">
    </div>
    <div class="row justify-content-center" style="margin-top: 10em">
        <div class="col-md-5">
                <div class="text-center">
                    
                    <h3 class="text-center">Manual Scheduling</h3>
                    
                    <a class="btn btn-primary text-center" style="margin-top: 0.5em;" href="{{@choose_Courses_Manual}}" role="button">Create</a>
                </div>
        </div>

        <div class="col-md-2"></div>
        <div class="col-md-5">

            <div class="text-center">
               
                <h3 class="text-center">Automatic Scheduling</h3>
                
                <a class="btn btn-primary text-center" style="margin-top: 0.5em;" href="{{@choose_Courses_Automatic}}" role="button">Create</a>
            </div>

        </div>
    </div>

    <div class="row justify-content-center" style="margin-top: 3em;" style="overflow:scroll;height:40em; overflow: auto;">
        <table class="table">
            <thead class="thead-light" style="position:-webkit-sticky;
            position: sticky;
            top: 0;
            padding: 5p">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Unique ID</th>
                <th scope="col">name</th>
                <th scope="col">Creation Date</th>
                <th scope="col">View</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody id="schedulebody">

            </tbody>
          </table>
    
    </div>
    

</div>
@endsection
