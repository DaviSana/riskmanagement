// Creates the quiz selection in index.html
var numQuestions = 5;
var outputselect =[];
//var selects = [];
//for (var d = 1; d < numQuestions + 1; d++) {
    //selects.push('<option value="q' + d + '">' + d + '</option>');
//}
var selects = ['<option value="q1">1</option>', '<option value="q2">2</option>', '<option value="q3">3</option>', '<option value="q4">4</option>', '<option value="q5">5</option>','<option value = "certificate">Answers</option>']; 
outputselect.push('<select id="quizselect">' + '<option value="" disabled selected>Please select a quiz...</option>' + selects.join('') + '</select>' + '<button id="selectbtn">Select</button>' + '<br><br>');
var selectContainer = document.getElementById('selectContainer');
selectContainer.innerHTML = outputselect.join('');
