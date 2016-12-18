//global variables
var outputText = '';
var tasks = [];


$(document).ready(function(){
  getTask();
  // $(document).on('click', '.deleteButton', deleteTask);


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
        if(response[i].completed === false){
          outputText += '<p><li>' + response[i].task + '<button class="complete" data="' + response[i].id + '">task complete</button><button class="delete" data="' + response[i].id + '">delete task</button></li></p>';
        } else {
          outputText += '<p><li><strike>' + response[i].task + '</strike><button class="delete" data="' + response[i].id + '">delete task</button></li></p>';
        }
      }//end for loop
      $('#appendToDom').append(outputText);

    } //end success function
  });//end ajax call
}//end getTask function

//update task completed status
$('#appendToDom').on('click', '.complete', function(){
  location.reload();
  var allDone = $(this).attr('data');
  var objectToSend = {
      id: allDone
    };
    $.ajax({
      url: '/taskCompleted',
      type: 'PUT',
      data: objectToSend,
      success: function (data){

      }//end success function
    });//end ajax call
  });//end task complete onclick


});//end doc ready
