function editList(originalData) {
    //Show window
    emptyWindow();
    let editList = new EditList(originalData);
    editList.show();
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
        let template = getTemplate('#listEditFormTemplate');
        this.form = template.firstElementChild;
        let objThis = this;
        $('#listName', this.form).keyup(() => objThis.checkForm());
        $('#addItemButton', this.form).click(() => objThis.addItem());
        $('#saveList', this.form).click(sendList);
        if(data) {
            $('#deleteList', this.form).click(() => EditList.deleteList(data.id));
            $('#cancelList', this.form).click(() => editListById(data.id));
            this.fillInEditFormTemplate(data);
        } else {
            $('#deleteList', this.form).prop('disabled', true);
            $('#cancelList', this.form).click(() => location.href='/');
            this.addItem();
        }
    }

   static fillInElement(element, product) {
        $('.listElement', element).val(product.name);
        $('.listCheckbox', element).prop('checked', product.mark);
        EditList.checkedItem(element);
        $('.elemId', element).val(product.id);
    }

    fillInEditFormTemplate(data) {
        $('#listName', this.form).val(data.name);
        $('#listId', this.form).val(data.id);
        let objThis = this;
        data.products.forEach(function (product) {
            let element = objThis.createEmptyItem();
            EditList.fillInElement(element, product);
            $('#newElementsArea', objThis.form).append(element);
        });
    }

    createEmptyItem() {
        let newElement = getTemplate('#listEditElementTemplate');
        let item = newElement.firstElementChild;
        let objThis = this;
        $('button', newElement).click(() => objThis.deleteItem(item));
        $('.listCheckbox', newElement).change(() => EditList.checkedItem(item));
        $('.listElement', newElement).keyup(() => objThis.checkForm());
        return newElement;
    }

    static checkedItem(item) {
        if($(".listCheckbox", item).prop('checked')) {
            $(".listElement", item).css("text-decoration", "line-through");
        } else {
            $(".listElement", item).css("text-decoration", "none");
        }
    }

    deleteItem(item) {
        $(item).remove();
        this.checkForm();
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

    addItem() {
        let newElement = this.createEmptyItem();
        $('#newElementsArea', this.form).append(newElement);
        this.checkForm();
    }

    show() {
        $('#listArea').append(this.form);
        this.checkForm();
    }


    isValidForm() {
        if ($('#listName', this.form).val() == "") {
            return false;
        }
        let inValid = false;
        $('.listElement', this.form).each(function () {
            if ($(this).val() == "") {
                inValid = true;
                return false;
            }
        });
        return !inValid;
    }

    checkForm() {
        $('#saveList', this.form).prop('disabled', !this.isValidForm());
        this.checkElements();
    }

    checkElements() {
        let elements = $('.listElementGroup', this.form);
        if(elements.length == 1) {
            $('button', elements).addClass('invisible');
        } else if(elements.length == 2) {
            $('button', elements[0]).removeClass('invisible');
        }
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