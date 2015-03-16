
$(document).ready(function() {
    orderList = JSON.parse( localStorage.getItem("order"));
    totalPrice = JSON.parse( localStorage.getItem("total"));
    credit =  JSON.parse( localStorage.getItem("assets"));
    stockCount =  JSON.parse( localStorage.getItem("stockCount"));
    order.orderList = orderList;
    items.stockCount = stockCount;
    order.load();
    priceObj.total = totalPrice;
    jQueryBindings.addBind();
    jQueryBindings.removeBind();
    jQueryBindings.undoBind();
    jQueryBindings.redoBind();

    var $credit = $('#credit');
    $credit.html("<p>Credit: " + credit +"</p>");


$('#confirm_btn').on('click', function(){
    $.each(orderList, function(key,value) {
        for (var i = 0; i < value.amount; i++){
            $.ajax({
                type: 'POST',
                url:'http://pub.jamaica-inn.net/fpdb/api.php?username='+localStorage.getItem("user")+'&password='+localStorage.getItem("password")+'&action=purchases_append&beer_id=' + key,
                success: function (object) {
                }
            });
        }
        //Show the message "Successful purchase!"
        $("#success").removeClass("hidden");  
    });
    var tmpAssets = localStorage.getItem("assets");
    localStorage.setItem("assets", JSON.stringify(tmpAssets+priceObj.total));
    window.location.href = "beer.html";
});

$('#cancel_btn').on('click', function(){
    $("#black_wrapper, #confirm_editer").fadeOut();
});

$("#paymentButton").on("click", function () {
    $("#black_wrapper, #confirm_editer, #confirm_btn, #cancel_btn").fadeIn().removeClass("hidden");    
    //$("#black_wrapper, #confirm_editer").fadeIn().addClass("showing");    
    });

    //On background press, fade out the background
    $("#black_wrapper").on("click", function () {
        $("#black_wrapper, #confirm_editer").fadeOut();
    });
});


