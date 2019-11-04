function newList(originalData) {
    //Show window
    emptyWindow();
    var newForm = getTemplate('#listEditFormTemplate');
    newForm.querySelector('#listName').addEventListener('keyup', checkForm);
    if(originalData) {
        fillInEditFormTemplate(newForm, originalData);
    }
    $('#listArea').append(newForm);
}

function fillInEditFormTemplate(form, data) {
    console.log('Fill Template');
}

function isValidForm() {
    if($('#listName').val() == "") {
        return false;
    }
    var inValid = false;
    $('.listElement').each(function() {
        if($(this).val() == "") {
            inValid = true;
            return false;
        }
    });
    return !inValid;
}

function checkForm() {
    document.getElementById('saveList').disabled = !isValidForm();
}

function addItem() {
    var newElement = getTemplate('#listEditElementTemplate');
    var item = newElement.firstElementChild;
    newElement.querySelector('button').addEventListener("click", function() {
        deleteItem(item);
    });
    newElement.querySelector('.listElement').addEventListener('keyup', checkForm);
    $('#newElementsArea').append(newElement);
    checkForm();

}

function deleteItem(item) {
    $(item).remove();
}

function sendList() {
    var products = [];
    $('.listElement').each(function() {
        if($(this).val()) {
            var product = {
                name: $(this).val(),
                mark: $('.listCheckbox', $(this).parent())[0].checked
            };
            products.push(product);
        }
    });
    var delivery = { 'name': $('#listName').val(),
        "products": products
    };
    console.log("To send: "+JSON.stringify(delivery));

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/deliveries",
        data: JSON.stringify(delivery),
        dataType: 'json',
        timeout: 600000,
        success: function () {
            console.log("DONE");
            location.href = '/';
        },
        error: function (e) {
            console.log("ERROR: ", e);
            display(e);
        }
    });
}