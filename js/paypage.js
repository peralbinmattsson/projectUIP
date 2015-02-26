
var rightListItem =
    "<li data-id='{{id}}'>{{name}} <span id='{{id}}'>({{amount}})</span><p><br>" +
    "{{price}} kr</p><button class='button' data-id='{{id}}'" +
    "id=Cancel price='{{price}}'>X</button></li>";



$(document).ready(function() {

    //localStorage for beers
    orderList = JSON.parse( localStorage.getItem("order"));
    console.log(orderList);
    $.each(orderList, function(key, value) {
        $('#rightList').append(Mustache.render(rightListItem, value));
    });
    $rightList.delegate('#remove', 'click', function(){
        var id = $(this).attr('data-id');
        var thisPrice = $(this).attr('price');
        var thisOrder = order.orderList[id];
        if (thisOrder != undefined){
            order.removeBeer(id);
            price.total = price.total-parseInt(thisPrice);
            price.addCost(price);
        };

    //LocalStorage for total
    total = localStorage.getItem("total");
    $cost.html(Mustache.render(costItem, priceObject));
    };

// The popup windows  after clicking on pay or cancel button
    $('#PaymentButton').on('click', function() {
        alert("Thanks for your shopping :)");
    });
    $('#CancelButton').on('click', function() {
        var x;
        if (confirm("Are You sure that you want to finish transaction?!") == true) {
            x = window.open("index.html");

        }

    });

//Showing total and credit in left box
    var leftBoxItemCost=
        "<p cost='{{total}}'>Total: {{total}} kr</p>";


});

