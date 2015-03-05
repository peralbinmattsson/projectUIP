$(document).ready(function () {
	if (localStorage["isAdmin"] != "true") {
		$("#right").hide();
	};
});