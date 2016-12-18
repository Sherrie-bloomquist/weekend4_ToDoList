//global variables
var outputText = '';
var tasks = [];


$(document).ready(function(){
  $('appendToDom').append(tasks.length);
  getTask();


  //addTask button click
  $('#addTask').on('click', function(){
    postTask();
    $('input[type="text"]').val('');
    location.reload();
  });//end addTask onclick



  //delete task button


  var postTask = function(){
    console.log('in postTask');
    //assemble object to send
    var newTask = {
      task: $('#inputTask').val(),
      completed: false
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
    outputText += '<p><li>' + tasks[i].task + '<button class="complete" data=' + i + '>task complete</button><button class="delete" data=' + i + '>delete task</button></li></p>';
    //task complete button
  }
  $('#appendToDom').append(outputText);
  $('.complete').on('click', function(){
    console.log('complete task button clicked');
    // $("#strikeThru").strike(tasks[i].task);
    $('.complete').hide(i);
  }); //end task complete button

} //end displayTasks



});//end doc ready
