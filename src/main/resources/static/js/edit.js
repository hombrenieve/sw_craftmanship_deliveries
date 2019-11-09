function newList(originalData) {
    //Show window
    emptyWindow();
    var newForm = getTemplate('#listEditFormTemplate');
    newForm.querySelector('#listName').addEventListener('keyup', checkForm);
    if(originalData) {
        fillInEditFormTemplate(newForm, originalData);
    }
    $('#listArea').append(newForm);
    checkForm();
}

function fillInElement(elementForm, product) {
    $('.listElement', elementForm).val(product.name);
    $('.listCheckbox', elementForm).prop('checked', product.mark);
    $('.elemId', elementForm).val(product.id);
}

function fillInEditFormTemplate(form, data) {
    console.log('Fill Template with: '+JSON.stringify(data));
    $('#listName', form).val(data.name);
    $('#listId', form).val(data.id);

    data.products.forEach(function(product) {
        var element = createEmptyItem();
        fillInElement(element, product);
        $('#newElementsArea', form).append(element);
    });
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

function createEmptyItem() {
    var newElement = getTemplate('#listEditElementTemplate');
    var item = newElement.firstElementChild;
    newElement.querySelector('button').addEventListener("click", function() {
        deleteItem(item);
    });
    newElement.querySelector('.listElement').addEventListener('keyup', checkForm);
    return newElement;
}

function addItem() {
    var newElement = createEmptyItem();
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
                mark: $('.listCheckbox', $(this).parent()).prop('checked')
            };
            var id = $('.elemId', $(this).parent()).val();
            console.log(id);
            if(id) {
                product.id = id;
            }
            products.push(product);
        }
    });
    var delivery = { 'name': $('#listName').val(),
        "products": products
    };
    var deliveryId = $('#listId').val();
    if(deliveryId) {
        delivery.id = deliveryId;
    }
    console.log("To send: "+JSON.stringify(delivery));

    if(deliveryId) {
        $.ajax({
            type: "PUT",
            contentType: "application/json",
            url: "/shoppinglist/"+delivery.id,
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
    } else {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/shoppinglist",
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
}