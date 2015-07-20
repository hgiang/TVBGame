// Questionlist data array for filling in info box
var questionListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the question table on initial page load
    populateTable();

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/questionlist', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.question + '</td>';
            tableContent += '<td>' + this.answer + '</td>';
            tableContent += '<td>' + this['choices[]'] + '</td>';
            tableContent += '<td><a href="#" class="linkdeletequestion btn btn-danger" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#questionList table tbody').html(tableContent);
    });
};

// Add Question button click
$('#btnAddQuestion').on('click', addQuestion);

// Add Question
function addQuestion(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addQuestion input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all question info into one object
        var choices = []
        $('#addQuestion fieldset .inputChoices').each(function()
        {   if($(this).val())
            {
                choices.push($(this).val())
            }
        })

        if(choices.length > 0)
        {
            var newQuestion = {
                'question': $('#addQuestion fieldset input#inputQuestion').val(),
                'answer': $('#addQuestion fieldset input#inputAnswer').val(),
                'type': 'choices',
                'choices': JSON.parse(JSON.stringify(choices)), 
                //'rnd': Math.random(),
            }
        }

        else
        {
            var newQuestion = {
                'question': $('#addQuestion fieldset input#inputQuestion').val(),
                'answer': $('#addQuestion fieldset input#inputAnswer').val(),
                'type': 'text',
                'choices': JSON.parse(JSON.stringify(choices)), 
                //'rnd': Math.random(),
            }
        }

        // Use AJAX to post the object to our addquestion service
        $.ajax({
            type: 'POST',
            data: newQuestion,
            url: '/questionlist/addquestion',
            //dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addQuestion fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Delete Question link click
$('#questionList table tbody').on('click', 'td a.linkdeletequestion', deleteQuestion);

// Delete Question
function deleteQuestion(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this question?');

    // Check and make sure the question confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/questionlist/deletequestion/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }
};

// Delete Question link click
$('#btnAddChoice').on('click', addChoice);
// Add Question
function addChoice(event) {
    event.preventDefault();
    var row = $('.dynamic-form:first').clone(true).get(0);
    $(row).removeAttr('id').insertAfter($('.dynamic-form:last')).children('.hidden').removeClass('hidden');

    $(row).children().children().each(function(index) {
        $(this).val('');
    });
};

// Delete Question link click
$('#btnRemoveChoice').on('click', removeChoice);
// Add Question
function removeChoice(event) {
    event.preventDefault();
    var rowCount = $('#choices tr').length;
    if(rowCount > 1)
    {
        var row = $('.dynamic-form:last').remove();
    }
};


