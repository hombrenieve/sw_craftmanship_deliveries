function addItem() {
    var text = document.getElementById('item');
    if(text.value) {
        document.getElementById('itemList').innerHTML += '<li class="list-item">'+text.value+'</li>';
        text.value = '';
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