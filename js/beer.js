$(document).ready(function() {
    var $beer = $("#beer");

    function addBeer(beer) {
        $beer.append("<li><span>" + beer.namn + "</span></li>");
    }

    $.ajax({
        type: 'GET',
        url: "http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get",
        success: function(object) {
            data = object["payload"];
            $.each(data, function(i, beer) {
                addBeer(beer);
            });
        }
    });
});
