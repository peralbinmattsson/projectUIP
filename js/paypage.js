<<<<<<< HEAD
/**
 * Created by Maryam on 2/20/2015.
 */
/**$(document).ready(function(){
   var $var = localStorage.getItem("lastname");
    console.log($var);
    **/
if (typeof (Storage) !== undefined)
{
    localStorage.purchase = "???"
    document.getElementById("result").innerHTML = "purchase: " + localStorage.purchase;

}
    else
{
    //warning if local storage doesn't support
    document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";

}
=======
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

>>>>>>> origin/master
