
$(document).ready(function() {
    //var $rightList = $('#rightList');
    //var rightListItem =
    //    "<li data-id='{{id}}'>{{name}} <span id='{{id}}'>({{amount}})</span><p><br>" +
    //    "{{price}} kr</p><button class='button' data-id='{{id}}'" +
    //    "id=remove price='{{price}}'>X</button></li>";

    orderList = JSON.parse( localStorage.getItem("order"));
    totalPrice = JSON.parse( localStorage.getItem("total"));
    order.orderList = orderList;
    order.load();
    priceObj.total = totalPrice;
    priceObj.addCost();
    jQueryBindings.addBind();
    jQueryBindings.removeBind();
    jQueryBindings.undoBind();
    jQueryBindings.redoBind();


    //$.each(orderList, function(key, value) {
    //    $('#rightList').append(Mustache.render(rightListItem, value));
    //    var price = {
    //        total: 0,
    //        //Methods
    //        addCost: function() {
    //            var priceObject = this;
    //            $cost.html(Mustache.render(costItem, priceObject));
    //        }
    //    };
    //});
    //$rightList.delegate('#remove', 'click', function(){
    //    var id = $(this).attr('data-id');
    //    var thisPrice = $(this).attr('price');
    //    var thisOrder = order.orderList[id];
    //    if (thisOrder != undefined){
    //        removeBeer(id);
    //        price.total = price.total-parseInt(thisPrice);
    //        price.addCost(price);
    //    };
    //});
    //function removeBeer(id) {
    //    var thisOrder = this.orderList[id];
    //    if (thisOrder['amount'] == 1) {
    //        delete this.orderList[id];
    //        $("ul li[data-id=" + id + "]").remove();
    //    } else {
    //        thisOrder['amount'] -= 1;
    //        $('#' + thisOrder['id'] + '').text("(" + thisOrder['amount'] + ")");
    //    }
    //}
    //total = localStorage.getItem("total");

    //});
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

/*$('PayButton').on('click') function(){


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
});*/
});


