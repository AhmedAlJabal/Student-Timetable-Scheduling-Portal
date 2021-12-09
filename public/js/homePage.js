



$(document).ready(function(){
    
    $.ajax({
        url: "getUserSchedules",
        type: "GET",
        data:"",
        dataType: "json",
        success: function(result) {
            
            schedules = result;
            

            i = 1;
            x = 0;
            for(schedule in schedules){
                
                $('#schedulebody').append(
                    '<tr>\
                        <td>'+i+'</td>\
                        <td>'+schedules[x]["uniqueid"]+'</td>\
                        <td>'+schedules[x]["name"]+'</td>\
                        <td>'+schedules[x]["created_at"].substring(0,10)+'</td>\
                        <td><button type="button" onclick="viewSchedule(this)" class="btn btn-outline-primary btn-sm" value="'+schedules[x]["uniqueid"]+'">View</button></td>\
                        <td><button type="button" onclick="DeleteCourse(this)" class="btn btn-outline-danger btn-sm" value="'+schedules[x]["uniqueid"]+'">Delete</button></td>\
                    </tr>'
                );
                x++;
                i++;
            }
            

        }
    });


});


function viewSchedule(event){
    var selectedSchedule = event.value;
    console.log(selectedSchedule);

    sessionStorage.setItem('selectedSchedule', JSON.stringify(selectedSchedule));
    window.location.href='viewSchedule';


}

function DeleteCourse(event){

    var selectedSchedule = event.value;
    console.log(selectedSchedule);

    var warning = confirm("are you sure you want to delete the following schedule: "+selectedSchedule);
    if(warning == true){
        console.log(warning);
        
        $.ajax({
            url: "deleteScedule",
            type: "GET",
            data:"selectedSchedule="+selectedSchedule,
            dataType: "json",
            success: function(result){
                console.log(result);
                location.reload(); 
            }
        });

    }else{
        console.log(warning);
        console.log("not deleting")
    }

}