//global arrays
var task = [];


$(document).ready(function(){



  var postTask = function(){
    console.log('in postTask');
    //assemble object to send
    var newTask = $('#inputTask').val();
    var objectToSend = {
      task: newTask
    }; //end objectToSend
    console.log(objectToSend);
    $.ajax({
      type: 'POST',
      url: '/postTask',
      data: objectToSend,
      success: function(response){
        console.log('back from postTask:', response);
        // outputText += '<p>' + response.answer + '</p>';
        // $('#inputTask').append(outputText);
      }//end success function


    });//end ajax call for newTask



  }; //end postTask function


//Append to DOM



  //event handlers
  function enable(){
  $('#addTask').on('click', function(){
    postTask();
  });//end addTask onclick
}//end enable function


enable();

});//end doc ready
