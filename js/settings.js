var stockItem =
    "<li id='item_{{beer_id}}' type='drink' class='listItem' name='{{namn}}' onclick='printInfo({{beer_id}})'>"+
    "<span id='name'>{{namn}} </span>"+
    "<span id='name2'>{{namn2}} </span>" + 
    "<span id='count'>{{count}}</span>" +
    "<button class='button' data-id='{{beer_id}}' data-type='drink' name='{{namn}}' name2='{{namn2}}' count='{{count}}'" +
    " id='edit_btn'>Edit</button>" +
    "</li>";

var userList =
    "<li id='item_{{username}}' type='user' class='listItem' name='{{username}}'>"+
    "<span id='username'>{{username}} </span>"+
    "<span id='fname'>{{first_name}} </span>" + 
    "<span id='lname'>{{last_name}}</span>" + 
    "<span id='assets'>{{assets}}</span>" +
    "<button class='button' data-id='{{username}}' data-type='user' name='{{username}}' fname='{{first_name}}' lname='{{last_name}}'' assets='{{assets}}' " +
    " id='edit_btn'>Edit</button>" +
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
        content += '<span>Username: </span><span id="username">' + item.attr('data-id') + '</span><br/>';
        content += '<span>Firstname: </span><input id="fname" value="' + item.attr('fname') + '" /><br/>';
        content += '<span>Lastname: </span><input id="lname" value="' + item.attr('lname') + '" /><br/>';
        content += '<span>Assets: </span><span id="assets">' + item.attr('assets') + '</span><br/>';
        content += '<span>Add assets: </span><input type="number" name="new_assets" id="new_assets" />';
        content += '<input id="user_name" type="hidden" value="' + item.attr("data-id") + '">';
    } else{
        content += '<span>Name: </span><span id="name">' + item.attr('name') + '</span><br/>';
        content += '<span>Name2: </span><span id="name2">' + item.attr('name2') + '</span><br/>';
        content += '<span>Count: </span><span id="count">' + item.attr('count') + '</span><br/>';
        content += '<span>Add/sub count: </span><input type="number" name="new_count" id="new_count" />';
        content += '<input id="drink_id" type="hidden" value="' + item.attr("data-id") + '">';
    };
    content += '<br/><br/><br/>';
    content += '<button class="button" id="' + type + '_save" onclick="saveItem(\'' + type + '\')">Save</button>';
    $("#" + type + "_values").append(content);

}

function saveItem (arg) {
    switch(arg){
        case "user":
            var user = $("#user_name").val();
            var add = $("#new_assets").val();
            var fname = $("input#fname").val();
            var lname = $("input#lname").val();
            
            var itemInList = $("#item_" + user + " span#assets");
            var itemInListFN = $("#item_" + user + " span#fname");
            var itemInListLN = $("#item_" + user + " span#lname");
            
            var old_value = itemInList.text();
            var id;
            $('#item_editer').html('<img src="../img/load-icon.gif">');
            $.when($.ajax({
                type: 'GET',
                url: 'http://pub.jamaica-inn.net/fpdb/api.php?username='+localStorage.getItem("user")+'&password='+localStorage.getItem("password")+'&action=iou_get',
                success: function(data) {
                    var id = data.payload[0].user_id; 
                    var assets = data.payload[0].assets; 
                    $.ajax({
                        type: 'GET',
                        url: 'http://pub.jamaica-inn.net/fpdb/api.php?username='+localStorage.getItem("user")+'&password='+localStorage.getItem("password")+'&action=payments_append&user_id='+id+'&amount='+add,
                        async: false,
                        success: function(data2) {
                            var newAsset = parseInt(assets)+parseInt(add);
                            localStorage.setItem("assets", newAsset);
                        }
                    });
                }
            }),
            $.ajax({
                type: 'GET',
                url: "http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=user_edit&new_username=" + user + "&new_password=" + user + "&first_name=" + fname + "&last_name=" + lname + "&email=''&phone=''",
                success: function (data) {
                    $(itemInListFN).text(fname);
                    $(itemInListLN).text(lname);
                },
                error: function(data) {
                    print("Error: Didn't update names");
                }
            })).then(function() {
                $("#black_wrapper, #item_editer").fadeOut();
                window.location.reload();
            });
            break;

        case "drink":
            var id = $("#drink_id").val();
            var add = $("#new_count").val();
            var itemInList = $("#item_" + id + " span#count");
            var old_value = itemInList.text();            
            var new_value = parseInt(old_value) + parseInt(add);
            if (new_value<0) {add = parseInt(add) + Math.abs(new_value);new_value=0;}; 
            $('#item_editer').html('<img src="../img/load-icon.gif">');
            $.when($.ajax({
                type: 'GET',
                url: "http://pub.jamaica-inn.net/fpdb/api.php?username="+localStorage.getItem("user")+'&password='+localStorage.getItem("password")+'&action=inventory_append&beer_id=' + id + "&amount=" + add + "&price=''",
                success: function(object) {
                    print("saved drink succesfull");
                }
            })).then(function() {
                $("#black_wrapper, #item_editer").fadeOut();
                window.location.reload();
            });
            break;
        
        default: 
            return false;
    }
}

function printInfo (id) {
    $("#rightSide").empty();
    $.ajax({
        type: 'GET',
        url: 'http://pub.jamaica-inn.net/fpdb/api.php?username='+localStorage.getItem("user")+'&password='+localStorage.getItem("password")+'&action=beer_data_get&beer_id=' + id,
        success: function (data) {
            if (data.type != "error") {
                var content = "<img src='../img/beverages/" + id + ".png'><table>";
                $.each(data['payload'][0], function (index, value) {
                    content += "<tr><td>" + index + "</td><td>" + value + "</td></tr>";
                });
                content += "</table>";
                $("#rightSide").html(content);
            } else{
                print("Error: Request fail");
            };
        }
    });
}

$(document).ready(function() {

    $.ajax({
        type: 'GET',
        url: 'http://pub.jamaica-inn.net/fpdb/api.php?username='+localStorage.getItem("user")+'&password='+localStorage.getItem("password")+'&action=inventory_get',
        success: function(object) {
            data = object['payload'];
            $.each(data, function(i, beer) {
                addStockItem(beer);
            });
        }
    });
    $.ajax({
        type: 'GET',
        url: 'http://pub.jamaica-inn.net/fpdb/api.php?username='+localStorage.getItem("user")+'&password='+localStorage.getItem("password")+'&action=iou_get_all',
        success: function(object) {
            data = object['payload'];
            $.each(data, function(i, user) {
                if (localStorage.getItem("user") == user.username) {
                    localStorage.setItem("assets", parseInt(user.assets));
                }
                addUser(user);
            });
        }
    });
    // function to hide and show user and stock on a click
    $user.hide();
    $("#stock_btn").on("click", function () {
        $user.hide();
        $beer.show();
        $("#rightSide").show().text("Click on the list item for more info.");
    });
    $("#user_btn").on("click", function () {
        $beer.hide();
        $user.show();
        $("#rightSide").hide()
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
    });

    //On background press, fade out the background
    $("#black_wrapper").on("click", function () {
        $("#black_wrapper, #item_editer").fadeOut();
    });

    $(window).bind('scroll', function() {
        var roof = 160;
        if ($(window).scrollTop() > roof) {
            $('#rightSide').css({'position': 'fixed', 'top': '60px'});
        } else {
            $('#rightSide').css({'position': 'absolute', 'top': '0px'});
        }
    });

});
