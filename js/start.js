$(document).ready(function() {
    $(".upperLeft, .upperRight, .lowerLeft, .lowerRight").hover(function() {
        $(this).css("border-color", "#26C6B0");
    }, function() {
        $(this).css("border-color", "black");
    });
});
