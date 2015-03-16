var $leftList = $('#leftList');
var $rightList = $('#rightList');
var $rightSide = $('#rightSide');
var $cost = $('#cost');
var $finalCost = $('#finalCost');
//HTML VARIABLES
var leftListItem =
    "<li id='item' class='listItem' name='{{name}}'><span>{{name}}" +
    "</span><span>{{price}} kr</span>" +
    "<button id='add' data-id='{{id}}' name='{{name}}' itemType='{{type}}' class='button'" +
    "data-i18n='button.addtocart'" +
    "price='{{price}}' data-i18n='addCart'>{{lang}}</button><img src='../img/{{type}}-icon.png'" +
    "height='40' width='40' id='icon' draggable='true' ondragstart='dnd.drag(event)'" +
    "dataid='{{id}}' name='{{name}}' price='{{price}}' itemType='{{type}}'></li>";

var leftListItemLoad =
    "<li id='item' class='listItem' name='{{name}}'><span>{{name}}" +
    "</span><span>{{price}} kr</span>" +
    "<button id='add' data-id='{{id}}' name='{{name}}' itemType='{{type}}' class='button'" +
    "data-i18n='button.addtocart'" +
    "price='{{price}}' data-i18n='addCart'>{{lang}}</button><img src='../img/load-icon.gif'" +
    "height='35' width='35'" +
    "dataid='{{id}}' name='{{name}}' price='{{price}}'></li>";

var rightListItem = 
    "<li data-id='{{id}}'>{{name}} <span id='{{id}}'>({{amount}})</span><p><br>" +
    "{{price}} kr <img src='../img/{{type}}-icon.png' height='20' width='20'></p>" +
    "<button class='button' data-id='{{id}}' itemType='{{type}}'" +
    "id=remove price='{{price}}' name='{{name}}'>X</button></li>";

var costItem = 
    "<p>---</p><p cost='{{total}}'>Total: {{total}} kr</p>";

var costItemPP = 
    "<p cost='{{total}}'>Total: {{total}} kr</p>";

//INDEPENDENT FUNCTIONS
function partOf(value, name) {
    valueLow = value.toLowerCase();
    nameLow = name.toLowerCase();
    if (nameLow.search(valueLow) == -1) {
        return false;
    }
    return true;
}

