var selectedCourses = [];

var availableCredit = 0;

var currentCredit = 0;

$(document).ready(function() {
    $('#redi').on("change", function(event) {
        event.preventDefault()
        var item = $("#redi option:selected").text();
        console.log(item);

        $.ajaxSetup({
            header: {
                'X-CSRF-TOKEN': $("meta[name='csrf-token']").attr('content')
            }
        })


        $.ajax({
            url: 'getCourses',
            type: "GET",
            data: "major=" + item,
            dataType: "json",
            success: function(result) {
                console.log(result.courses);
                $('#courses').empty();
                $.each(result.courses, function(key, item) {
                    $('#courses').append(
                        '<tr>\
                            <td>'+item.SEC_COLLEGE+'</td>\
                            <td>'+item.SEC_SHORT_TITLE+'</td>\
                            <td>'+item.SEC_CREDIT_HOURS+'</td>\
                            <td><button class="btn btn-link" id="courseList" onclick=(addCourse(this)) value="'+item.SEC_SHORT_TITLE+','+item.SEC_CREDIT_HOURS+'">add</button></td>\
                        </tr>)');
                })
            }
        });

    })

})



function addCourse(event) {

    //will split the value and store it in an array first index (index 0) will contain the course name and second index (index1) will contain the credit value
    var courseArray = event.value.split(',');

    var selectcourse = courseArray[0];

    var selectcredit = courseArray[1];

    var exists = false;



    availableCredit = document.getElementById("availableCredit").innerHTML;
    
    currentCredit = document.getElementById('currentCredit').innerHTML;

    
    

    for(var i = 0; i < selectedCourses.length; i++){
        if(selectcourse == selectedCourses[i]){
            exists = true;
        }
    }

    if(exists == true){
        alert("course is already in the array");
    }else if(exists ==false){

        selectedCourses.push(selectcourse);

        currentCredit = parseInt(currentCredit) + parseInt(selectcredit);

        document.getElementById('currentCredit').innerHTML = currentCredit;

        //change the color of the credit text
        if(availableCredit < currentCredit){
            document.getElementById("creditHeader").style.color = "red";
        }else{
            document.getElementById("creditHeader").style.color = "blue";

        }

        // alert(selectedCourses.length);
        // alert(selectcourse);

        $('#selectedCourses').append(
        '<tr>\
            <td>'+selectcourse+'</td>\
            <td>'+selectcredit+'</td>\
            <td><button class="btn btn-link" id="courseList" style="color:red;" onclick=(removeCourse(this)) value="'+selectcourse+','+selectcredit+'">remove</button></td>\
        </tr>)');
    }
}


function removeCourse(event){
    var courseArray = event.value.split(',');

    var course = courseArray[0];
    var credit = courseArray[1];

    for(var i = 0; i < selectedCourses.length; i++){
        if(course == selectedCourses[i]){
            selectedCourses.splice(i,1);
            document.getElementById("selectedCourses").deleteRow(i);

            currentCredit = parseInt(currentCredit) - parseInt(credit);

            document.getElementById('currentCredit').innerHTML = currentCredit;

            //change the color of the credit text
            if(availableCredit < currentCredit){
                document.getElementById("creditHeader").style.color = "red";
            }else{
                document.getElementById("creditHeader").style.color = "blue";

            }
            
        }
    }
}



function goToManual(){
    if(selectedCourses.length == 0){
        alert("please add some courses before contuniuing");
    }
    else if(availableCredit < currentCredit){
        alert("you excedded your available credit");
    }
    else{
        sessionStorage.setItem('Courses', JSON.stringify(selectedCourses));
        window.location.href='createManual';
    }

}



function goToAutomatic(){
    if(selectedCourses.length == 0){
        alert("please add some courses before contuniuing");
    }
    else if(availableCredit < currentCredit){
        alert("you excedded your available credit");
    }
    else if(selectedCourses.length > 5){
        alert("automatic scheduling only allows for 5 courses");
    }
    else{
        sessionStorage.setItem('Courses', JSON.stringify(selectedCourses));
        window.location.href='createAutomatic';
    }

}