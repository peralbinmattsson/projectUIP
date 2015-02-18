$(document).ready(function() {
    var $leftList = $('#leftList');
    var $rightList = $('#rightList');

    //HTML VARIABLES
    var leftListItem = 
        "<li id='item' class='listItem' name='{{namn}}'><span>{{namn}}" +
        "</span><span>{{pub_price}} kr</span>" +
        "<button class='button' data-id='{{beer_id}}' name='{{namn}}' price='{{pub_price}}'" +
        " id='add'>Add to order</button>" +
        "</li>";

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
        orderList: [],
        //Methods
        addBeer: function(id, name, price) {
            if (name.length > 18) {
                name = name.substring(0, 15).concat("...");
            }
            $rightList.append("<li data-id=" + id + 
                    ">" + name + " (1)<p><br>" + price +
                    " kr</p> " +
                "<button class='button' data-id="+id+" id=Cancel price="+price+">X</button></li>"
            );
        } 
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

    var index = parseInt("0");;
    //TODO: Store the number of times a specific beer has been chosen
    $leftList.delegate('#add', 'click', function() {
        id = $(this).attr('data-id');
        index = index + parseInt("1");
        name = $(this).attr('name');
        thisPrice = $(this).attr('price');
        if (order.orderList.indexOf(id) == parseInt("-1")) {
            order.addBeer(id, name, thisPrice);
            order.orderList[index] = id;
            price.total = price.total + parseInt(thisPrice);
            price.addCost();
        }
    });

    $rightList.delegate('#Cancel', 'click', function(){
        id = $(this).attr('data-id');
        thisPrice = $(this).attr('price');
        num = order.orderList.indexOf(id);
        if (num > -1){
            order.orderList.splice(num, 1);
            $("ul li[data-id=" + id + "]").remove();
            price.total = price.total-parseInt(thisPrice);
            price.addCost(price);
        };
    });

});
