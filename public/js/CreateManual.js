var selectedCourses = [];

var courses =[];

let output = "";

let choosenCRN = [];


let clash = false;

$(document).ready(function() {
    //getting passed in course names from the previous page
    loadCourses();

    //getting the sections details from the passed in 
    $.ajax({
        url: 'getSectionsManual',
        type: "GET",
        data: "selectedCourses=" + selectedCourses,
        dataType: "json",
        success: function(result) {

            courses = result;
            //console.log(courses);
            //console.table(courses);
           
            //to check if it is the first instance 
            i = 1;    

            for( course in courses){
                // console.log(course); //computer system or linux
                
                output+= '<table class="table table-bordered" id=courses>\
                <thead class="thead-dark" style="position: -webkit-sticky;\
                position: sticky;\
                top: 0;\
                padding: 5p">\
                        <th >\
                        #\
                        </th>\
                        <th >\
                        '+course+'\
                        </th>\
                        <th >\
                        CRN\
                        </th>\
                        <th>\
                        Section\
                        </th>\
                        <th>\
                        Day\
                        </th>\
                        <th>\
                        Start Time\
                        </th>\
                        <th>\
                        End Time\
                        </th>\
                        <th>\
                        Cap\
                        </th>\
                        <th>\
                        Act\
                        </th>\
                        <th>\
                        Rem\
                        </th>\
                        </thead>\
                        <tbody>';


                var previousCRN = "";
                for(section  of courses[course]){
                    
                    var startTime = section["SEC_START_TIME"].substring(0,2) + ":" + section["SEC_START_TIME"].substring(2,4);
                    var endTime = section["SEC_END_TIME"].substring(0,2) + ":" + section["SEC_END_TIME"].substring(2,4);

                    var remaningSeats = section["SEC_MAX_EMROLLMENT"] - section["SEC_ENROLLED_STUDENTS"];

                    if(previousCRN == section["SEC_CRN"]){

                    output +=   '\
                                    <tr>\
                                    <td><br></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td style="max-width:20px;">'+section["SEC_WK_DAYS"]+'</td>\
                                    <td>'+ startTime+'</td>\
                                    <td>'+endTime+'</td>\
                                    </tr>';
                       
                    }else{
                        output+='\
                    <tr>\
                    <td><input type="checkbox" class="CRN" value="'+section["SEC_CRN"]+","+section["SEC_SECTION"]+","+course+'"></td>\
                    <td>'+course+'</td>\
                    <td>'+section["SEC_CRN"]+'</td>\
                    <td>'+section["SEC_SECTION"]+'</td>\
                    <td>'+section["SEC_WK_DAYS"]+'</td>\
                    <td>'+startTime+'</td>\
                    <td>'+endTime+'</td>\
                    <td>'+section["SEC_MAX_EMROLLMENT"]+'</td>\
                    <td>'+section["SEC_ENROLLED_STUDENTS"]+'</td>\
                    <td>'+remaningSeats+'</td>\
                    </tr>\
                    ';

                    }
                

                    

                    previousCRN = section["SEC_CRN"];
                    
                }
                output += '</tbody>\
                           </table>';


            trimmedname = course.replace(/\s/g, "");
            
            $('#courseNav').append('<a class="nav-item nav-link" data-toggle="tab" href="#'+trimmedname+'">'+course+'</a>');
            if(i == 1){
                $('#courseContent').append('<div id="'+trimmedname+'" class="tab-pane fade show active" style="overflow:scroll;height:25em; overflow: auto;">\
                </div>');
            }else{
                $('#courseContent').append('<div id="'+trimmedname+'" class="tab-pane fade" style="overflow:scroll;height:25em; overflow: auto;">\
                </div>');
            }
            

            $('#'+trimmedname).append(output);

            output = "";

            i++;

                //old
                //$('#courses').append(output);
            }
            
            
            


            
            
        }
    });


});


function loadCourses() {
    //getting the passed in crns from the previous page
    var sessionString = sessionStorage.getItem('Courses');
    selectedCourses = JSON.parse(sessionString);
    console.log(selectedCourses);
}




