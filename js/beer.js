$(document).ready(function() {
    var $leftList = $('#leftList');
    var $rightList = $('#rightList');
    var $rightSide = $('#rightSide');

    //HTML VARIABLES
    var leftListItem = 
        "<li id='item' class='listItem' name='{{namn}}'><span>{{namn}}" +
        "</span><span>{{pub_price}} kr</span>" +
        "<button class='button' data-id='{{beer_id}}' name='{{namn}}' price='{{pub_price}}'" +
        " id='add'>Add to order</button>" +
        "</li>";

    var rightListItem = 
        "<li data-id='{{id}}'>{{name}} <span id='{{id}}'>({{amount}})</span><p><br>" +
        "{{price}} kr</p><button class='button' data-id='{{id}}'" +
        "id=Cancel price='{{price}}'>X</button></li>";

    //INDEPENDENT FUNCTIONS
    function partOf(value, name) {
        index = 1;
        valueLow = value.toLowerCase();
        nameLow = name.toLowerCase();
        if (nameLow.search(valueLow) == -1) {
            return false;
        }
        return true;
    }

    //MAIN OBJECTS
    var beerList = {
        //Methods
        listBeer: function(beer) {
            if (beer.namn != "") {
                $leftList.append(Mustache.render(leftListItem, beer));
            }
        } 
    };
    var order = {
        orderList: {},
        //Methods
        load: function() {
            orderObj = this;
            $rightList.empty();
            $.each(this.orderList, function(key, value) {
                $rightList.append(Mustache.render(rightListItem, value));
            }); 
        },
        addBeer: function(id, name, price) {
            if (name.length > 18) {
                name = name.substring(0, 15).concat("...");
            }
            if (this.orderList[id] != undefined) {
                this.orderList[id]['amount'] += 1;
            } else {
                this.orderList[id] = {'id': id, 'name': name, 'price': price, 'amount': 1};
            }
        },
        removeBeer: function(id) {
            var thisOrder = this.orderList[id];
            if (thisOrder['amount'] == 1) {
                delete this.orderList[id];
                $("ul li[data-id=" + id + "]").remove();
            } else {
                thisOrder['amount'] -= 1;
                $('#' + thisOrder['id'] + '').text("(" + thisOrder['amount'] + ")");
            }
        },
        getOrderList: function() {
            return this.orderList;
        },
    };
    var price = {
        total: 0,
        //Methods
        addCost: function() {
            $('#cost').html("<p>---</p><p cost=" + this.total + ">Total: " + this.total + "</p>");
        }
    };

    //AJAX REQUESTS AND JQUERY EVENTS
    $.ajax({
        type: 'GET',
        url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get',
        success: function(object) {
            data = object['payload'];
            $.each(data, function(i, beer) {
                beerList.listBeer(beer);
            });
        }
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

    $leftList.delegate('#add', 'click', function() {
        id = $(this).attr('data-id');
        name = $(this).attr('name');
        thisPrice = $(this).attr('price');
        thisOrder = order.orderList[id];
        order.addBeer(id, name, thisPrice);
        order.load();
        price.total = price.total + parseInt(thisPrice);
        price.addCost();
    });

    $rightList.delegate('#Cancel', 'click', function(){
        id = $(this).attr('data-id');
        thisPrice = $(this).attr('price');
        thisOrder = order.orderList[id];
        if (thisOrder != undefined){
            order.removeBeer(id);
            price.total = price.total-parseInt(thisPrice);
            price.addCost(price);
        };
    });

    $('#payButton').on('click', function() {
        localStorage.setItem("order", JSON.stringify(order.orderList));
    });

});
