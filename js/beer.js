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
        var navHeight = $(window).height() - 200;
        if ($(window).scrollTop() > navHeight) {
            $('#rightSide').css({'position': 'fixed', 'top': '10px'});
        } else {
            $('#rightSide').css('position', 'absolute');
        }
    });


});
