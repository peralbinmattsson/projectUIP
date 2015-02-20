$(document).ready(function() {
    var $rightList = $('#rightList');
    orderlistJson = localStorage.getItem("orderList");
    orderList = JSON.parse(orderlistJson);
    console.log(orderList);


    for (key in orderList){

        for (key2 in orderList[key]){
            if (key2 == "name")
                name =orderList[key][key2] ;
            else if (key2 == "id")
                id =  orderList[key][key2];
            else if (key2 == "amount")
                amount = orderList[key][key2];
            else if (key2 == "price")
                price= orderList[key][key2];
        }
        rightListItem = "<li data-id="+id +">"+name+" <span id="+id+">("+amount+")</span><p><br>" + price+"kr</p></li>";
        $rightList.append(rightListItem);
    }

});

