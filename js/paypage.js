
$(document).ready(function() {
    orderList = JSON.parse( localStorage.getItem("order"));
    totalPrice = JSON.parse( localStorage.getItem("total"));
    credit =  JSON.parse( localStorage.getItem("assets"));
    stockCount =  JSON.parse( localStorage.getItem("stockCount"));
    order.orderList = orderList;
    items.stockCount = stockCount;
    priceObj.total = totalPrice;
    priceObj.addCost();
    order.load();
    jQueryBindings.addBind();
    jQueryBindings.removeBind();
    jQueryBindings.undoBind();
    jQueryBindings.redoBind();

    var $credit = $('#credit');
    $credit.html("<p>Credit: " + credit +"</p>");

    var itemCount = 0;
    var successCount = 0;
    $('#confirm_btn').on('click', function(){
        $.when($.each(orderList, function(key,value) {
            $('#confirm_editer').html('<img src="../img/load-icon.gif">');
            for (var i=0; i < value.amount; i++){
                itemCount++;
                $.ajax({
                    type: 'POST',
                    url:'http://pub.jamaica-inn.net/fpdb/api.php?username='+localStorage.getItem("user")+'&password='+localStorage.getItem("password")+'&action=purchases_append&beer_id=' + key,
                    async: false,
                    success: function (object) {
                        successCount++; 
                    }
                });            
            }
        })).then(function() {
            if (successCount == itemCount) {
                $("#success").removeClass("hidden");  
                var tmpAssets = localStorage.getItem("assets");
                localStorage.setItem("assets", tmpAssets-priceObj.total);
                window.location.href = "beer.html";
            } else {
                alert("Error while making purchase!");
            }
        });
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


