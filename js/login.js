$(document).ready(function(){

  $("#login-btn").on('click keydown', function(){
      var username = $("#username-input").val();
      var password = $("#password-input").val();
      // Checking for blank fields.
      if( username =='' || password ==''){
        alert("Please fill all fields...!!!!!!");
      }else {
        authentification(username, password, 'index2.html');
      };
  });

  function authentification(login, pass, ref) {
    $.post('http://pub.jamaica-inn.net/fpdb/api.php?username=' + login + '&password=' + pass + '&action=iou_get', function(data) {
      if(data.type != "error"){
        //TO DO: get id
          document.location.href=ref; 
      }
      else {
        alert('Error: ' + data.payload[0].msg);
      };
    });
  };
});
