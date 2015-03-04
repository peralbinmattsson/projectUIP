function logout () {
	localStorage.removeItem("user");
	localStorage.removeItem("assets");
	localStorage.removeItem("user_id");
	localStorage.removeItem("isAdmin");
	localStorage["isLoggedIn"] = false;
	window.location.href = "index.html";

}
$(document).ready(function() {
    
    if (localStorage["isLoggedIn"] != "true") {
	    window.location.href='index.html';
	    //console.log("WTF");
	    //console.log(localStorage["isLoggedIn"]);
		
	}
    else{
        $("#user_info").append("<div>Login as: " + localStorage.getItem("user") + "</div>");
    	$("#user_info").append("<div>Assets : " + localStorage.getItem("assets") + "</div>");

    };

    $('#left, #right').hover(function() {
        $(this).css('border-color', '#26C6B0');
    }, function() {
        $(this).css('border-color', 'black');
    });



});
