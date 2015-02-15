$(document).ready(function() {
    var $beer = $('#stock_container');
    var $user = $('#user_container');

 var stockItem =
	"<li id='item' class='listItem' name='{{namn}}'><span>{{namn}} </span>"+
	"<span>{{namn2}} </span>" + "<span>{{count}}</span>" +
        "<button class='button' data-id='{{beer_id}}' name='{{namn}}' name2='{{namn2}}'" +
	" id='add'>Edit</button>" +
        "</li>";

    function addStockItem(beer) {
	if (beer.namn != "") {
            $beer.append(Mustache.render(stockItem, beer));
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
                addStockItem(beer);
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
// function to hide and show user and stock on a click
    $user.hide();
    $("#stock_btn").on("click", function () {
        $beer.show();
        $user.hide();
    });
    $("#user_btn").on("click", function () {
        $user.show();
        $beer.hide();
    });
    
//function to perform a search
    function partOf(value, name) {
        index = 1;
        valueLow = value.toLowerCase();
        nameLow = name.toLowerCase();
        if (nameLow.search(valueLow) == -1) {
            return false;
        }
        return true;
    }
    $('.search').keypress(function(e) {
        value = $(this).val();
        $('li').each(function() {
        name = $(this).attr('name');
        if (value == "" || name == "undefined" || partOf(value, name)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});
});
