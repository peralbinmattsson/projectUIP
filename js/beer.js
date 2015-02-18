$(document).ready(function() {
    var $leftList = $('#leftList');
    var $rightList = $('#rightList');

    var leftListItem = 
        "<li id='item' class='listItem' name='{{namn}}'><span>{{namn}}" +
        "</span><span>{{pub_price}} kr</span>" +
        "<button class='button' data-id='{{beer_id}}' name='{{namn}}' price='{{pub_price}}'" +
        " id='add'>Add to order</button>" +
        "</li>";

    function listBeer(beer) {
        if (beer.namn != "") {
            $leftList.append(Mustache.render(leftListItem, beer));
        }
    }

    function chooseBeer(id, name, price) {
        if (name.length > 18) {
            name = name.substring(0, 15).concat("...");
        }
        $rightList.append("<li data-id=" + id + 
                ">" + name + " (1)<p><br>" + price +
                " kr</p> " +
            "<button class='button' data-id="+id+" id=Cancel price="+price+">X</button></li>"
        );
    }

    function addCost(price) {
        $('#cost').html("<p>---</p><p cost=" + price + ">Total: " + price + "</p>");
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
            chooseBeer(id, name, thisPrice);
            beerList[index] = id;
        }
        price = price + parseInt(thisPrice);
        addCost(price);
    });

    $rightList.delegate('#Cancel', 'click', function(){
        id = $(this).attr('data-id');
        thisPrice = $(this).attr('price');
        console.log ("price"+ thisPrice+ " pp " +price);
        console.log("list"+beerList);
        num = beerList.indexOf(id);
        console.log(num+"id :"+id)
        if (num > -1){
            beerList.splice(num, 1);
            $("ul li[data-id=" + id + "]").remove();
            price = price-parseInt( thisPrice);
            addCost(price);
        }console.log("list"+beerList);

    });

    function partOf(value, name) {
        index = 1;
        valueLow = value.toLowerCase();
        nameLow = name.toLowerCase();
        if (nameLow.search(valueLow) == -1) {
            return false;
        }
        return true;
    }

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
});
