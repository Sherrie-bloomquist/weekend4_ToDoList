//global variables
var outputText = '';
var tasks = [];


$(document).ready(function(){
  $('appendToDom').append(tasks.length);
  getTask();

  $('#addTask').on('click', function(){
    postTask();
    $('input[type="text"]').val('');


  });//end addTask onclick


  var postTask = function(){
    console.log('in postTask');
    //assemble object to send
    var newTask = {
      task: $('#inputTask').val()
    }; //end newTask
    console.log(newTask);
    $.ajax({
      type: 'POST',
      url: '/postTask',
      data: newTask,
      success: function(response){
        console.log('back from postTask:', response);
         $('#appendToDom').append(outputText);
      }//end success function
    });//end ajax call for newTask
  }; //end postTask function

function getTask (){
  $.ajax({
    type: 'GET',
    url: '/getTask',
    success: function(response){
      console.log('back from get call:', response);
      for (var i = 0; i < response.length; i++) {
        tasks.push(response[i]);
      }//end for loop
      displayTasks();
    } //end success function
  });//end ajax call
}//end getTask function

function displayTasks (){
  for (var i = 0; i < tasks.length; i++) {
    outputText += '<p><li>' + tasks[i].task + '<button class="complete">task complete</button><button class="delete">delete task</button></li></p>';
  }
$('#appendToDom').append(outputText);
} //end displayTasks


});//end doc ready
