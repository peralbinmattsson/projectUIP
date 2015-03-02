function print (arg) {console.log(arg);}

function authentification(login, pass, ref) {
  var admins = ["ervtod", "hirchr", "jorass", "saskru", "svetor"];
  $.post('http://pub.jamaica-inn.net/fpdb/api.php?username=' + login + '&password=' + pass + '&action=iou_get', function(data) {
    if(data.type != "error"){
      //TO DO: get id
        localStorage.setItem("user", login);
        localStorage.setItem("user_id", data.payload[0].user_id);
        localStorage.setItem("assets", data.payload[0].assets);
        localStorage["isLoggedIn"] =  true;
      
        if ($.inArray(login, admins) > -1) {
          localStorage.setItem("isAdmin", true);
        } else{
          localStorage.setItem("isAdmin", false);
        };
        window.location.href=ref; 
    }
    else {
      alert('Error: ' + data.payload[0].msg);
    };
  });
};

$(document).ready(function(){
  localStorage.setItem("isLoggedIn", false);

  $("#login-btn").on('click', function(){
      var username = $("#username-input").val();
      var password = $("#password-input").val();
      // Checking for blank fields.
      if( username =='' || password ==''){
        alert("Please fill all fields...!!!!!!");
      }else {
        authentification(username, password, 'index2.html');
      };
  });
});
