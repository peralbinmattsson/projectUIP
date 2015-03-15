$(document).ready(function() {
    //AJAX REQUESTS AND JQUERY EVENTS
    items.getAll();
    jQueryBindings.searchBind();
    jQueryBindings.addBind();
    jQueryBindings.removeBind();
    jQueryBindings.payBind();
    jQueryBindings.undoBind();
    jQueryBindings.redoBind();
    jQueryBindings.prepareDrag();
    jQueryBindings.showAll();
    jQueryBindings.showBeer();
    jQueryBindings.showWine();

    $(window).bind('scroll', function() {
        var roof = 160;
        if ($(window).scrollTop() > roof) {
            $('#rightSide').css({'position': 'fixed', 'top': '60px'});
            $('#cost').css({'position': 'fixed', 'top': '380px'});
        } else {
            $('#rightSide').css({'position': 'absolute', 'top': '0px'});
            $('#cost').css({'position': 'absolute', 'top': '320px'});
        }
    });


});
