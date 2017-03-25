/**
 * Created by heogyu on 2017. 3. 23..
 */

//NOPE를 사용할 것인지를 결정하는 변수 (LocalStorage의 값에 따라 결정됨)
var bool_use;
var cur_url;
var edge_color = "#000000";
var urllist = new Array();

//트래픽 전송전에 호출되는 콜백함수\
var mycallback = function(details) {
    bool_use = localStorage.getItem("mwd_switch");
    edge_color = localStorage.getItem("color-mode");

    if(bool_use == "0"){
        //alert("no use nope");
    }
    else {

        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            var url = tabs[0].url;
            //alert(url);
            var domain = extractDomain(url);

            var split_domain = domain.split(".");
            var split_size = split_domain.length;
            if (split_size > 1) {
                var maindomain = split_domain[split_size - 2] + "." + split_domain[split_size - 1];
                //alert(maindomain);
            }
            //메인 도메인 단위
            if (maindomain == "naver.com" || maindomain == "naver.net" || maindomain == "blog.me") {
                //alert(url);
                chrome.tabs.executeScript({"file": "js/colorjs/"+edge_color+"_edge_style.js"});
            }

        });
    }
    //chrome.webRequest.onBeforeRequest.removeListener(listener);
};




chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    bool_use = localStorage.getItem("mwd_switch");
    edge_color = localStorage.getItem("color-mode");

    if(bool_use == "0"){
        //alert("no use nope");
    }
    else {
        if (cur_url != changeInfo.url) {
            //cur_url = changeInfo.url;

            chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
                var url = tabs[0].url;

                if(is_blacklist(url)) {
                    new Notification("악성피싱사이트 알림", {
                        icon: 'images/nope_icon_64.png',
                        body: "해당 사이트에 정보를 입력하지 마시기 바랍니다"
                    });
                }

                var domain = extractDomain(url);
                var split_domain = domain.split(".");
                var split_size = split_domain.length;
                if (split_size == 3) {
                    var logindomain = split_domain[split_size - 3] + "." + split_domain[split_size - 2] + "." + split_domain[split_size - 1];
                }
                //3단 도메인 단위

                 if(logindomain == "nid.naver.com" || logindomain == "logins.daum.net"){
                 //alert(url);
                 //chrome.tabs.executeScript({"file": "js/edge_style.js"});
                     new Notification("로그인 알림", {
                         icon: 'images/nope_icon_64.png',
                         body: logindomain + '에 로그인 중입니다'
                     });
                 }

            });
        }
    }
});


// 콜백 함수들
var filter = {urls: ["<all_urls>"]};
var opt_extraInfoSpec = [];
chrome.webRequest.onBeforeRequest.addListener(mycallback, filter, opt_extraInfoSpec);
get_blacklist_urls();

function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

function get_blacklist_urls(){
    $.ajax({
        type: "GET",
        url: "http://noobody.asuscomm.com/nope_db.json",
        data: {"url":url},
        success: function(msg){
            urllist = msg.split('\n');
        }
    });
}

function is_blacklist(url){
    var is_mal = 0;
    for(var i=0; i<urllist.length;i++){
        if(url == urllist[i]){
            is_mal = 1;
        }
    }
    return is_mal;
}