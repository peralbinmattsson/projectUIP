
$(document).ready(function() {
    var costItem = 
        "<p cost='{{total}}'>Total: {{total}} kr</p>";
    orderList = JSON.parse( localStorage.getItem("order"));
    totalPrice = JSON.parse( localStorage.getItem("total"));
    credit =  JSON.parse( localStorage.getItem("assets"));
    stockCount =  JSON.parse( localStorage.getItem("stockCount"));
    order.orderList = orderList;
    items.stockCount = stockCount;
    order.load();
    priceObj.total = totalPrice;
    $('#finalCost').html(Mustache.render(costItem, priceObj));
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
                url:'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=purchases_append&beer_id=' + key,

                success: function (object) {
                    console.log("success");
                 //  alert("Succesful purchase!");
                   // print("Bought drink succesfull");
                }
            });
        }
        //Show the message "Successful purchase!"
        $("#success").removeClass("hidden");  
    });
});

$('#cancel_btn').on('click', function(){
    window.location.href='beer.html';
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


