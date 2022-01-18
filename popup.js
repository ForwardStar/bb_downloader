function httpRequest() {

    chrome.tabs.getSelected(null, function (tab) {
        var url = tab.url;
        if (url.match(/https:\/\/\w*.\w*.edu.\w*\//g) == null) {
            alert("Not in a blackboard page!");
            return;
        }
        var header = url.match(/https:\/\/\w*.\w*.edu.\w*\//g)[0];
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var files = xhr.responseText.match(/\/bbcswebdav\/pid-\d*-dt-content-rid-\d*\_\d*\/xid-\d*\_\d*/g);
                if (files == null) {
                    alert("No files detected!");
                    return;
                }
                for (var i = 0; i < files.length; i++) {
                    var flag = 0;
                    for (var j = 0; j < i; j++) {
                        if (files[i] == files[j]) {
                            flag = 1;
                            break;
                        }
                    }
                    if (flag == 1) {
                        continue;
                    }
                    const aLabel = document.createElement('a');
                    const aEvent = document.createEvent('MouseEvents');
                    aEvent.initEvent('click', false, false);
                    aLabel.href = header + files[i];
                    aLabel.download = '';
                    aLabel.dispatchEvent(aEvent);
                    for (var j = 0; j < 1e9; j++) {}
                }
            }
        }
        xhr.send();
    });

}

const download = document.getElementById("download");
if (download) {
    download.onclick = function() {
        httpRequest();
    };
}