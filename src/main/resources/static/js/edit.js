function editList(originalData) {
    //Show window
    emptyWindow();
    let editList = new EditList(originalData);
    editList.show();
    EditList.checkForm();
}

function editListById(id, onSuccess) {
    fetch('shoppinglist/' + id)
        .then(response => response.json())
        .then(function (data) {
            editList(data);
            if(onSuccess) onSuccess();
        })
        .catch(error => console.error("Retrieving shopping list", error));
}

function newList() {
    //Show window
    emptyWindow();
    let editList = new EditList();
    editList.show();
}

class EditList {
    constructor(data) {
        this.form = getTemplate('#listEditFormTemplate');
        $('#listName', this.form).keyup(() => EditList.checkForm());
        $('#addItemButton', this.form).click(() => EditList.addItem());
        $('#saveList', this.form).click(sendList);
        if(data) {
            $('#deleteList', this.form).click(() => EditList.deleteList(data.id));
            $('#cancelList', this.form).click(() => editListById(data.id));
            this.fillInEditFormTemplate(data);
        } else {
            $('#deleteList', this.form).prop('disabled', true);
            $('#cancelList', this.form).click(() => location.href='/');
        }
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

    static deleteList(id) {
        if(confirm("¿Seguro que quiere borrar la lista?")) {
            fetch("/shoppinglist/" + id, {
                method: 'DELETE'
            })
                .then(function (response) {
                    if (response.ok) {
                        location.href = '/';
                    }
                })
                .catch(error => console.error("Deleting list " + id, error));
        }
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
    let showMsg = function(selector, timeout) {
        $(selector).removeClass('invisible');
        setTimeout(function() { $(selector).addClass('invisible'); }, timeout);
    }


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
            editListById(data.id, () => showMsg('#success-msg', 3000));
        })
        .catch(error => console.error("Sending list", error));
}