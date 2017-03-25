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
mycolor="#000000";

var sheet = document.createElement('style');
sheet.innerHTML = "html {border: 10px solid "+ mycolor +";}";
document.body.appendChild(sheet);


