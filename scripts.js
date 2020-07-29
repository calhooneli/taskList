// load datatables
//$(document).ready( function () {
//    $('#table').DataTable({
//      paging: false
//    });
//} );

$(document).ready(function() {
    var table = $('#table').removeAttr('width').DataTable( {
        paging:         false,
        "columnDefs": [
          { "width": "30%", "targets": 4 }
        ],
    } );
} );


// create table from localStorage
var string = localStorage.getItem('taskList')
var list = JSON.parse(string)

function constructTable(selector) {
    // Getting the all column names
    var cols = Headers(list, selector);

    // Traversing the JSON data
    for (var i = 0; i < list.length; i++) {
        var row = $('<tr></tr>');
        for (var colIndex = 0; colIndex < cols.length; colIndex++)
        {
            var val = list[i][cols[colIndex]];

            // If there is any key, which is matching
            // with the column name
            if (val == null) val = "";
  //              row.append($('<td/>').html(val));
                row.append('<td>' + val + '</td>');

        }

        // Adding each row to the table
        $(selector).append(row);

    }
}
function Headers(list, selector) {
    var columns = [];
    var header = $('<tr/>');

    for (var i = 0; i < list.length; i++) {
        var row = list[i];

        for (var k in row) {
            if ($.inArray(k, columns) == -1) {
                columns.push(k);

                // Creating the header
                header.append($('<th/>').html(k));
            }
        }
    }

    // Appending the header to the table
//    $(selector).append(header);
        return columns;
}


function deleteRow(btndel) {
    if (typeof(btndel) == "object") {
        $(btndel).closest("tr").remove();
    } else {
        return false;
    }
}




// delete rows
$(document).ready(function() {
    var table = $('#table').DataTable();

    $('#table tbody').on( 'click', '#delete', function () {
      $(this).closest('tr').remove();
      // autosave data after editing
        stringy()
    } );
} );





// edit cell
$(document).ready(function() {
    var table = $('#table').DataTable();

    $('#table tbody').on( 'dblclick', 'td', function () {

        // If it is the type field, build type selector
        if ($(this)[0].cellIndex === 1) {

          // create select
          var e = document.createElement('select')
          e.className = 'inputItem'
          e.id = 'editInput'

          // add options to select
          var opt1 = document.createElement('option');
          var opt2 = document.createElement('option');
          opt1.text = 'Do';
          opt2.text = 'Follow up';
          e.add(opt1);
          e.add(opt2);

          // set input field up to save to cell on click-away(blur) or key Enter
          e.addEventListener("keypress", function(e){
          if (e.key === 'Enter') {
          $(this).closest('td')[0].innerHTML = $(this)[0].value
          // autosave data after editing
            stringy()
          }
          });
          e.addEventListener("blur", function(){
          $(this).closest('td')[0].innerHTML = $(this)[0].value
          // autosave data after editing
            stringy()
          });

          // populate input field with cell value.
          e.value = $(this)[0].innerHTML
          // Clear cell so it does not also appear.
          $(this)[0].innerHTML = ''
          // add input field to cell
          $(this)[0].appendChild(e);
          // move cursor to input field
          $('#editInput').focus();

          // If it is the priority field, build priority selector
        } else if ($(this)[0].cellIndex === 3) {

          // create select
          var e = document.createElement('select')
          e.className = 'inputItem'
          e.id = 'editInput'

          // add options to select
          var opt1 = document.createElement('option');
          var opt2 = document.createElement('option');
          var opt3 = document.createElement('option');
          opt1.text = 'Low';
          opt2.text = 'Medium';
          opt3.text = 'High';
          e.add(opt1);
          e.add(opt2);
          e.add(opt3);

          // set input field up to save to cell on click-away(blur) or key Enter
          e.addEventListener("keypress", function(e){
          if (e.key === 'Enter') {
          $(this).closest('td')[0].innerHTML = $(this)[0].value
          // autosave data after editing
            stringy()
          }
          });
          e.addEventListener("blur", function(){
          $(this).closest('td')[0].innerHTML = $(this)[0].value
          // autosave data after editing
            stringy()
          });

          // populate input field with cell value.
          e.value = $(this)[0].innerHTML
          // Clear cell so it does not also appear.
          $(this)[0].innerHTML = ''
          // add input field to cell
          $(this)[0].appendChild(e);
          // move cursor to input field
          $('#editInput').focus();

          // any other field, create an input
        } else {
        // create input
        var e = document.createElement('input')
        e.className = 'inputItem'
        e.id = 'editInput'

        // Make the input a date picker if Do Date field
        if ($(this)[0].cellIndex === 2) {
          e.type = 'date'
        }

        // set input field up to save to cell on click-away(blur) or key Enter
        e.addEventListener("keypress", function(e){
        if (e.key === 'Enter') {
        $(this).closest('td')[0].innerHTML = $(this)[0].value
        // autosave data after editing
          stringy()
        }
        });
        e.addEventListener("blur", function(){
        $(this).closest('td')[0].innerHTML = $(this)[0].value
        // autosave data after editing
          stringy()
        });

        // populate input field with cell value.
        e.value = $(this)[0].innerHTML
        // Clear cell so it does not also appear.
        $(this)[0].innerHTML = ''
        // add input field to cell
        $(this)[0].appendChild(e);
        // move cursor to input field
        $('#editInput').focus();
  }   } );
} );





