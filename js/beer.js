$(document).ready(function() {
    var $leftList = $('#leftList');
    var $rightList = $('#rightList');

    var leftListItem = 
        "<li id='item' name='{{namn}}'><span>{{namn}}" +
        "</span><span>{{pub_price}} kr</span>" +
        "<button data-id='{{beer_id}}' name='{{namn}}' price='{{pub_price}}'" +
        " id='add'>Add to order</button>" +
        "</li>";

    function listBeer(beer) {
        if (beer.namn != "") {
            $leftList.append(Mustache.render(leftListItem, beer));
        }
    }

    function chooseBeer(name, id) {
        $rightList.append("<li data-id=" + id + ">" + name + "</li>");
    }

    function addCost(price) {
        $('#cost').html("<p cost=" + price + ">Total: " + price + "</p>");
    }

    $.ajax({
        type: 'GET',
        url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get',
        success: function(object) {
            data = object['payload'];
            $.each(data, function(i, beer) {
                listBeer(beer);
            });
        }
    });

    var price = parseInt("0");
    var beerList = [];
    var index = parseInt("0");;
    //TODO: Store the number of times a specific beer has been chosen
    $leftList.delegate('#add', 'click', function() {
        id = $(this).attr('data-id');
        index = index + parseInt("1");
        name = $(this).attr('name');
        thisPrice = $(this).attr('price');
        if (beerList.indexOf(id) == parseInt("-1")) {
            chooseBeer(name, id);
            beerList[index] = id;
        }
        price = price + parseInt(thisPrice);
        addCost(price);
    });

    $('.search').keypress(function(e) {
        if (e.which == parseInt("13")) {
            value = $(this).val();
            $('li').each(function() {
                name = $(this).attr('name');
                console.log(name);
                if (value == "" || value == name || name == "undefined") {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
        //if (e.which == parseInt("13")) {
        //    $.ajax({
        //        type: 'GET',
        //        url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get',
        //        success: function(object) {
        //            data = object['payload'];
        //            $.each(data, function(i, beer) {
        //            });
        //        }
        //    });
        //}
    });
});