//MAIN OBJECTS
var items = {
    stockCount: {}, 
    itemList: {},
    typeCount: 0,
    itemListLength: 0,
    //Methods
    listItem: function(item) {
        if (item.name != "") {
            if (item.count > 0) {
                this.stockCount[item.id] = item.count;
                if (item.type == "load") {
                    //console.log('dask');
                    $leftList.append(Mustache.render(leftListItemLoad, item));
                } else {
                    $leftList.append(Mustache.render(leftListItem, item));
                }
            }
        }
    },
    load: function(type) {
        $leftList.empty();
        $.each(items.itemList, function(key, value) {
            if (type == "all") {
                items.listItem(value);
            } else {
                if (type == value.type) {
                    items.listItem(value);
                }
            }
        }); 
    },
    //getAll: function() {
    //    $.ajax({
    //        type: 'GET',
    //        url: 'http://pub.jamaica-inn.net/fpdb/api.php?username='+localStorage.getItem("user")+'&password='+localStorage.getItem("password")+'&action=inventory_get',
    //        success: function(object) {
    //            var data = object['payload'];
    //            items.itemListLength = Object.keys(data).length;
    //            $.each(data, function(i, item) {
    //                var id = item.beer_id;
    //                var name = item.namn;
    //                var price = item.pub_price;
    //                var count = item.count;
    //                items.itemList[id] = {'id': id, 'name': name, 'price': price, 'count': count, 'type': 'load'};
    //                if (localStorage.getItem("language") == "sw") {
    //                    items.itemList[id]['lang'] = 'L\xE4gg i varukorg';
    //                } else {
    //                    items.itemList[id]['lang'] = 'Add to cart';
    //                }
    //                items.listItem(items.itemList[id]);
    //                items.setType(id);
    //            });
    //        }
    //    });
    //},
    //setType: function(id) {
    //    $.when($.ajax({
    //        type: 'GET',
    //        url: 'http://pub.jamaica-inn.net/fpdb/api.php?username='+localStorage.getItem("user")+'&password='+localStorage.getItem("password")+'&action=beer_data_get&beer_id=' + id,
    //        success: function(object) {
    //            var data = object['payload'];
    //            if (data[0] != undefined) {
    //                var typeDesc = data[0]['varugrupp'];
    //                if (partOf("vin", typeDesc)) {
    //                    items.itemList[id]['type'] = 'wine';
    //                } else {
    //                    items.itemList[id]['type'] = 'beer';
    //                }
    //            }
    //            items.typeCount++;
    //        }
    //    })).then(function() {
    //        if (items.typeCount == items.itemListLength) {
    //            items.load("all");
    //        }
    //    });
    //}
    getAll: function() {
        $.ajax({
            type: 'GET',
            url: 'http://pub.jamaica-inn.net/fpdb/api.php?username='+localStorage.getItem("user")+'&password='+localStorage.getItem("password")+'&action=inventory_get',
            success: function(object) {
                var data = object['payload'];
                items.itemListLength = Object.keys(data).length;
                $.each(data, function(i, item) {
                    var id = item.beer_id;
                    var name = item.namn;
                    var price = item.pub_price;
                    var count = item.count;
                    items.itemList[id] = {'id': id, 'name': name, 'price': price, 'count': count, 'type': 'load'};
                    if (localStorage.getItem("language") == "sw") {
                        items.itemList[id]['lang'] = 'L\xE4gg i varukorg';
                    } else {
                        items.itemList[id]['lang'] = 'Add to cart';
                    }
                    items.listItem(items.itemList[id]);
                    items.setType(id);
                });
            }
        });
    },
    setType: function(id) {
        $.when($.ajax({
            type: 'GET',
            url: 'http://pub.jamaica-inn.net/fpdb/api.php?username='+localStorage.getItem("user")+'&password='+localStorage.getItem("password")+'&action=beer_data_get&beer_id=' + id,
            success: function(object) {
                var data = object['payload'];
                if (data[0] != undefined) {
                    var typeDesc = data[0]['varugrupp'];
                    if (partOf("vin", typeDesc)) {
                        items.itemList[id]['type'] = 'wine';
                    } else {
                        items.itemList[id]['type'] = 'beer';
                    }
                }
                items.typeCount++;
            }
        })).then(function() {
            if (items.typeCount == items.itemListLength) {
                items.load("all");
            }
        });
    }
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
    addOrder: function(id, name, price, type) {
        if (items.stockCount[id] > 0) {
            items.stockCount[id] -= 1;
            if (name.length > 18) {
                name = name.substring(0, 15).concat("...");
            }
            if (this.orderList[id] != undefined) {
                this.orderList[id]['amount'] += 1;
            } else {
                this.orderList[id] = {'id': id, 'name': name, 'price': price, 'amount': 1, 'type': type};
            }
            order.load();
            priceObj.total = parseInt(priceObj.total) + parseInt(price);
            priceObj.addCost();
        } else {
            alert('No more of this beer in stock!'); 
        }
    },
    removeOrder: function(id, thisPrice) {
        var thisOrder = this.orderList[id];
        if (thisOrder != undefined){
            items.stockCount[id] += 1;
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
        $finalCost.html(Mustache.render(costItemPP, priceObject));
    }
};
var jQueryBindings = {
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
            var type = $(this).attr('itemType');
            var command = new addToOrder(order, id, name, price, type);
            undoRedoStack.push(command);
            button.click(command);
        });
    },
    removeBind: function() {
        $rightList.delegate('#remove', 'click', function(){
            var id = $(this).attr('data-id');
            var name = $(this).attr('name');
            var price = $(this).attr('price');
            var type = $(this).attr('itemType');
            var command = new removeFromOrder(order, id, name, price, type);
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
            localStorage.setItem("stockCount", JSON.stringify(items.stockCount));
        });
    },
    prepareDrag: function() {
        $leftList.delegate('#icon', 'mouseover', function() {
            dnd.id = $(this).attr('dataid');
            dnd.name = $(this).attr('name');
            dnd.price = $(this).attr('price');
            dnd.type = $(this).attr('itemType');
        });
    },
    showAll: function() {
        $('#showAll').on('click', function() {
            items.load("all");
        });
    },
    showBeer: function() {
        $('#showBeer').on('click', function() {
            items.load("beer");
        });
    },
    showWine: function() {
        $('#showWine').on('click', function() {
            items.load("wine");
        });
    },
};
var dnd = {
    id: null,
    name: null,
    price: null,
    type: null,
    //Methods
    drag: function(e) {
        e.dataTransfer.setData("id", this.id);
        e.dataTransfer.setData("name", this.name);
        e.dataTransfer.setData("price", this.price);
        e.dataTransfer.setData("type", this.type);
    }, 
    allow: function(e) {
        e.preventDefault();
    },
    drop: function(e) {
        e.preventDefault();
        var id = e.dataTransfer.getData("id");
        var name = e.dataTransfer.getData("name");
        var price = e.dataTransfer.getData("price");
        var type = e.dataTransfer.getData("type");
        var command = new addToOrder(order, id, name, price, type);
        undoRedoStack.push(command);
        button.click(command);
    },
};
