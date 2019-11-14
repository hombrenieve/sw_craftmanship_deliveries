function showShoppingList(id) {
    console.log("Will show list with id: "+id);
    //take data
    $.getJSON('shoppinglist/'+id, function (data) {
        emptyWindow();
        var listToShow = new ShowList(data);
        listToShow.show();
    });
}

function ShowList(data) {
    console.log("Ready to write data " + JSON.stringify(data));
    this.form = getTemplate('#listShowFormTemplate');
    this.form.querySelector('h3').innerHTML = data.name;
    this.form.querySelector('#deleteList').addEventListener('click', function() { deleteList(data.id); });
    this.form.querySelector('#editList').addEventListener('click', function() { editList(data); });
    var objThis = this;
    data.products.forEach(function(product) {
        objThis.createElement(product);
    });
    console.log("Appending child: " + this.form.firstElementChild.outerHTML);
}

ShowList.prototype.createElement = function(product) {
    var myElement = getTemplate('#listElementShowFormTemplate');
    var input = myElement.querySelector('input');
    var label = myElement.querySelector('label');
    input.id = 'product-'+product.id;
    input.checked = product.mark;
    label.setAttribute('for', 'product-'+product.id);
    label.innerHTML = product.mark? '<del>'+product.name+'</del>' : product.name;
    console.log("Appending: "+myElement.firstElementChild.outerHTML);
    this.form.querySelector('form div').appendChild(myElement);
}

ShowList.prototype.show = function() {
    $('#listArea').append(this.form);
}

function deleteList(identifier) {
    console.log('Deleting list: '+identifier);

    if(confirm("¿Seguro que quiere borrar la lista?")) {
        $.ajax({
            type: "DELETE",
            contentType: "application/json",
            url: "/shoppinglist/" + identifier,
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