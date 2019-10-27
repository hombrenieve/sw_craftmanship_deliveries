function newList(originalData) {
    //Show window
    emptyWindow();
    var newForm = getTemplate('#listEditFormTemplate');
    newForm.addEventListener('changed', checkForm);
    if(originalData) {
        fillInEditFormTemplate(newForm, originalData);
    }
    $('#listArea').append(newForm);
}

function fillInEditFormTemplate(form, data) {
    console.log('Fill Template');
}

function checkForm(event) {
    console.log("Checking form due to element: "+event.target);
}

function addItem() {
    var newElement = getTemplate('#listEditElementTemplate');
    var item = newElement.firstElementChild;
    newElement.querySelector('button').addEventListener("click", function() {
        deleteItem(item);
    });
    $('#newElementsArea').append(newElement);
}

function deleteItem(item) {
    $(item).remove();
}


//........
function send() {
    var products = [];
    $('.list-item').each(function() {
        if($(this).val()) {
            products.push($(this).val());
        }
    });
    var delivery = { 'name': $('#deliveryName').val(),
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