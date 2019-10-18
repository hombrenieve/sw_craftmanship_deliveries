function addItem() {
    var list = document.getElementById('itemList');
    list.appendChild(createItem());
}

function createNewElement(type, classValue) {
    var item = document.createElement(type);
    item.setAttribute('class', classValue);
    return item;
}

function createItem() {
    var root = createNewElement('li', 'list-item');
    var input = createNewElement('input', 'item-element');
    input.setAttribute('name', 'item');
    root.appendChild(input);
    return root;
}

function setError(text) {
    var error = document.getElementById('error');
    if(!error) {
        var root = createNewElement('div', 'error');
        var paragraph = document.createElement("p");
        paragraph.setAttribute('id', 'error');
        root.appendChild(paragraph);
        document.getElementsByTagName('body')[0].appendChild(root);
        error = paragraph;
    }
    error.innerHTML = text;
}

function validateForm() {
    if(document.getElementById('deliveryName').value === '') {
        setError('Pedido sin nombre!!');
        return false;
    }
    var items = document.getElementsByClassName('item-element');
    if(items.length === 0) {
        setError("Debes añadir productos!!!");
        return false;
    }
    for(var i = 0; i < items.length; i++) {
        if(items[i].value === '') {
            setError('Producto sin nombre!!');
            return false;
        }
    }
}

function completeForm() {
    var form = document.getElementById('newDeliveryForm');
    var list = document.getElementsByClassName('list-item');
    for(var i = 0; i < list.length; i++) {
        var input = document.createElement('input');
        input.setAttribute('name', 'item'+i);
        input.setAttribute('value', list[i].innerHTML);
        input.setAttribute('type', 'hidden');
        form.appendChild(input);
    }
}