function saveSchedule(){
    
    var name = "";

    name =  document.getElementById("scheduleName").value;
    if(name == ""){
        name = "schedule"
    }

    var passedCRN ="";

    for(i =0; i <choosenCRN.length; i++){
        passedCRN += choosenCRN[i];
        if (i < choosenCRN.length -1  ){
            passedCRN += ",";
        }else{
            
        }
    }

    $.ajax({
        url: 'saveSchedule',
            type: "get",
            data: {'passedCRN': passedCRN,
                    'name': name},
            success: function(result){

                alert(result["message"]);
                window.location.replace("home");
            }
            
    });



}



function generateSchedule(){
    
    //test for clashes inside the table
    clash = false;

    var CRNcheckbox = document.getElementsByClassName("CRN");
    
    choosenCRN = [];
    

    //array will store the section name and detail while the boolean is used to check if the user choose multiple invalid sections from the same course
    var selectionTest = [];
    var selectionbool = false;

    for(i=0; i< CRNcheckbox.length;i++){
        if (CRNcheckbox[i].checked ==true){

                //check if the selected sections are valid
            if(selectionTest.includes(CRNcheckbox[i].value.substring(6,8) + CRNcheckbox[i].value.substring(10))){
                
                selectionbool = true;
            }

            //add to the test
            selectionTest.push(CRNcheckbox[i].value.substring(6,8) + CRNcheckbox[i].value.substring(10));

            //choosen crns
            choosenCRN.push(CRNcheckbox[i].value.substring(0,5));

        }
        

    }

    //if the selected sessions are invalid
    if (selectionbool == true){     
        alert("invalid selection");
        
    }
    else if(choosenCRN.length == 0){
        alert("please select at least one section");
    }
    else{
        console.log(choosenCRN);
    $.ajax({
        url: 'getChoosenSection',
        type: "GET",
        data: "choosenCRN=" + choosenCRN,
        dataType: "json",
        success: function(result){
            console.log(result);


            //for back ground colors
            var colors = ['#FFE37D','#C8F7C5','#E08283','#99CCCC','#F7B891','#CCCC99','#F4D03F','#CBC4C1','#EBEDB3','#96B695'];

            //saving the retrived data into a variable
            var CRNs = result;

            //emptying the schedule table
            $('#Schedule').empty();
            
            //preparing the output table
            output = "";
            output += '<thead style="min-width:15em;min-height:10em;">\
            <th scope="col">\
                Time\
            </th>\
            <th scope="col">\
                Sunday\
            </th>\
            <th scope="col">\
                Monday\
            </th>\
            <th scope="col">\
                Tuesday\
            </th>\
            <th scope="col">\
                wednesday\
            </th>\
            <th scope="col">\
                Thursday\
            </th>\
        </thead>';
        
        output += '<tbody style="min-width:15em;min-height:10em;">';

        var time = 800;
        while (time <= 2000) {

            //if digits = 3
            if (time.toString().length == 3){
                output +='\
                <tr id="'+time+'"></tr>\
                    <td>'+time.toString().substring(0,1) + ":" + time.toString().substring(1,3)+'</td>\
                    <td  id="U" class="'+time+'"></td>\
                    <td  id="M" class="'+time+'"></td>\
                    <td  id="T" class="'+time+'"></td>\
                    <td  id="W" class="'+time+'"></td>\
                <td  id="R" class="'+time+'"></td>\
                ';
                //if digits are larger than 3
            }else{
                output +='\
                <tr id="'+time+'"></tr>\
                    <td>'+time.toString().substring(0,2) + ":" + time.toString().substring(2,4)+'</td>\
                    <td  id="U" class="'+time+'"></td>\
                    <td  id="M" class="'+time+'"></td>\
                    <td  id="T" class="'+time+'"></td>\
                    <td  id="W" class="'+time+'"></td>\
                <td  id="R" class="'+time+'"></td>\
                ';
            }
            
                time += 100;
        }
        output += '</tbody>';
        
        //printing the schedule table
        $('#Schedule').append(output);


        //emptying the selected courses table
        $("#Selection").empty();

        $('#Selection').append('\
                                    <tr>\
                                    <td></td>\
                                    <td>clash</td>\
                                    <td></td>\
                                    <td></td>\
                                    <td style="background-color:#FF5555;">\
                                    </tr>\
                            '
                            );

        //displaying the selected sections into the schedule table and the selected section table
            for( crn in CRNs){
                
                var color = colors[0];
                
                colors.splice(0,1);
                
                    $('#Selection').append('\
                                        <tr>\
                                        <td>'+crn+'</td>\
                                        <td>'+CRNs[crn][0]["SEC_SHORT_TITLE"]+'</td>\
                                        <td>'+CRNs[crn][0]["SEC_SECTION"]+'</td>\
                                        <td>'+CRNs[crn][0]["SEC_TUTOR"]+'</td>\
                                        <td style="background-color:'+color+';">\
                                        </tr>\
                                '
                                );
                
                for(info of CRNs[crn]){      

                    if(info["SEC_HOURS_PER_WK"] != 1){
                        
                        for(i = 1; i <= info["SEC_HOURS_PER_WK"]; i++ ){
                            
                            //getting the class time
                            var time = parseInt(info["SEC_START_TIME"]) +  ((i-1)*100);
                            
                            var cell = '#'+info["SEC_WK_DAYS"].trim()+'.'+time;
                            
                            if($(cell).html() == ""){
                                if(i ==1){
                                    
                                    //appending the data to the cell
                                    $(cell).append('\
                                            <p>\
                                            <b>'+info["SEC_SHORT_TITLE"]+'</b>\
                                            </p>'
                                            );

                                    $(cell).css("background-color",color);
                                //cell for the hours after hour 1   
                                }else{
                                    $(cell).append('\
                                            <p style="visibility: hidden;">\
                                            <b>'+info["SEC_SHORT_TITLE"]+'</b>\
                                            </p>'
                                            );
                                    $(cell).css("background-color",color);

                                }
                            //if the cell is not empty   
                            }else{
                                $(cell).css("visibility", "visible")
                                cnt = $(cell).text();
                                $(cell).empty();

                                $(cell).append('\
                                    <p><b>clash between</b></p>\
                                    <p><b> '+info["SEC_SHORT_TITLE"]+'</b>\
                                    </p>\
                                    and <br>'    
                                + cnt);
                                $(cell).css("background-color","#FF5555");
                                $(cell).css("color","white");

                                clash = true;

                            }
                                
                            
                        }
                    }

                    //the class is only one hour long
                    else{
                        var cell = '#'+info["SEC_WK_DAYS"].trim()+'.'+info["SEC_START_TIME"];
                        
                        //if the cell is empty
                        if($(cell).html() == ""){
                            $(cell).append('\
                                    <p><b>'+info["SEC_SHORT_TITLE"]+'</b>\
                                    </p>'
                        
                        
                                );
                                $(cell).css("background-color",color);
                        //if the cell is not empty       
                        }else{
                            
                            cnt = $(cell).text();
                                $(cell).empty();
                                $(cell).append('\
                                    <p><b>clash between</b></p>\
                                    <p><b> '+info["SEC_SHORT_TITLE"]+'</b>\
                                    </p>\
                                    and <br>'    
                                + cnt);
                                $(cell).css("background-color","#FF5555");
                                $(cell).css("color","white");

                                clash = true;
                        }
                    }
            
                }

            }

           
                    

            //if there was a clash
            if(clash == true){
                document.getElementById("clashTxt").style.visibility = "visible";
                document.getElementById("exportSchedule").style.visibility = "hidden";
            }else{
                document.getElementById("exportSchedule").style.visibility = "visible";
                document.getElementById("clashTxt").style.visibility = "hidden";
            }

            $('#myModal').modal('show');
            

        }
    });

}

}





