/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */

$(document).ready(function() {
   HideFooter();
});


function LoginButtonClick()
{
    var customerID = document.getElementById('tCustomerID').value;
    var loginID = document.getElementById('tLoginID').value;
    var password = document.getElementById('tPassword').value;
    
    var loginValid = false;
    var loginResult = 'Invalid password.  Try 5150 or 2112.';
    var input = 'CustomerID (' + customerID + ') loginID (' + loginID + ') password (' + password + ')';
    
    if (password == '5150' || password == '2112')
        loginValid = true;
    
    if (loginValid) 
    { 
        ShowFooter();
        document.getElementById('LoginMessage').textContent = "";
        
        // redirect 'em
        $.afui.loadContent("#approvalTab",false,false,"Down");
        // clear back button
        $.afui.clearHistory();
        AddApprovalElements(4);
    }
    else
        document.getElementById('LoginMessage').textContent = loginResult;
}


function HideFooter()
{
    SetElementVisibility(document.getElementById("footerDiv"), "none");
}
function ShowFooter()
{
    SetElementVisibility(document.getElementById("footerDiv"), "block");
}
function SetElementVisibility(pageElement, value)
{
    pageElement.style.display = value;
}


function AddApprovalElements(count)
{
    for (var approvalID = 1; approvalID < (count + 1); approvalID++)
        AppendApprovalElements(approvalID);
}
function AppendApprovalElements(approvalID)
{
    $("#Approvals").append(GetApprovalListItem(approvalID));
    $("#ApprovalDetailPanels").append(GetApprovalDetailPanel(approvalID));
}
function GetApprovalListItem(approvalID)
{
    var elementID = "approvalItem" + approvalID;
    var title = "Approval " + approvalID;
    var approvalListItem = '<li><a href="#' + elementID + '">' + title + '</a></li>';
    
    return approvalListItem;
}
function GetApprovalDetailPanel(approvalID)
{
    var elementID = 'approvalItem' + approvalID;
    var title = 'Approval ' + approvalID;
    var selectElementSuffix = 'select' + approvalID;
    var noteElementSuffix = 'note' + approvalID;
    var approvalDetailPanel = '<div class="panel" data-title="' + title + '" id="' + elementID + '">';
    
    //approvalDetailPanel += '<div name="standardeditmode">Standard Edit Mode: ' + title + ' Details<br><br>';
    approvalDetailPanel += '<div>Standard Edit Mode: ' + title + ' Details<br><br>';
    approvalDetailPanel += GetSelectElement('standard' + selectElementSuffix, 0, approvalID);
    approvalDetailPanel += '<br>' + GetTextElement('standard' + noteElementSuffix, 200) + '</div>';
    
    //approvalDetailPanel += '<div name="fulleditmode">Full Edit Mode: ' + title + ' Details<br><br>';
    //approvalDetailPanel += GetSelectElement('full' + selectElementSuffix, 0, approvalID);
    //approvalDetailPanel += '<br>' + GetTextElement('full' + noteElementSuffix, 200) + '</div>';

    approvalDetailPanel += '</div>';
    
    return approvalDetailPanel;
}
















function GetSelectElement(elementName, minValue, maxValue)
{
    var selectElement = '<select style="width:50px;" name="' + elementName + '">';
    
    for (var selectValue = minValue; selectValue < (maxValue + 1); selectValue++)
        selectElement += '<option value="' + selectValue + '">' + selectValue + '</option>';
    
    selectElement += '</select>';
    return selectElement;    
}
function GetTextElement(elementName, width)
{
    return '<input type="text" name="' + elementName + '" style="width:' + width + 'px;">';
}
