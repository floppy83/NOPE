function setLocalStorageValueByKey(a, b) {
    localStorage[a] = b
}

function getLocalStorageValueByKey(a) {
    return localStorage[a]
}

function optionsContentControl() {
    try {
        var a = document.getElementById("mwd_switch");
        1 == getLocalStorageValueByKey("mwd_switch") ? a.checked = !0 : a.checked = !1;
        var b = document.getElementsById("color-mode");
		//
			for(var i=0;i<b.length;i++){
			if(b[i].checked){
				b[i].checked = true; // marking the required radio as checked
				setLocalStorageValueByKey("color-mode", b[i].value);
			}
			}
			
    } catch (c) {}
}

function switchesHandler(a) {
    var b = a.srcElement.checked;
    switch (a.srcElement.id) {
        case "mwd_switch":
            b ? setLocalStorageValueByKey("mwd_switch", 1) : setLocalStorageValueByKey("mwd_switch", 0);
            break;
    }
}

function switchesHandler2(a) {
    var b = a.srcElement.value;
	if(b == 0) { setLocalStorageValueByKey("color-mode", "#008000"); }
	else if(b == 1) { setLocalStorageValueByKey("color-mode", "#0000ff"); }
	else if(b == 2) { setLocalStorageValueByKey("color-mode", "#000000"); }
	else if(b == 3) { setLocalStorageValueByKey("color-mode", "#ff0000"); }
	else { setLocalStorageValueByKey("color-mode", "#008000"); }
		
	
//    switch (a.srcElement.name) {
//		case "color-mode":
//            b ? setLocalStorageValueByKey("color-mode", b) : setLocalStorageValueByKey("color-mode", 1);
//            break;
//    }

}


function setPageEvents() {
    /*
    document.getElementById("sendreq_button").addEventListener("click", function() {
        setLocalStorageValueByKey("sendreq_trigger", 1)
    });
    */
    document.getElementById("mwd_switch").addEventListener("change", switchesHandler);
	document.getElementById("color-mode-0").addEventListener("change", switchesHandler2);
		document.getElementById("color-mode-1").addEventListener("change", switchesHandler2);
			document.getElementById("color-mode-2").addEventListener("change", switchesHandler2);
				document.getElementById("color-mode-3").addEventListener("change", switchesHandler2);
//    document.getElementById("spd_switch").addEventListener("change", switchesHandler)
}

window.onload = function() {
    optionsContentControl();
    setPageEvents()
};
