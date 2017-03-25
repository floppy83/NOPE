/**
 * Created by heogyu on 2017. 3. 23..
 */
/*
var mycolor = "#000000";
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        mycolor = request.colordata;
 }
 );
*/
mycolor="#ff0000";

var sheet = document.createElement('style');
var sheet2 = document.createElement('style');
sheet.innerHTML = "html {border: 10px solid "+ mycolor +";}";
sheet2.innerHTML = "html,body {width: initial; height: initial;}"
document.body.appendChild(sheet);
document.body.appendChild(sheet2);


