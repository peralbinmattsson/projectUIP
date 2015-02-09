$(document).ready(function() {
    var $beer = $('#leftList');
    var $chosenBeer = $('#rightList');

    function addBeer(beer) {
        if (beer.namn != "") {
            $beer.append("<li><span>" + 
                beer.namn +
                "</span><span>" +
                beer.pub_price +
                " kr" + "</span>" +
                "<button id=\"add\">Add to order</button>" +
                "</li>");
        }
    }

    $.ajax({
        type: 'GET',
        url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get',
        success: function(object) {
            data = object['payload'];
            $.each(data, function(i, beer) {
                addBeer(beer);
            });
        }
    });
    $beer.delegate('#add', 'click', function() {
        $chosenBeer.append("<li>dask</li>");
    });
});
