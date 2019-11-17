function showShoppingList(id) {
    //take data
    $.getJSON('shoppinglist/'+id, function (data) {
        emptyWindow();
        let listToShow = new ShowList(data);
        listToShow.show();
    });
}

class ShowList {
    constructor(data) {
        this.form = getTemplate('#listShowFormTemplate');
        $('h3', this.form).text(data.name);
        $('#deleteList', this.form).click(() => deleteList(data.id));
        $('#editList', this.form).click(() => editList(data));
        let objThis = this;
        data.products.forEach((product) => objThis.createElement(product));
    }

    createElement(product) {
        let myElement = getTemplate('#listElementShowFormTemplate');
        let input = myElement.querySelector('input');
        let label = myElement.querySelector('label');
        input.id = 'product-' + product.id;
        input.checked = product.mark;
        label.setAttribute('for', 'product-' + product.id);
        label.innerHTML = product.mark ? '<del>' + product.name + '</del>' : product.name;
        $('#listElementsArea', this.form).append(myElement);
    }

    show() {
        $('#listArea').append(this.form);
    }
}

function deleteList(identifier) {
    if(confirm("¿Seguro que quiere borrar la lista?")) {
        $.ajax({
            type: "DELETE",
            contentType: "application/json",
            url: "/shoppinglist/" + identifier,
            timeout: 600000,
            success: function () {
                location.href = '/';
            },
            error: function (e) {
                display(e);
            }
        });
    }
}