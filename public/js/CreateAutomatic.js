
var i = 0;

var availableCombinations = [];

var combinations = [];

var clash = false;

var selectedSchedule = "";


function loadCourses() {
    //getting the passed in crns from the previous page
    var sessionString = sessionStorage.getItem('Courses');
    selectedCourses = JSON.parse(sessionString);
    console.log(selectedCourses);
}





$(document).ready(function() {
    //getting passed in course names from the previous page
    loadCourses();

    $.ajax({
        url: 'getsectionsAutomatic',
        type: "GET",
        data: "selectedCourses=" + selectedCourses,
        dataType: "json",
        success: function(result) {
            courses = result;
            console.log(courses);
            //console.log(courses[Object.keys(courses)[0]]);

            var coursesSize = Object.keys(courses).length;

            console.log(coursesSize);





            firstCourse =  courses[Object.keys(courses)[0]]

            //console.log(Firstsection[0]["SEC_CRN"]);
            
            //mahari idea
            // for(i = 0; i < coursesSize; i++){
            //     if(courses[Object.keys(courses)[i]] != null ){}
            // }

            
            for(i = 0; i < firstCourse.length; i++){


            

                //good for the first course
                //console.log("computer System: " + firstCourse[i]["SEC_CRN"]);

                //first course;
                firstCourse[i]["SEC_CRN"];

                //if you have more than one selected course
                if(courses[Object.keys(courses)[1]] != null ){
                    for(x = 0; x < courses[Object.keys(courses)[1]].length; x++){

                        //second course                      
                        courses[Object.keys(courses)[1]][x]["SEC_CRN"];

                        //if you have 3 or more selected courses
                        if(courses[Object.keys(courses)[2]] != null ){

                            for(z = 0; z < courses[Object.keys(courses)[2]].length; z++){

                                // //third  Course
                                // courses[Object.keys(courses)[2]][z]["SEC_CRN"];

                                //if you have  4 courses or more
                                if(courses[Object.keys(courses)[3]] != null ){

                                    for(y = 0; y < courses[Object.keys(courses)[3]].length; y++){

                                        courses[Object.keys(courses)[3]][y]["SEC_CRN"];

                                        //if you have 5 courses or more
                                        if(courses[Object.keys(courses)[4]] != null ){
                                            for(q = 0; q < courses[Object.keys(courses)[4]].length; q++){
                                                courses[Object.keys(courses)[4]][q]["SEC_CRN"];

                                                combinations.push(firstCourse[i]["SEC_CRN"]+","+courses[Object.keys(courses)[1]][x]["SEC_CRN"]+","+courses[Object.keys(courses)[2]][z]["SEC_CRN"]+","+courses[Object.keys(courses)[3]][y]["SEC_CRN"]+","+courses[Object.keys(courses)[4]][q]["SEC_CRN"]);
                                            }

                                        }
                                        else{
                                            combinations.push(firstCourse[i]["SEC_CRN"]+","+courses[Object.keys(courses)[1]][x]["SEC_CRN"]+","+courses[Object.keys(courses)[2]][z]["SEC_CRN"]+","+courses[Object.keys(courses)[3]][y]["SEC_CRN"]);
                                        }

                                    }

                                }
                                //if you only have 3 courses
                                else{
                                    combinations.push(firstCourse[i]["SEC_CRN"]+","+courses[Object.keys(courses)[1]][x]["SEC_CRN"]+","+courses[Object.keys(courses)[2]][z]["SEC_CRN"]);
                                }

                            }
                            

                        }
                        // 2 courses are selected
                        else{
                            combinations.push(firstCourse[i]["SEC_CRN"]+","+courses[Object.keys(courses)[1]][x]["SEC_CRN"]);
                        }



                    }


                }//only 1 course is selected
                else{
                    combinations.push(firstCourse[i]["SEC_CRN"]);
                }

             

            }

        m = 0;

        //inside success from the first ajax
        for(combo in combinations){

            var choosenCRN = "";
            //console.log(combinations[i]);
            var clash = false;

            choosenCRN = combinations[m];
            

            $.ajax({
                url: 'getChoosenSection',
                type: "GET",
                data: "choosenCRN=" + choosenCRN,
                dataType: "json",
                async: false,
                success: function(result) {
                    
                         var CRNs = result;

                        //console.log(CRNs);

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

                    for( crn in CRNs){

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
        
                                            
                                        //cell for the hours after hour 1   
                                        }else{
                                            $(cell).append('\
                                                    <p style="visibility: hidden;">\
                                                    <b>'+info["SEC_SHORT_TITLE"]+'</b>\
                                                    </p>'
                                                    );
                                            
        
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

        
                                        clash = true;
                                }
                            }
                    
                        }
                        

                    
                    //end of is below for( crn in CRNs)    
                    }

                if(clash == false){
                    //pushing the crns to the available combinations array
                    availableCombinations.push(combinations[m]);                 
                }





                //end of second success ajax 
                }
            //end of second  ajax 
            });
        
           //adding 1 to the index variable to go to the next instance 
           m++;

        }

        
        console.log(availableCombinations);

        b = 0;
            if(availableCombinations.length > 0){
                        
                //after getting the avaialble combos a table with the available combos will be displayed to the user
                for(availCombo in availableCombinations){
                    $("#availableSchedulues").append(
                    '<tr>\
                    <td>'+(b+1)+'</td>\
                    <td>'+(availableCombinations[b])+'</td>\
                    <td><button type="button" value="'+availableCombinations[b]+'" onclick=(viewSchedule(this)) class="btn btn-primary">View Schedule</button></td>\
                    </tr>'
                    );
                    b++;
                }

            }

            if(availableCombinations.length > 0){
                $('#spinner').css("visibility","hidden");
                $('#schedulesDiv').css("visibility","visible");
            }else{
                $('#nocombotxt').css("visibility","visible");
            }



        }

        
    //end of ajax      
    });
 


    
    
   //end of document is ready 
});


//when a user clicks on the view schedule method
function viewSchedule(event){
    choosenCRN = "";
    choosenCRN = event.value.split(",");
    
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


        //displaying the selected sections into the schedule table and the selected section table
            for( crn in CRNs){
                
                var color = colors[0];
                
                colors.splice(0,1);

                remainingSeats = CRNs[crn][0]["SEC_MAX_EMROLLMENT"] - CRNs[crn][0]["SEC_ENROLLED_STUDENTS"];

                    $('#Selection').append('\
                                        <tr>\
                                        <td>'+crn+'</td>\
                                        <td>'+CRNs[crn][0]["SEC_SHORT_TITLE"]+'</td>\
                                        <td>'+CRNs[crn][0]["SEC_SECTION"]+'</td>\
                                        <td>'+CRNs[crn][0]["SEC_TUTOR"]+'</td>\
                                        <td>'+CRNs[crn][0]["SEC_MAX_EMROLLMENT"]+'</td>\
                                        <td>'+CRNs[crn][0]["SEC_ENROLLED_STUDENTS"]+'</td>\
                                        <td>'+remainingSeats+'</td>\
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
                document.getElementById("Schedule").style.visibility = "visible";
            }

            $('#myModal').modal('show');
            

        }
    });



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