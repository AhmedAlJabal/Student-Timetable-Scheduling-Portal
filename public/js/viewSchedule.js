
selectedSchedule = "";
let CRNs = [];


function loadScheduleSessions() {
    //getting the passed in crns from the previous page
    var sessionString = sessionStorage.getItem('selectedSchedule');
    selectedSchedule = JSON.parse(sessionString);
    console.log(selectedSchedule);
}

$(document).ready(function(){
    loadScheduleSessions();

    $.ajax({
        url: 'getScheduleSections',
        type: "GET",
        data: "selectedSchedule=" + selectedSchedule,
        dataType: "json",
        success: function(result) {
            console.log(result);
            console.log("below result")
            choosenCRN = [];
            
            
            for(i =0; i <result.length; i++){

                choosenCRN.push(result[i]["crn"]);
                
            }
            
            //code is perfect here
            console.log(choosenCRN);

            

            $.ajax({
                url: 'getChoosenSection',
                type: "GET",
                data: "choosenCRN=" + choosenCRN.join(),
                dataType: "json",
                success: function(result){

                    //console.log(result);
        
        
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
        
                //clashes can't happen here

                // $('#Selection').append('\
                //                             <tr>\
                //                             <td></td>\
                //                             <td>clash</td>\
                //                             <td></td>\
                //                             <td></td>\
                //                             <td style="background-color:#FF5555;">\
                //                             </tr>\
                //                     '
                //                     );
        
                var previousCRN = "";

                //displaying the selected sections into the schedule table and the selected section table
                    for( crn in CRNs){
                        
                        var color = colors[0];

                        

                        colors.splice(0,1);

                        for(info of CRNs[crn]){
                            if(previousCRN == crn){
                                $('#Selection').append('\
                                                    <tr>\
                                                    <td></td>\
                                                    <td></td>\
                                                    <td></td>\
                                                    <td></td>\
                                                    <td>'+CRNs[crn][0]["SEC_BUILDING"]+'</td>\
                                                    <td>'+CRNs[crn][0]["SEC_ROOM"]+'</td>\
                                                    <td style="background-color:'+color+';">\
                                                    </tr>\
                                            '
                                            );

                            }else{
                                $('#Selection').append('\
                                                    <tr>\
                                                    <td>'+crn+'</td>\
                                                    <td>'+CRNs[crn][0]["SEC_SHORT_TITLE"]+'</td>\
                                                    <td>'+CRNs[crn][0]["SEC_SECTION"]+'</td>\
                                                    <td>'+CRNs[crn][0]["SEC_TUTOR"]+'</td>\
                                                    <td>'+CRNs[crn][0]["SEC_BUILDING"]+'</td>\
                                                    <td>'+CRNs[crn][0]["SEC_ROOM"]+'</td>\
                                                    <td style="background-color:'+color+';">\
                                                    </tr>\
                                            '
                                            );
                            }
                            previousCRN = crn;
                        }
                        
                            
                        
                        
                        
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
                                                    <b>'+info["SEC_SHORT_TITLE"]+'</b><br><br>\
                                                    '+CRNs[crn][0]["SEC_BUILDING"]+'\
                                                    '+CRNs[crn][0]["SEC_ROOM"]+'\
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
        
                                        
        
                                    }
                                        
                                    
                                }
                            }
        
                            //the class is only one hour long
                            else{
                                var cell = '#'+info["SEC_WK_DAYS"].trim()+'.'+info["SEC_START_TIME"];
                                
                                //if the cell is empty
                                if($(cell).html() == ""){
                                    $(cell).append('\
                                            <p><b>'+info["SEC_SHORT_TITLE"]+'</b><br><br>\
                                            '+CRNs[crn][0]["SEC_BUILDING"]+'\
                                            '+CRNs[crn][0]["SEC_ROOM"]+'\
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
        
                                        
                                }
                            }
                    
                        }
        
                    }
        

        

                    
        
                }
            });




        }
    });

});





window.html2canvas = html2canvas;
// window.jsPDF = window.jspdf.jsPDF;

function exportPDF(){

    document.getElementById('infoDiv').style.boxShadow = "none";
    document.getElementById('scheduleDiv').style.boxShadow = "none";


    html2canvas(document.querySelector("#pic"),{
        useCORS: true,
    }).then(canvas =>{
        

        
        var imdData = canvas.toDataURL('image/png');

        var doc = new jsPDF(); 

        var imgHeight = canvas.height * 208 / canvas.width;

        doc.addImage(imdData, 0, 20, 208, imgHeight);

            doc.save("schedule.pdf");

        
    });


    document.getElementById('scheduleDiv').style.boxShadow = "0 .5rem 1rem rgba(0,0,0,.15)";
    document.getElementById('infoDiv').style.boxShadow = "0 .5rem 1rem rgba(0,0,0,.15)";

    
}


function setNotifications(){
    // $.ajax({
    //     url: 'createics',
    //     type: "GET",
    //     data: "choosenCRN=" + choosenCRN.join(),
    //     success: function(result) {
    //         console.log(result);
    //         var blob=new Blob([result]);
    //         console.log(blob);
            
    //         var link=document.createElement('a');
    //         link.href=window.URL.createObjectURL(blob);
    //         link.download="Schedule.ics";
    //         link.click();
    
    //     } 
    // });


    $.ajax({
        url: 'setNotifications',
        type: "GET",
        data: "choosenCRN=" + choosenCRN.join(),
        success: function(result){
            console.log("sucess");
            alert("an email has been sent to your email address");
        }
    }); 

}