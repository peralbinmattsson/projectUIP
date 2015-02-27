$(document).ready(function() {
    var $leftList = $('#leftList');
    var $rightList = $('#rightList');
    var $rightSide = $('#rightSide');
    var $cost = $('#cost');

    //HTML VARIABLES
    var leftListItem = 
        "<li id='item' class='listItem' name='{{namn}}'><span>{{namn}}" +
        "</span><span>{{pub_price}} kr</span>" +
        "<button class='button' data-id='{{beer_id}}' name='{{namn}}' price='{{pub_price}}'" +
        " id='add'>Add To Order</button>" +
        "</li>";

    var leftListItemRed = 
        "<li style='color:red;' id='item' class='listItem' name='{{namn}}'><span>{{namn}}" +
        "</span><span>{{pub_price}} kr</span>" +
        "</li>";

    var rightListItem = 
        "<li data-id='{{id}}'>{{name}} <span id='{{id}}'>({{amount}})</span><p><br>" +
        "{{price}} kr</p><button class='button' data-id='{{id}}'" +
        "id=remove price='{{price}}'>X</button></li>";

    var costItem = 
        "<p>---</p><p cost='{{total}}'>Total: {{total}} kr</p>";

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
        }
    };
    var order = {
        orderList: {},
        //Methods
        load: function() {
            orderObj = this;
            $rightList.empty();
            $.each(this.orderList, function(key, value) {
                $rightList.append(Mustache.render(rightListItem, value));
            }); 
        },
        addOrder: function(id, name, thisPrice, undoRedo) {
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
                price.total = price.total + parseInt(thisPrice);
                price.addCost();
                if (undoRedoStack.stack.length > 9) {
                    undoRedoStack.stack.splice(0, 1); 
                }
                if (!undoRedo) {
                    undoRedoStack.push({"type": "removeOrder", "data": [id, thisPrice]});
                }
                console.log(undoRedoStack.stack);
                console.log(undoRedoStack.currentIndex);
            } else {
                alert('No more of this beer in stock!'); 
            }
        },
        removeOrder: function(id, thisPrice, undoRedo) {
            var thisOrder = this.orderList[id];
            if (thisOrder != undefined){
                beerList.stockCount[id] += 1;
                if (thisOrder['amount'] == 1) {
                    delete this.orderList[id];
                    $("ul li[data-id=" + id + "]").remove();
                } else {
                    thisOrder['amount'] -= 1;
                    $('#' + thisOrder['id'] + '').text("(" + thisOrder['amount'] + ")");
                }
                price.total = price.total-parseInt(thisPrice);
                price.addCost(price);
                if (undoRedoStack.stack.length > 9) {
                    undoRedoStack.stack.splice(0, 1); 
                }
                if (!undoRedo) {
                    undoRedoStack.push({"type": "addOrder", "data": [id, thisOrder['name'], thisPrice]});
                }
                console.log(undoRedoStack.stack);
                console.log(undoRedoStack.currentIndex);
            };
        },
        addBind: function() {
            $leftList.delegate('#add', 'click', function() {
                var id = $(this).attr('data-id');
                var name = $(this).attr('name');
                var thisPrice = $(this).attr('price');
                order.addOrder(id, name, thisPrice, false);
            });
        },
        removeBind: function() {
            $rightList.delegate('#remove', 'click', function(){
                var id = $(this).attr('data-id');
                var thisPrice = $(this).attr('price');
                order.removeOrder(id, thisPrice, false);
            });
        },
        payBind: function() {
            $('#payButton').on('click', function() {
                localStorage.setItem("order", JSON.stringify(order.orderList));
                localStorage.setItem("total", price.total.toString());
            });
        },
        undoBind: function() {
            $('#undoButton').on('click', function() {
                var action = undoRedoStack.undo();
                if (action["type"] == "addOrder") {
                    var data = action["data"];
                    order.addOrder(data[0], data[1], data[2], true);
                } else if(action["type"] == "removeOrder") {
                    var data = action["data"];
                    order.removeOrder(data[0], data[1], true);
                }
            });
        },
        redoBind: function() {
            $('#redoButton').on('click', function() {
                var action = undoRedoStack.redo();
                if (action["type"] == "addOrder") {
                    var data = action["data"];
                    order.addOrder(data[0], data[1], data[2], true);
                } else if(action["type"] == "removeOrder") {
                    var data = action["data"];
                    order.removeOrder(data[0], data[1], true);
                }
            });
        },
    };
    var price = {
        total: 0,
        //Methods
        addCost: function() {
            var priceObject = this;
            $cost.html(Mustache.render(costItem, priceObject));
        }
    };
    var undoRedoStack = {
        stack: [],
        currentIndex: 0,
        //Methods
        push: function(element) {
             this.stack.push(element); 
             this.currentIndex = this.stack.length-1;
        },
        undo: function() {
            var result = this.stack[this.currentIndex]; 
            this.currentIndex -= 1;
            if (this.currentIndex < 0) {
                this.currentIndex = 0;
            }
            return result;
        },
        redo: function() {
            var result = this.stack[this.currentIndex]; 
            this.currentIndex += 1;
            if (this.currentIndex >= this.stack.length) {
                this.currentIndex = this.stack.length-1;
            }
            return result;
        }
    };

    //AJAX REQUESTS AND JQUERY EVENTS
    beerList.getAll();
    beerList.searchBind();
    order.addBind();
    order.removeBind();
    order.payBind();
    order.undoBind();
    order.redoBind();



});
