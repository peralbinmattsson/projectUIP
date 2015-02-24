var stockItem =
    "<li id='item_{{beer_id}}' class='listItem' name='{{namn}}'>"+
    "<span id='name'>{{namn}} </span>"+
    "<span id='name2'>{{namn2}} </span>" + 
    "<span id='count'>{{count}}</span>" +
    "<button class='button' data-id='{{beer_id}}' data-type='drink' name='{{namn}}' name2='{{namn2}}' count='{{count}}'" +
    " id='add'>Edit</button>" +
    "</li>";

var userList =
    "<li id='item_{{username}}' class='listItem' name='{{username}}'>"+
    "<span id='username'>{{username}} </span>"+
    "<span id='fname'>{{first_name}} </span>" + 
    "<span id='lname'>{{last_name}}</span>" + 
    "<span id='assets'>{{assets}}</span>" +
    "<button class='button' data-id='{{username}}' data-type='user' name='{{username}}' assets='{{assets}}'' " +
    " id='add'>Edit</button>" +
    "</li>";

var $beer = $('#stock_container');
var $user = $('#user_container');

function addStockItem(beer) {
    if (beer.namn != "") {
            $beer.append(Mustache.render(stockItem, beer));
        }
}

function addUser(user) {
    if (user.namn != "") {
        $user.append(Mustache.render(userList, user));
    }
}

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

function print (arg) {console.log(arg);}

function insertItemValues (item, type) {
    var content = ''; 
    $("#drink_values, #user_values").empty();
    if (type == "user") {
        content += '<span>Username: </span><span id="username">' + item.attr('username') + '</span><br/>';
        //content += '<span>Firstname: </span><span id="fname">' + item.attr('fname') + '</span><br/>';
        //content += '<span>Lastname: </span><span id="lname">' + item.attr() + '</span><br/>';
        content += '<span>Assets: </span><input type="number" name="assets" id="assets" value="' + item.attr('assets') + '" /></span>';
    } else{
        content += '<span>Name: </span><span id="name">' + item.attr('name') + '</span><br/>';
        content += '<span>Name2: </span><span id="name2">' + item.attr('name2') + '</span><br/>';
        content += '<span>Count: </span><input type="number" name="count" id="count" value="' + item.attr('count') + '" /></span>';
        content += '<input id="drink_id" type="hidden" value="' + item.attr("data-id") + '">';
    };
    content += '<br/><br/><br/>';
    //content += '<button class="button" id="' + type + '_save" onclick="saveItem(' + type + ')">Save</button>';
    content += '<button class="button" id="' + type + '_save">Save</button>';
    $("#" + type + "_values").append(content);

}

$(document).ready(function() {

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
    
    $('.search').keyup(function(e) {
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
    
    // On button press, show the edit-divs
    $("#stock_container, #user_container").on("click", "li .button", function (item) {
        //var itemData = "#item_" + $(this).attr("data-id");
        var itemData = $(this);
        var type;
        if ($(this).attr('data-type') == "drink") {
            $("#drink_values").removeClass("hidden");    
            type = "drink";
        } else{
            $("#user_values").removeClass("hidden");    
            type = "user";
        };
        insertItemValues(itemData, type);


        $("#black_wrapper, #item_editer").fadeIn().removeClass("hidden");    
        //$("#black_wrapper, #item_editer").fadeIn().addClass("showing");    
    });

    //On background press, fade out the background
    $("#black_wrapper").on("click", function () {
        $("#black_wrapper, #item_editer").fadeOut();
    });

});
