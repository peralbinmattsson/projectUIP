var $leftList = $('#leftList');
var $rightList = $('#rightList');
var $rightSide = $('#rightSide');
var $cost = $('#cost');
var $finalCost = $('#finalCost');
//HTML VARIABLES
var leftListItem =
    "<li id='item' class='listItem' name='{{namn}}'><span>{{namn}}" +
    "</span><span>{{pub_price}} kr</span>" +
    "<button id='add' data-id='{{beer_id}}' name='{{namn}}' class='button'" +
    "price='{{pub_price}}' data-i18n='addCart'>Add to cart</button></li>";

var leftListItemRed = 
    "<li style='color:red;' id='item' class='listItem' name='{{namn}}'><span>{{namn}}" +
    "</span><span>{{pub_price}} kr</span>" +
    "</li>";

var rightListItem = 
    "<li data-id='{{id}}'>{{name}} <span id='{{id}}'>({{amount}})</span><p><br>" +
    "{{price}} kr</p><button class='button' data-id='{{id}}'" +
    "id=remove price='{{price}}' name='{{name}}'>X</button></li>";

var costItem = 
    "<p cost='{{total}}'>Total: {{total}} kr</p>";

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
    stockCount: {}, 
    //Methods
    listBeer: function(beer) {
        if (beer.namn != "") {
            if (beer.count < 1) {
                $leftList.append(Mustache.render(leftListItemRed, beer));
            } else {
                this.stockCount[beer.beer_id] = beer.count;
                $leftList.append(Mustache.render(leftListItem, beer));
            }
        }
    },
};
var order = {
    orderList: {},
    //Methods
    load: function() {
        $rightList.empty();
        $.each(this.orderList, function(key, value) {
            $rightList.append(Mustache.render(rightListItem, value));
        });
    },
    addOrder: function(id, name, thisPrice) {
        if (beerList.stockCount[id] > 0) {
            beerList.stockCount[id] -= 1;
            if (name.length > 18) {
                name = name.substring(0, 15).concat("...");
            }
            if (this.orderList[id] != undefined) {
                this.orderList[id]['amount'] += 1;
            } else {
                this.orderList[id] = {'id': id, 'name': name, 'price': thisPrice, 'amount': 1};
            }
            order.load();
            priceObj.total = parseInt(priceObj.total) + parseInt(thisPrice);
            priceObj.addCost();
        } else {
            alert('No more of this beer in stock!'); 
        }
    },
    removeOrder: function(id, thisPrice) {
        var thisOrder = this.orderList[id];
        if (thisOrder != undefined){
            beerList.stockCount[id] += 1;
            if (thisOrder['amount'] == 1) {
                delete this.orderList[id];
                $("ul li[data-id=" + id + "]").remove();
            } else {
                thisOrder['amount'] -= 1;
            }
            order.load();
            priceObj.total = priceObj.total-parseInt(thisPrice);
            priceObj.addCost(priceObj);
        };
    },
};
var priceObj = {
    total: 0,
    //Methods
    addCost: function() {
        var priceObject = this;
        $cost.html(Mustache.render(costItem, priceObject));
        $finalCost.html(Mustache.render(costItem, priceObject));
    }
};
var jQueryBindings = {
    getAll: function() {
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
    },
    searchBind: function() {
        $('.search').keyup(function(e) {
            var value = $(this).val();
            $('li').each(function() {
                var name = $(this).attr('name');
                if (value == "" || name == "undefined" || partOf(value, name)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });
    },
    addBind: function() {
        $leftList.delegate('#add', 'click', function() {
            var id = $(this).attr('data-id');
            var name = $(this).attr('name');
            var price = $(this).attr('price');
            var command = new addToOrder(order, id, name, price);
            undoRedoStack.push(command);
            button.click(command);
        });
    },
    removeBind: function() {
        $rightList.delegate('#remove', 'click', function(){
            var id = $(this).attr('data-id');
            var name = $(this).attr('name');
            var price = $(this).attr('price');
            var command = new removeFromOrder(order, id, name, price);
            undoRedoStack.push(command);
            button.click(command);
        });
    },
    undoBind: function() {
        $rightSide.delegate('#undoButton', 'click', function(){
            if (!undoRedoStack.isUnder()) {
                var command = undoRedoStack.undo();
                button.clickUndo(command);
            }
        });
    },
    redoBind: function() {
        $rightSide.delegate('#redoButton', 'click', function(){
            if (!undoRedoStack.isOver()) {
                var command = undoRedoStack.redo();
                button.clickRedo(command);
            }
        });
    },
    payBind: function() {
        $('#payButton').on('click', function() {
            localStorage.setItem("order", JSON.stringify(order.orderList));
            localStorage.setItem("total", priceObj.total.toString());
            localStorage.setItem("stockCount", JSON.stringify(beerList.stockCount));
        });
    },
};

