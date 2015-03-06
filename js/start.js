function logout () {
	localStorage.removeItem("user");
	localStorage.removeItem("assets");
	localStorage.removeItem("user_id");
    localStorage.removeItem("isAdmin");
	localStorage.removeItem("theme");
	localStorage["isLoggedIn"] = false;
	window.location.href = "index.html";

}
//function storeTheme() {
//    var theme = $('#mainStyle').attr("href");
//    if (theme == "start80s.css") {
//        localStorage.setItem("theme", "start80s.css");
//    } else {
//        localStorage.setItem("theme", "start.css");
//    }
//}
function setTheme() {
    var theme = localStorage.getItem("theme");
    if (theme != null) {
        $('#mainStyle').attr("href", "../css/" + theme);
    }
}

$(document).ready(function() {
    
    if (localStorage["isLoggedIn"] != "true") {
	    window.location.href='index.html';
	    //console.log("WTF");
	    //console.log(localStorage["isLoggedIn"]);
		
	}
    else{
        $("#user_info").append("<div class='profil' id='loginas' data-i18n='loginas'><b>Login as : </b>" + localStorage.getItem("user") + "</div>");
    	$("#user_info").append("<div class='profil' id='assets' data-i18n='assets'><b>Assets : </b>" + localStorage.getItem("assets") + "</div>");
    };

    $('#left, #right').hover(function() {
        $(this).css('border-color', '#26C6B0');
    }, function() {
        $(this).css('border-color', 'black');
    });

    setTheme();
    $('#changeTheme').on('click', function() {
        console.log(localStorage.getItem("theme"));
        var $link = $('#mainStyle');
        var theme = localStorage.getItem("theme");
        if (theme == "start80s.css") {
            $link.attr("href", "../css/start.css");
            localStorage.setItem("theme", "start.css");
        } else {
            $link.attr("href", "../css/start80s.css");
            localStorage.setItem("theme", "start80s.css");
        }
    });


});
