/**
 * Created by heogyu on 2017. 3. 18..
 */

function NOPE_MAIN(){
    /*
    var welcomeText = "NO Phsing FOR NAVER";
    var mainId = document.getElementById("popup_main");
    mainId.innerText = welcomeText;
    */
    document.getElementById("popup_options").addEventListener("click",showOptionsPage);
    document.getElementById("sendto").addEventListener("click",sendtonaver);
    /*
    chrome.tabs.query({'active':true,'lastFocusedWindow':true},function(tabs){
        var url = tabs[0].url;
        mainId.innerText = url + " 을 현재 방문하고 계십니다";
    });
    /*
    new Notification("하하하", {
        icon: 'icon.png',
        body: 'Time to make the toast.'
    });
    */

}

function showOptionsPage(){
    chrome.tabs.getAllInWindow(null, function(){
        window.open("/options.html");
    })
}

function sendtonaver(){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        new Notification("URL신고완료", {
            icon: 'images/nope_icon_64.png',
            body: url + '을 신고하였습니다. 검토 후 반영됩니다'
        });
    });
}

window.onload = function(){
    NOPE_MAIN();
}