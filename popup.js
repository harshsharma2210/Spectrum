let p = 0;
var TemplateListdata = []

try {
    setTimeout(() => {
        document.getElementById("searchBox").addEventListener("keyup", function () {
            var tempArray = []
            var searchQuery = document.getElementById("searchBox").value;
            console.log(searchQuery)
            if (searchQuery != "") {
                for (var item of TemplateListdata) {
                    if (item.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1) {
                        tempArray.push(item)
                    }
                }
                templateView(tempArray)
            }
            else {
                templateView(TemplateListdata)
            }

        })
    })

}
catch{

}

function templateView(data) {

    var templateList = ``

    for (var template of data) {
        templateList += `<div class="card mb-1 mt-1 p-1 pb-0 pt-0">
    <div class="row">
    <div class="col-10 ">
    <p class="text-small m-0">
    ${template.title}
    </p>
    </div>
    <div class="col-2 text-right mb-0 d-flex justify-content-end align-self-center">
    <span style="cursor:pointer;" ><img id=${template.id} src="/lib/images/play-button.svg"></span> 
    </div>
    </div>
    
    </div>`
    }
    document.getElementById("templateList").innerHTML = ""
    document.getElementById("templateList").innerHTML = templateList
    document.querySelector("#footer").style.display = "block";
    addEventsToPlay();
}

function writeToForm(eventData) {
    document.querySelector("#modalBody").innerHTML = "<p>The form automation process is about to start. Do you want to continue?</p>";
    $("#myModal").modal('show');
    document.querySelector("#myModal > div > div > div.modal-footer > button.btn.btn-outline-success.btn-block").onclick = function () {
        $("#running").show();
        chrome.storage.local.set({ "x": 2 });
        console.log(eventData.srcElement.id)
        chrome.storage.local.set({ "i": eventData.srcElement.id });
        for (var item of TemplateListdata) {
            if (item.id == eventData.srcElement.id) {
                chrome.storage.local.set({ currentSelectedTemplate: item })
            }
            chrome.storage.local.set({ "titleActive": item.title });
            item.id == eventData.srcElement.id ? ($("#noTemplate").hide(),
                $("body > div.row.m-1 > div.col-12.ml-0.pl-2.mr-2").show(),
                chrome.storage.local.get(function (e) {
                    document.querySelector("#newSelectedTemplate").innerHTML = "<strong>" + e.titleActive + "</strong>";
                }),
                document.getElementById("selectedTemplate").style.color = "black") : console.log(eventData.srcElement.id)
        }
        chrome.runtime.sendMessage({ 'myPopupIsOpen': true });

    }
}

function addEventsToPlay() {
    var links = document.getElementById('templateList').getElementsByTagName('span');
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        link.onclick = writeToForm.bind(link.id);
    }
}
function changeId(item) {
    item.id = p++;

}
function resume() {
    $("#running").hide();
    $("#pause").show();
}
function stopScript() {
    chrome.storage.local.set({ "i": -1 }, function () { });
    chrome.storage.local.set({ "x": 1 }, function () { console.log("X VALUES CHANGED TO 1") });
    window.close();
}
function modalStop() {
    document.querySelector("#modalBody").innerHTML = "<p>Are you sure you want to stop automation process?</p>";
    $("#myModal").modal();
    document.querySelector("#myModal > div > div > div.modal-footer > button.btn.btn-outline-success.btn-block").addEventListener('click', stopScript);
}


$.getJSON('https://www.cloudcorn.com/pr-spectrum/api/templates#', function (data) {

    firstElementId = data[0].id;
    data.forEach(changeId);
    console.log(data);
    chrome.storage.local.set({ "templateListData": data }, function () { });

});
chrome.storage.local.get("templateListData", function (e) {
    if (e.templateListData != undefined) {
        console.log("comes inside")
        TemplateListdata = e.templateListData;
        console.log(TemplateListdata)
        templateView(TemplateListdata)
        chrome.storage.local.set({ "newData": TemplateListdata }, function () { });
    }
    else {
        console.log("comes inside else")
        fetch("https://www.cloudcorn.com/pr-spectrum/api/templates").then(response => response.json()).then(data => {
            chrome.storage.local.set({ templateListData: data })
            TemplateListdata = data;
            templateView(data)
        })
    }
});

setTimeout(function () {
   

    // CLOSE BUTTON
    let button = document.querySelector("body > div.row.m-1 > div.col-12.text-center > button");
    if (button) {
        button.addEventListener('click', function () {
            window.close();
        });
    }

    // CONTINUE BUTTON
    if ($("#continue")) {
        document.querySelector("#continue").addEventListener('click', function () {
            console.log("Continue Is Clicked");
            chrome.runtime.sendMessage({ 'clickSubmit': true });
        });
    }
    // TO HIDE ACTIVE TEMPLATE AND SHOW
    chrome.storage.local.get(function (e) {
        console.log("e.x= " + e.x);
        if (e.x == 1) {
            $("#noTemplate").show();
            $("body > div.row.m-1 > div.col-12.ml-0.pl-2.mr-2").hide();
            $("#running").hide();
            $("#pause").hide();
        }
        if (e.x == 2) {
            $("#noTemplate").hide();
            $("body > div.row.m-1 > div.col-12.ml-0.pl-2.mr-2").show();
            $("#running").show();
            $("#pause").hide();
        }
        chrome.storage.local.get(function (e) {
            document.querySelector("#newSelectedTemplate").innerHTML = "<strong>" + e.titleActive + "</strong>";
        });
    });
    // STOP BUTTON
    if ($("#stopButton")) {
        document.getElementById("stopButton").addEventListener("click", modalStop);
    }

    // //VALIDATION
    // chrome.storage.local.get(function (e) {
    //     console.log("E.VAlidate=" + e.validate)
    //     if (e.validate == true) {
    //         resume();
    //     }
    // });


    // FOR PAGE 5 AND URL
    chrome.storage.local.get(function(e){
        if(e.pageAndUrl){
            stopScript();
            console.log("Sctipt Stoppped");
        }
    });

}, 20);