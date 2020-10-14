function emailAlert() {

  var today = new Date();

  // getting data from spreadsheet
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2; // First row of data to process
  var lastRow = SpreadsheetApp.getActiveSheet().getLastRow();
  var lastColun = SpreadsheetApp.getActiveSheet().getLastColumn();

  var dataRange = sheet.getRange(startRow, 1, lastRow, lastColun);
  var data = dataRange.getValues();

  var subject = 'Przeterminowane leki';
  var message =''  
  

  var html = 
'<h2>Przeterminowane leki</h2> '+
'<table>'+
    '<tr>'+
    '<th>Nazwa</th>'+
    '<th>Data</th>'+
    '<th>Gdzie</th>'+
    '<th>Inne</th>'+
  '</tr>';
  
  var sendNotifiction = false;
  
  for (var i = 0; i < data.length; ++i) 
  {
    var row = data[i];

    var expireDate = new Date(row[1]);
    var expireDateFormat = Utilities.formatDate(
      new Date(expireDate),
      'UTC',
      'MM/dd/yyyy'
    );
    
    if (expireDate <= today)
    {
      html += '<tr>' +
        '<td>'+row[0]+ '</td>' + 
        '<td>'+expireDateFormat+ '</td>' +
        '<td>'+ row[2] + '</td>' +
        '<td>' + row[3]+ '</td>' +
        '</tr>';
      sendNotifiction = true;
    }
  }
  
  html += '</table>';
  
  if (sendNotifiction)
  {
    MailApp.sendEmail({to:'szostki@gmail.com, szostakowska.joanna@gmail.com', subject:subject, htmlBody:html});
  }
}
