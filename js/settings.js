$(document).ready(function() {
    var $beer = $('#stock_container');
    var $user = $('#user_container');

    function addSotckItem(beer) {
        if (beer.namn != "") {
            $beer.append("<li><span>" + 
                beer.namn + " " +
                beer.namn2 + " " +
                "</span><span>" +
                beer.count +
                 "</span>" +
                "<button id=\"add\">Edit</button>" +
                "</li>");
        }
    }

        function addUser(user) {
        if (user.namn != "") {
            $user.append("<li><span>" + 
                user.username +  
                "</span><span>" +
                user.first_name +
                "</span><span>" +
                user.last_name +
                "</span><span>" +
                user.assets +
                 "</span>" +
                "<button id=\"add\">Edit</button>" +
                "</li>");
        }
    }

    $.ajax({
        type: 'GET',
        url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get',
        success: function(object) {
            data = object['payload'];
            $.each(data, function(i, beer) {
                addSotckItem(beer);
            });
        }
    });
    $.ajax({
        type: 'GET',
        url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=iou_get_all',
        success: function(object) {
            data = object['payload'];
            $.each(data, function(i, user) {
                addUser(user);
            });
        }
    });
    $user.hide();
    $("#stock_btn").on("click", function () {
        $beer.show();
        $user.hide();
    });
    $("#user_btn").on("click", function () {
        $user.show();
        $beer.hide();
    });
});
