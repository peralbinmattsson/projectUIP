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
