function showShoppingList(id) {
    console.log("Will show list with id: "+id);
    //take data
    $.getJSON('deliveries/'+id, function (data) {
        //Remove welcome screen
        $('#welcome').empty();
        //Remove elements in section
        $('#listArea').empty();
        showList(data);
    });
}

function createElement(product) {
    var myElement = getTemplate('#listElementShowFormTemplate');
    var input = myElement.querySelector('input');
    var label = myElement.querySelector('label');
    input.id = 'product-'+product.id;
    input.checked = product.mark;
    label.setAttribute('for', 'product-'+product.id);
    label.innerHTML = product.mark? '<del>'+product.name+'</del>' : product.name;
    myElement.firstElementChild.addEventListener('click', marked);
    return myElement;
}

function showList(data) {
    console.log("Ready to write data " + JSON.stringify(data));
    var myForm = getTemplate('#listShowFormTemplate');
    myForm.querySelector('h3').innerHTML = data.name;
    myForm.querySelector('button').setAttribute('onclick', 'editList('+data.id+')');
    data.products.forEach(function(product) {
        var myElement = createElement(product);
        console.log("Appending: "+myElement.firstElementChild.outerHTML);
        myForm.querySelector('form div').appendChild(myElement);
    });
    console.log("Appending child: " + myForm.firstElementChild.outerHTML);
    document.querySelector('#listArea').appendChild(myForm);
}

function editList(identifier) {
    console.log('Editing list: '+identifier);
}

function marked(event) {
    console.log("marked: "+event.target.checked);
    console.log("Label: "+this.querySelector('label').innerHTML);
    console.log("Id: "+event.target.id.split('-')[1]);
}