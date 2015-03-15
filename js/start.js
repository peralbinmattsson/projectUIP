function logout () {
	localStorage.removeItem("user");
	localStorage.removeItem("assets");
	localStorage.removeItem("user_id");
    localStorage.removeItem("isAdmin");
	localStorage.removeItem("theme");
	localStorage["isLoggedIn"] = false;
	window.location.href = "index.html";

}
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

    setTheme();
    $('#changeTheme').on('click', function() {
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

    $(window).bind('scroll', function() {
        if ($(window).scrollTop() < 20) {
            $('#user_info').css('opacity', '1');
        } else {
            $('#user_info').css('opacity', '0.5');
        }
    });
    $('#user_info').hover(function() {
        $('#user_info').css('opacity', '1');
    }, function() {
        if ($(window).scrollTop() >= 20) {
            $('#user_info').css('opacity', '0.5');
        }
    }); 
});
