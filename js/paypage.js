
$(document).ready(function() {
    //var $rightList = $('#rightList');
    //var rightListItem =
    //    "<li data-id='{{id}}'>{{name}} <span id='{{id}}'>({{amount}})</span><p><br>" +
    //    "{{price}} kr</p><button class='button' data-id='{{id}}'" +
    //    "id=remove price='{{price}}'>X</button></li>";
    orderList = JSON.parse( localStorage.getItem("order"));
    totalPrice = JSON.parse( localStorage.getItem("total"));
    credit =  JSON.parse( localStorage.getItem("assets"));
    stockCount =  JSON.parse( localStorage.getItem("stockCount"));
    order.orderList = orderList;
    beerList.stockCount = stockCount;
    order.load();
    priceObj.total = totalPrice;
    priceObj.addCost();
    jQueryBindings.addBind();
    jQueryBindings.removeBind();
    jQueryBindings.undoBind();
    jQueryBindings.redoBind();

    var $credit = $('#credit');
    $credit.html("<p>Credit: " + credit +"</p>");


$('#paymentButton').on('click', function(){


    $.each(orderList, function(key,value) {
        for (var i = 0; i < value.amount; i++){
            $.ajax({
                type: 'POST',
                url:'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=purchases_append&beer_id=' + key,

                success: function (object) {
                    console.log("success");
                 //  alert("Succesful purchase!");
                   // print("Bought drink succesfull");
                }
            });
        }
        alert("Succesful purchase!");
    });
});

$("#paymentButton").on("click", function () {
    $("#black_wrapper, #confirm_editer").fadeIn().removeClass("hidden");    
    //$("#black_wrapper, #confirm_editer").fadeIn().addClass("showing");    
    });

    //On background press, fade out the background
    $("#black_wrapper").on("click", function () {
        $("#black_wrapper, #confirm_editer").fadeOut();
    });

});


