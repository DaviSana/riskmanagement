function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {
    function showQuestions(questions, quizContainer) {
        var output = [];
        var answers;
        // for each question...
        for (var i = 0; i < questions.length; i++) {

            // first reset the list of answers
            answers = [];

            // true false
            if (questions[i].type == 'tf') {
                // ...add an html radio button
                answers.push(
                    '<label>' +
                    '<input type="radio" name="question' +
                    i +
                    '" value="' +
                    't' +
                    '">' +
                    'True' +
                    '</label>'
                );
                answers.push(
                    '<label>' +
                    '<input type="radio" name="question' +
                    i +
                    '" value="' +
                    'f' +
                    '">' +
                    'False' +
                    '</label>'
                );

                // add this question and its answers to the output
                output.push(
                    '<div class="question">' + "True or False: " + questions[i].question + '</div>' +
                    '<div class="answers">' + answers.join('') + '</div>'
                );
            }
            // multiple choice
            else if (questions[i].type == 'mc') {
                // for each available answer to this question...
                for (var letter in questions[i].answers) {

                    // ...add an html radio button
                    answers.push(
                        '<label>' +
                        '<input type="radio" name="question' +
                        i +
                        '" value="' +
                        letter +
                        '">' +
                        letter +
                        ': ' +
                        questions[i].answers[letter] +
                        '</label>' + '<br>'
                    );
                }

                // add this question and its answers to the output
                output.push(
                    '<div class="question">' + questions[i].question + '</div>' +
                    '<div class="answers">' + answers.join('') + '</div>'
                );
            }
            // Exclusion for certificate
            else if (questions[i].type == 'certificate') {
                certPos = i;
                output.push('<div class="question">' + questions[i].question + '</div>' +
                            '<div class="answers">' + answers.join('') + '</div>');

            }



        }

        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }
    // Saves the number correct for the cookie function
    var percentageCookie = 0;
    // show the questions
    showQuestions(questions, quizContainer);
    function showResults(questions, quizContainer, resultsContainer) {

        // gather answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;
        // for each question...
        for (var i = 0; i < questions.length; i++) {

            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

            // if answer is correct
            if (userAnswer === questions[i].correctAnswer) {
                // add to the number of correct answers
                numCorrect++;
                percentageCookie++;
                // color the answers green
                answerContainers[i].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else {
                // color the answers red
                answerContainers[i].style.color = 'red';
            }
        }

        // Calculates percentage correct
        percentageCookie = Math.floor((numCorrect / questions.length) * 100);
        // show number of correct answers out of total (replaced with percentage)
        resultsContainer.innerHTML = percentageCookie + '%';
    }
    // Cookie read val
    var cookieRead;
    // when user clicks submit, show results
    submitButton.onclick = function() {
        showResults(questions, quizContainer, resultsContainer);
        // Creates cookie
        // Cookie should be active for 1 h 55 m
        createCookie(quizContainer, percentageCookie, .08);
        // Searches for cookie
        cookieRead = readCookie(quizContainer);
        // Retrieves cookie
        readCookiePrint.innerHTML = cookieRead;
        // Resets num value
        percentageCookie = 0;
    }
}
// Prints cookieRead
var readCookiePrint = document.getElementById('readPrint');
//
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
// Debugging use only
// var cookiePrint = document.getElementById('print');
//
function show_selected(value) {
        if (typeof value == 'undefined'){
        console.log("Invalid quiz")
        quizContainer.innerHTML = "Invalid quiz option!"
        resultsContainer.innerHTML = ""
        document.getElementById("submit").classList.add('show');
    }
    else {
        generateQuiz(value, quizContainer, resultsContainer, submitButton);
        document.getElementById("submit").classList.remove('show');
    }
}

function get_selected() {

    var selector = document.getElementById('quizselect');
    // var value = selector[selector.selectedIndex].value;
    var value = selector[selector.selectedIndex].value;
    var value = window[value];
    show_selected(value);
}

// Creates cookies
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
    // Debugging use only
    //cookiePrint.innerHTML = 'Print for Cookies!';
}
/* Debug Use Only
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
*/
document.getElementById('selectbtn').addEventListener('click', get_selected);