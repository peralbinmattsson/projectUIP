
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


    var leftBoxItemCost=
        "<p cost='{{total}}'>Total: {{total}} kr</p>";


});
/*What we need today
 <span>{{pub_price}} kr</span> //credit

 var leftBoxItem //for total & credit
 var leftBoxItemRed //if credit is minus

 */

