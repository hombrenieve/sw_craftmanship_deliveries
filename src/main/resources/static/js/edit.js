function editList(originalData) {
    //Show window
    emptyWindow();
    let editList = new EditList();
    editList.fillInEditFormTemplate(originalData);
    editList.show();
    EditList.checkForm();
}

function newList() {
    //Show window
    emptyWindow();
    let editList = new EditList();
    editList.show();
}

class EditList {
    constructor() {
        this.form = getTemplate('#listEditFormTemplate');
        $('#listName', this.form).keyup(() => EditList.checkForm());
        $('#addItemButton', this.form).click(() => EditList.addItem());
        $('#saveList', this.form).click(sendList);
        $('#cancelList', this.form).click(function() {
            let id = $('#listId').val();
            if(id) {
                showShoppingList(id)
            } else {
                location.href='/';
            }
        });
    }

   static fillInElement(element, product) {
        $('.listElement', element).val(product.name);
        $('.listCheckbox', element).prop('checked', product.mark);
        $('.elemId', element).val(product.id);
    }

    fillInEditFormTemplate(data) {
        $('#listName', this.form).val(data.name);
        $('#listId', this.form).val(data.id);
        let objThis = this;
        data.products.forEach(function (product) {
            let element = EditList.createEmptyItem();
            EditList.fillInElement(element, product);
            $('#newElementsArea', objThis.form).append(element);
        });
    }

    static createEmptyItem() {
        let newElement = getTemplate('#listEditElementTemplate');
        let item = newElement.firstElementChild;
        $('button', newElement).click(() => EditList.deleteItem(item));
        $('.listElement', newElement).keyup(() => EditList.checkForm());
        return newElement;
    }

    static deleteItem(item) {
        $(item).remove();
        EditList.checkForm();
    }

    static addItem() {
        let newElement = this.createEmptyItem();
        $('#newElementsArea').append(newElement);
        EditList.checkForm();
    }

    show() {
        $('#listArea').append(this.form);
    }


    static isValidForm() {
        if ($('#listName').val() == "") {
            return false;
        }
        let inValid = false;
        $('.listElement').each(function () {
            if ($(this).val() == "") {
                inValid = true;
                return false;
            }
        });
        return !inValid;
    }

    static checkForm() {
        $('#saveList').prop('disabled', !EditList.isValidForm());
    }

    static getJson() {
        let products = [];
        $('.listElement').each(function () {
            if ($(this).val()) {
                let product = {
                    name: $(this).val(),
                    mark: $('.listCheckbox', $(this).parent()).prop('checked')
                };
                let id = $('.elemId', $(this).parent()).val();
                if (id) {
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
}

function sendList() {
    let objList = EditList.getJson();
    let deliveryId = $('#listId').val();
    if(deliveryId) {
        objList.id = deliveryId;
        sendListToBackend(objList, "PUT", "/shoppinglist/"+deliveryId);
    } else {
        sendListToBackend(objList, "POST", "/shoppinglist");
    }
}

function sendListToBackend(newList, method, url) {
    fetch(url, {
        method: method,
        body: JSON.stringify(newList),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then((data) => {
            showShoppingLists();
            showShoppingList(data.id);
        })
        .catch(error => console.error("Sending list", error));
}