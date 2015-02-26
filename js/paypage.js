



$(document).ready(function() {
    var $rightList = $('#rightList');
    var rightListItem =
        "<li data-id='{{id}}'>{{name}} <span id='{{id}}'>({{amount}})</span><p><br>" +
        "{{price}} kr</p><button class='button' data-id='{{id}}'" +
        "id=Cancel price='{{price}}'>X</button></li>";

    orderList = JSON.parse( localStorage.getItem("order"));
    console.log(orderList);

    $.each(orderList, function(key, value) {
        $rightList.append(Mustache.render(rightListItem, value));
    });


    var price = {
        total: 0,
        //Methods
        addCost: function() {
            var priceObject = this;
            $cost.html(Mustache.render(costItem, priceObject));
        }
    };
    $rightList.delegate('#remove', 'click', function(){
        var id = $(this).attr('data-id');
        var thisPrice = $(this).attr('price');
        var thisOrder = order.orderList[id];
        if (thisOrder != undefined){
            removeBeer(id);
            price.total = price.total-parseInt(thisPrice);
            price.addCost(price);
        };
    });
    function removeBeer(id) {
        var thisOrder = this.orderList[id];
        if (thisOrder['amount'] == 1) {
            delete this.orderList[id];
            $("ul li[data-id=" + id + "]").remove();
        } else {
            thisOrder['amount'] -= 1;
            $('#' + thisOrder['id'] + '').text("(" + thisOrder['amount'] + ")");
        }
    }
        total = localStorage.getItem("total");

// The popup windows  after clicking on pay or cancel button
        $('#PaymentButton').on('click', function () {
            alert("Thanks for your shopping :)");
        });
        $('#CancelButton').on('click', function () {
            var x;
            if (confirm("Are You sure that you want to finish transaction?!") == true) {
                x = window.open("index.html");

            }

        });
     });


