
var rightListItem =
    "<li data-id='{{id}}'>{{name}} <span id='{{id}}'>({{amount}})</span><p><br>" +
    "{{price}} kr</p><button class='button' data-id='{{id}}'" +
    "id=Cancel price='{{price}}'>X</button></li>";



$(document).ready(function() {


    orderList = JSON.parse( localStorage.getItem("order"));
    console.log(orderList);

    $.each(orderList, function(key, value) {
        $('#rightList').append(Mustache.render(rightListItem, value));
    });

    total = localStorage.getItem("total");

    function payFunction()
    {
     alert("Thanks for your shopping :)");
    }

});
/*
var user = $("#user_name").val();
var add = $("#new_assets").val();
//print(user);
var itemInList = $("#item_" + user + " span#assets");
var old_value = itemInList.text();
var id;
$.ajax({
    type: 'GET',
    url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + user + '&password=' + user + '&action=iou_get',
    success: function(data) {
        id = data.payload[0].user_id;

        $.ajax({
            type: 'GET',
            url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=payments_append&user_id='+id+'&amount='+add,
            success: function(data) {print("saved user succesfull");}
        });
    }
});
//print(id);
var new_value = parseInt(old_value) + parseInt(add);
$(itemInList).text(new_value);
$("#item_" + user + " button.button").attr('assets', new_value);
$("#black_wrapper, #item_editer").fadeOut();
*/

$('PayButton').on('click' function(){


    $.each(orderlist, function(key,value) {
        for (var i = 0; i < value.amount; i++){
            $.ajax({
                type: 'POST',
                url:'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=purchases_append&beer_id=' + key,

                success: function (object) {
                   // print("Bought drink succesfull");
                }
            });
        }
    });
});


/*What we need today
 <span>{{pub_price}} kr</span> //credit

 var leftBoxItem //for total & credit
 var leftBoxItemRed //if credit is minus

 */

