$(document).ready(function() {
    var $beer = $('#leftList');

    function addBeer(beer) {
        $beer.append("<li><span>" + 
            beer.namn +
            "</span><span>" +
            beer.pub_price +
            " kr" + "</span>" +
            "<button>Add to order</button>" +
            "</li>");
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
    //$('#beerContainer').scroll(function() { 
    //    $('#FixedDiv').css('top', $(this).scrollTop());
    //});
});
