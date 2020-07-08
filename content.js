
$(document).ready(function () {
    let url = document.URL;
    if (url.trim() == "https://sas.tga.gov.au/dashboard/" || $("#WebFormControl_ProgressIndicator > ol > li:nth-child(6)").hasClass("active")) {
        console.log("DASHBOARDS OR LAST STEP")
        chrome.storage.local.set({ "pageAndUrl": true });
    }
    else {
        chrome.storage.local.set({ "pageAndUrl": false });
        console.log("CONTENT SCRIPT");
        function getDefaultDate() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '/' + mm + '/' + yyyy;
            return today;
        }

        var data;
        var i;
        chrome.storage.local.get("newData", function (result) {
            chrome.storage.local.get("i", function (ivalue) {
                j = ivalue.i;
                console.log(j);
                data = result.newData[j];
                console.log(data);
                if (j >= 0) {
                    console.log("DATA IS DEFINED")
                    var check = function (id, val) {
                        var el = document.querySelector(id);
                        if (el != null) {
                            el.checked = val;
                        }
                    }
                    function display(id) {
                        $(id).show();
                    }
                    function noDisplay(id) {
                        $(id).hide();
                    }
                    var setVal = function (id, val) {
                        var el = document.querySelector(id);
                        if (el != null) {
                            el.value = val;
                        }
                    }
                    function validation() {
                        if ($("#ValidationSummaryEntityFormView").css('display') == "block") {
                            chrome.storage.local.set({ "validate": true });
                            console.log("E=VALIDATE SET TO TRUE");
                        }
                        if ($("#ValidationSummaryEntityFormView").css('display') == "none") {
                            $("#NextButton").click();
                            chrome.storage.local.set({ "validate": false });
                        }
                    }
                    function cont() {
                        chrome.storage.local.get(function (e) {
                            console.log(e.continueSubmit);
                            if (e.continueSubmit == true) {
                                console.log("Continue is clicked");
                                $("#NextButton").click();
                            }

                        });

                    }
                    function page2fill() {
                        if (document.querySelector("#tgasas_medicineindicationid_name").value != "" && document.querySelector("#tgasas_medicineproductprofileid_name".value) != "" && document.querySelector("#tgasas_medicineproductpresentationid_name").value != "") {
                            setTimeout(function () {

                                if (document.querySelector("#tgasas_cannabisapplicationrequired_0")) {
                                    display("#tgasas_cannabisapplicationrequired_0");
                                    if (data['notify'] == "Yes")
                                        check("#tgasas_cannabisapplicationrequired_0", true);
                                    else
                                        check("#tgasas_cannabisapplicationrequired_1", true);
                                }
                                if (data['notify'] == "No") {
                                    document.querySelector("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(6) > table > tbody > tr:nth-child(4)").style.display = "none";
                                    document.querySelector("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(6) > table > tbody > tr:nth-child(3)").style.display = "table-row";
                                }
                                if (document.querySelector("#tgasas_cannabisstate")) {
                                    if (data['notify'] == "Yes") {
                                        document.querySelector("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(6) > table > tbody > tr:nth-child(4)").style.display = "table-row";
                                        document.querySelector("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(6) > table > tbody > tr:nth-child(3)").style.display = "none";
                                        switch (data['state']) {
                                            case "ACT":
                                                setVal("#tgasas_cannabisstate", "288580000")
                                                break;
                                            case "NSW":
                                                setVal("#tgasas_cannabisstate", "288580001")
                                                break;
                                            case "NT":
                                                setVal("#tgasas_cannabisstate", "288580002")
                                                break;
                                            case "QLD":
                                                setVal("#tgasas_cannabisstate", "288580003")
                                                break;
                                            case "VIC":
                                                setVal("#tgasas_cannabisstate", "288580005")
                                                break;
                                            case "WA":
                                                setVal("#tgasas_cannabisstate", "288580006")
                                                break;
                                            case "SA":
                                                setVal("#tgasas_cannabisstate", "288580007")
                                                break;
                                            default:
                                                setVal("#tgasas_cannabisstate", "")
                                        }
                                    }

                                }
                                if (document.querySelector("#tgasas_doespatientmeetsasacondition_0")) {
                                    // display("#EntityFormView > div.tab.clearfix > div > div > fieldset: nth - child(7) > table > tbody > tr: nth - child(2) > td.clearfix.cell.picklist - cell > div.control", true)
                                    switch (data["category"]) {
                                        case "Yes":
                                            check("#tgasas_doespatientmeetsasacondition_0", true);
                                            console.log("cagegory yes");
                                            break;
                                        case "No":
                                            check("#tgasas_doespatientmeetsasacondition_1", true);
                                            console.log("cagegory no");
                                            break;
                                        default:

                                    }
                                    validation();
                                }
                            }, 2000)

                            console.log("exit");
                        }
                    }


                    let page1 = function () {
                        switch (data["prescriber"]) {
                            case "Yes":
                                console.log('Yes');
                                setTimeout(function () {
                                    // check('#tgasas_isusertheprescriber_0', true);
                                    $("#tgasas_isusertheprescriber_0").trigger("click");
                                    display("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(4)");
                                    document.querySelector("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(4)").style.cssText = "block";
                                    display("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(5)");
                                    document.querySelector("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(5)").style.cssText = "block";
                                    validation();
                                }, 20);
                                break;
                            case "No":
                                console.log('No');
                                $("#tgasas_isusertheprescriber_1").trigger("click");
                                // check('#tgasas_isusertheprescriber_1', true);
                                setTimeout(function () {
                                    document.querySelector("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(3) > table > tbody > tr:nth-child(2)").style.display = "table-row";
                                    validation();
                                }, 20);
                                break;

                            default: console.log("PAGE 1 DEFAULT");
                        }
                    }
                    let page2 = function () {
                        switch (data['therapeutic']) {
                            case 'Medicine':
                                console.log('Medicine');
                                check('#tgasas_therapeuticgoodtype_0', true);
                                setTimeout(function () {
                                    console.log("TIMEOUT 1");
                                    setVal("#tgasas_medicineproductprofileid_lookupmodal > div > section > div > div > div.modal-body > div.entity-grid > div.view-toolbar.grid-actions.clearfix > div > div > input", data['ingredient']);
                                    document.querySelector("#tgasas_medicineproductprofileid_lookupmodal > div > section > div > div > div.modal-body > div.entity-grid > div.view-toolbar.grid-actions.clearfix > div > div > div > button").click();
                                    let interval1 = setInterval(function () {
                                        document.querySelector("#tgasas_medicineproductprofileid_lookupmodal > div > section > div > div > div.modal-footer > button.primary.btn.btn-primary").click();
                                        if (document.querySelector("#tgasas_medicineproductprofileid_name").value != "") {
                                            clearInterval(interval1);
                                            setTimeout(function () {
                                                console.log("TIMEOUT 2");
                                                setVal("#tgasas_medicineproductpresentationid_lookupmodal > div > section > div > div > div.modal-body > div.entity-grid > div.view-toolbar.grid-actions.clearfix > div > div > input", data['dosage_form']);
                                                document.querySelector("#tgasas_medicineproductpresentationid_lookupmodal > div > section > div > div > div.modal-body > div.entity-grid > div.view-toolbar.grid-actions.clearfix > div > div > div > button").click();
                                                let interval2 = setInterval(function () {
                                                    document.querySelector("#tgasas_medicineproductpresentationid_lookupmodal > div > section > div > div > div.modal-footer > button.primary.btn.btn-primary").click();

                                                    if (document.querySelector("#tgasas_medicineproductpresentationid_name").value != "") {
                                                        clearInterval(interval2);
                                                        setTimeout(function () {
                                                            console.log("TIMEOUT 3");
                                                            setVal("#tgasas_medicineindicationid_lookupmodal > div > section > div > div > div.modal-body > div.entity-grid > div.view-toolbar.grid-actions.clearfix > div > div > input", data['indication']);
                                                            document.querySelector("#tgasas_medicineindicationid_lookupmodal > div > section > div > div > div.modal-body > div.entity-grid > div.view-toolbar.grid-actions.clearfix > div > div > div > button").click();
                                                            let interval3 = setInterval(function () {
                                                                document.querySelector("#tgasas_medicineindicationid_lookupmodal > div > section > div > div > div.modal-footer > button.primary.btn.btn-primary").click();
                                                                if (document.querySelector("#tgasas_medicineindicationid_name").value != "") {
                                                                    clearInterval(interval3);
                                                                    setTimeout(function () {
                                                                        display("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(3)");
                                                                        noDisplay('#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(4)');
                                                                        noDisplay("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(5)");
                                                                        page2fill();
                                                                    }, 20);
                                                                }
                                                            }, 20);
                                                        }, 20);
                                                    }
                                                }, 20);
                                            }, 20);
                                        }
                                    }, 20);
                                }, 20);



                                break;
                            case 'Biological':
                                console.log('Biological');
                                check('#tgasas_therapeuticgoodtype_2', true);
                                setTimeout(function () {
                                    display("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(3)");
                                    noDisplay('#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(4)');
                                    noDisplay("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(5)");
                                    validation();
                                }, 20);
                                break;
                            case 'Medical Device':
                                console.log('Medical Device');
                                check('#tgasas_therapeuticgoodtype_3', true);
                                setTimeout(function () {
                                    noDisplay("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(3)");
                                    noDisplay('#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(4)');
                                    display("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(5)");
                                    validation();
                                }, 20);
                                break;
                            default: console.log("PAGE 2 DEFAULT");
                        }
                    }
                    let page3 = function () {
                        if (document.querySelector("#tgasas_sponsorsupplier")) {
                            setVal("#tgasas_sponsorsupplier", data['sponsor'])
                        }
                        switch (data['duration_unit']) {
                            case 'Minute(s)':
                                setVal('#tgasas_durationofsupplyunit', '969230000')
                                break;
                            case 'Hour(s)':
                                setVal('#tgasas_durationofsupplyunit', '969230001')
                                break;
                            case 'Day(s)':
                                setVal('#tgasas_durationofsupplyunit', '969230002')
                                break;
                            case 'Week(s)':
                                setVal('#tgasas_durationofsupplyunit', '969230003')
                                break;
                            case 'Month(s)':
                                setVal('#tgasas_durationofsupplyunit', '969230004')
                                break;
                            case 'Year(s)':
                                setVal('#tgasas_durationofsupplyunit', '969230005')
                                break;
                        }
                        setVal('#tgasas_tradename', data['trade_name']);
                        setVal('#tgasas_intendeddateofsupply', data['supply_date']);
                        setVal('#tgasas_dosageregimen', data['dosage_frequency']);
                        setVal('#tgasas_durationofsupply', data['duration']);

                        var fdate = getDefaultDate(); // pass db date
                        console.log(fdate);
                        if (document.querySelector("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(6) > table > tbody > tr:nth-child(11) > td.clearfix.cell.datetime.form-control-cell > div.control > div > input")) {
                            var event = new Event('input', {
                                'bubbles': true,
                                'cancelable': true
                            });

                            document.querySelector("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(6) > table > tbody > tr:nth-child(11) > td.clearfix.cell.datetime.form-control-cell > div.control > div > input").value = fdate;
                            document.querySelector("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(6) > table > tbody > tr:nth-child(11) > td.clearfix.cell.datetime.form-control-cell > div.control > div > input").dispatchEvent(event);
                        }
                        validation();
                    }
                    let page4 = function () {
                        display("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(3)", true);
                        display("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(3)", true);
                        display("#EntityFormView > div.tab.clearfix > div > div > fieldset:nth-child(3)", true);
                        setVal('#tgasas_diagnosis', data['diagnosis']);
                        setVal('#tgasas_clinicaljustification', data['clinical_justification']);
                        setVal('#tgasas_intendedmonitoring', data['intended_monitoring']);
                        validation();
                    }
                    if ($("#WebFormControl_ProgressIndicator > ol > li:nth-child(1)").hasClass("active")) {
                        console.log("Page 1");
                        page1();

                    }
                    if ($("#WebFormControl_ProgressIndicator > ol > li:nth-child(2)").hasClass("active")) {
                        console.log("Page 2");
                        page2();

                    }

                    if ($("#WebFormControl_ProgressIndicator > ol > li:nth-child(3)").hasClass("active")) {
                        console.log("Page 3");
                        page3();

                    }

                    if ($("#WebFormControl_ProgressIndicator > ol > li:nth-child(4)").hasClass("active")) {
                        console.log("Page 4");
                        page4();

                    }
                }
            });
        });
    }

});