// this function adds a row to the html table
function add() {
  var tableRef = document.getElementById('table');

  // Insert a row in the table at row index 0
  var newRow   = tableRef.insertRow(tableRef.rows.length);

  // Insert a cell in the row at index 0
  var cell0 = newRow.insertCell(0);
  var cell1 = newRow.insertCell(1);
  var cell2 = newRow.insertCell(2);
  var cell3 = newRow.insertCell(3);
  var cell4 = newRow.insertCell(4);
  var cell5 = newRow.insertCell(5);

  // gather input values
  var taskInput = document.getElementById('task').value
  var statusInput = document.getElementById('status').value
  var doDateInput = document.getElementById('doDate').value
  var priorityInput = document.getElementById('priority').value
  var notesInput = document.getElementById('notes').value


  // Append a text node to the cell
  var cell0Text  = document.createTextNode(taskInput)
  cell0.appendChild(cell0Text);
  var cell1Text  = document.createTextNode(statusInput)
  cell1.appendChild(cell1Text);
  var cell2Text  = document.createTextNode(doDateInput)
  cell2.appendChild(cell2Text);
  var cell3Text  = document.createTextNode(priorityInput)
  cell3.appendChild(cell3Text);
  var cell4Text  = document.createTextNode(notesInput)
  cell4.appendChild(cell4Text);

  var b = document.createElement('button')
  b.className = 'button'
  b.id = 'delete'
  b.innerHTML = 'Complete'
  cell5.appendChild(b);

  $('#task').val('');
  $('#status').val('Do');
  $('#doDate').val('');
  $('#priority').val('Low');
  $('#notes').val('');

  // autosave data after adding the row
  stringy()

}



// this function converts the html table to json and stores it to localStorage
function stringy() {
  // loop through table rows and grab everything
  var myRows = [];
  var $headers = $("th");
  var $rows = $("tr").each(function(index) {
    $cells = $(this).find("td");
    myRows[index] = {};
    $cells.each(function(cellIndex) {
      myRows[index][$($headers[cellIndex]).html()] = $(this).html();
    });
  });
  myRows.shift()
  // creates object from the gathered data, converts to json, and stores
  var myObj = {};
  myObj = myRows;

  window.localStorage.setItem('taskList', JSON.stringify(myObj));

  // reload table so that filters work
  // $('#table').rows.invalidate().draw();

}
