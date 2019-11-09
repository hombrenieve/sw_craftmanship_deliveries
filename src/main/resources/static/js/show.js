function showShoppingList(id) {
    console.log("Will show list with id: "+id);
    //take data
    $.getJSON('shoppinglist/'+id, function (data) {
        emptyWindow();
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
    return myElement;
}

function showList(data) {
    console.log("Ready to write data " + JSON.stringify(data));
    var myForm = getTemplate('#listShowFormTemplate');
    myForm.querySelector('h3').innerHTML = data.name;
    myForm.querySelector('#deleteList').addEventListener('click', function() { deleteList(data.id); });
    myForm.querySelector('#editList').addEventListener('click', function() { editList(data); });
    data.products.forEach(function(product) {
        var myElement = createElement(product);
        console.log("Appending: "+myElement.firstElementChild.outerHTML);
        myForm.querySelector('form div').appendChild(myElement);
    });
    console.log("Appending child: " + myForm.firstElementChild.outerHTML);
    $('#listArea').append(myForm);
}

function editList(data) {
    console.log('Editing list: '+JSON.stringify(data));
    newList(data);
}

function deleteList(identifier) {
    console.log('Deleting list: '+identifier);

    $.ajax({
        type: "DELETE",
        contentType: "application/json",
        url: "/shoppinglist/"+identifier,
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