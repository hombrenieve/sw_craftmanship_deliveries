function editList(originalData) {
    //Show window
    emptyWindow();
    var editList = new EditList();
    editList.fillInEditFormTemplate(originalData);
    editList.show();
    EditList.checkForm();
}

function newList() {
    //Show window
    emptyWindow();
    var editList = new EditList();
    editList.show();
}

function EditList() {
    this.form = getTemplate('#listEditFormTemplate');
    this.form.querySelector('#listName').addEventListener('keyup', function() {
        EditList.checkForm();
    });
    this.form.querySelector('#addItemButton').addEventListener('click', function() {
        EditList.addItem()
    });
}

EditList.fillInElement = function(element, product) {
    $('.listElement', element).val(product.name);
    $('.listCheckbox', element).prop('checked', product.mark);
    $('.elemId', element).val(product.id);
}

EditList.prototype.fillInEditFormTemplate = function(data) {
    console.log('Fill Template with: '+JSON.stringify(data));
    $('#listName', this.form).val(data.name);
    $('#listId', this.form).val(data.id);
    var objThis = this;
    data.products.forEach(function(product) {
        var element = EditList.createEmptyItem();
        EditList.fillInElement(element, product);
        $('#newElementsArea', objThis.form).append(element);
    });
}

EditList.createEmptyItem = function() {
    var newElement = getTemplate('#listEditElementTemplate');
    var item = newElement.firstElementChild;
    newElement.querySelector('button').addEventListener('click', function() {
        EditList.deleteItem(item);
    });
    newElement.querySelector('.listElement').addEventListener('keyup', function() {
        EditList.checkForm();
    });
    return newElement;
}

EditList.deleteItem = function(item) {
    $(item).remove();
    EditList.checkForm();
}

EditList.addItem = function() {
    var newElement = this.createEmptyItem();
    $('#newElementsArea').append(newElement);
    EditList.checkForm();
}

EditList.prototype.show = function() {
    $('#listArea').append(this.form);
}


EditList.isValidForm = function(){
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

EditList.checkForm = function() {
    $('#saveList').prop('disabled', !EditList.isValidForm());
}

EditList.getJson = function() {
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
    return {
        'name': $('#listName').val(),
        'products': products
    };
}

function sendList() {
    var objList = EditList.getJson();
    var deliveryId = $('#listId').val();
    if(deliveryId) {
        objList.id = deliveryId;
        sendListToBackend(objList, "PUT", "/shoppinglist/"+deliveryId);
    } else {
        sendListToBackend(objList, "POST", "/shoppinglist");
    }
}

function sendListToBackend(newList, method, url) {
    $.ajax({
        type: method,
        contentType: "application/json",
        url: url,
        data: JSON.stringify(newList),
        dataType: 'json',
        timeout: 600000,
        success: function (data) {
            console.log("DONE");
            showShoppingLists();
            showShoppingList(data.id);
        },
        error: function (e) {
            console.log("ERROR: ", e);
            display(e);
        }
    });
}