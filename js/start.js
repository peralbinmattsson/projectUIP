$(document).ready(function() {
    $('#left, #right').hover(function() {
        $(this).css('border-color', '#26C6B0');
    }, function() {
        $(this).css('border-color', 'black');
    });
});
