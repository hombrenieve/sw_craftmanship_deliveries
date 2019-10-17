function addItem() {
    var list = document.getElementById('itemList');
    list.appendChild(createItem());
}

function createNewElement(type, classValue, name) {
    var item = document.createElement(type);
    item.setAttribute('class', classValue);
    if(name) {
        item.setAttribute('name', name);
    }
    return item;
}

function createItem() {
    var root = createNewElement('li', 'list-item');
    var input = createNewElement('input', 'item-element', 'item');
    root.appendChild(input);
    return root;
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