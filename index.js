var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var empDBName = "EMP-DB";
var empRelationName= "EmpData";
var connToken = "909365711-31948846965960543 | 90934225";
$("#empid").focus ();

function saveRecNo2LS(jsonabj) {
var lvData = JSON.parse(jsonObj.data);
localStorage.setItem("recno", ivData.rec_no);
}

function getEmpIdAsJsonobj() {
var empid= $("#empid").val();
var jsonStr = {
id: empid
};
return JSON.stringify (jsonStr);
}
function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var data = JSON.parse(jsonobj.data).record;
    $("#empname").val(data.name);
    $('#empsal').val(data.salary);
    $("#hra").val(data.hra);
    $("#da").val(data.da);
    $("#deduct").val(data.deduction);
}
function resetForm() {
    $("#empid").val('');
    $("#empname").val("");
    $("#empsal").val("");
    $("#hra").val("");
    $("#da").val("");
    $("#deduct").val("");
    $("#empid").prop ("disabled", false);
    $("#save").prop("disabled", true);
    $("#change" ).prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#empid").focus();
}
    function validateData(){
    var empid, empname, empsal, hra, da, deduct;
    roll_no= $("#roll_no").val();
    full_name = $("#full_name").val();
    classs = $("#class").val();
    birth_date= $("#birth").val();
    da = $("#da").val();
    deduct = $("#deduct").val();
    if (roll_no===''){
        alert("Roll ID missing");
        $("#roll_no").focus();
        return "";
        }
        if (full_name ==='' ) {
        alert("Your Full name is missing");
        $("#full_name").focus();
        return "";
        }
        if (classs==="") {
        alert("class is missing");
        $("#class").focus();
        return "";
        }
        if (birth_date==="") {
        alert("Your birth date is missing");
        $("#birth_date").focus();
        return "";
        }
        if (address === "") {
            alert("Address is missing");
            $("#address").focus();
            return;
            }
            if (enrollment_date=== "") {
            alert( "Enrollment date is missing");
            $("#enrollment_date").focus();
            return "";
            }
            var jsonStrobj = {
            id: empid,
            name: empname,
            salary: empsal,
            hra: hra,
            da: da,
            deduction: deduct
            };
            return JSON.stringify (jsonStrobj);
        }
function changeData() {
    $("#change).prop( diabled", true);
                jsonChgvalidateData();
                var updateRequest = createLPDATERecordRequest (connToken, jsonchg, empDBName, empRelationName, localStorage.getItem('recno'));
                jQuery.ajaxSetup({async: false});
                var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
                jQuery.ajaxSetup ({async: true});
                console.log(resJsonobj);
                resetForm();
                $('#empid').focus();
}
function getEmp() {
    var empIdJsonobj = getEmpIdAsJsonobj ();
    var getRequest = createGET_BY_KEYRequest(connToken, empDBName, empRelationName, empIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonobj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIPL);
    jQuery.ajaxSetup({async: true});
    if (resJsonobj.status === 400) {
    $("#save").prop("disabled", false);
    $("#reset").prop ("disabled", false);
    $("#empname").focus();
    } 
    else if (resJsonobj.status === 200) {
    $("#empid").prop ("disabled", true);
    fillData(resJsonObj);
    $("#change").prop ("disabled", false);
    $("#reset").prop("disabled", false);
    $("#empname").focus();
    }
}