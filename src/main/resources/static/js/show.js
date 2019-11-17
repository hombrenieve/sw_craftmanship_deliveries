function showShoppingList(id) {
    fetch('shoppinglist/' + id)
        .then(response => response.json())
        .then(function (data) {
            emptyWindow();
            let listToShow = new ShowList(data);
            listToShow.show();
        })
        .catch(error => log.error("Retrieving shopping list", error));
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
        fetch("/shoppinglist/" + identifier, {
            method: 'DELETE'
        })
            .then(function (response) {
                if (response.ok) {
                    location.href = '/';
                }
            })
            .catch(error => console.error("Deleting list " + identifier, error));
    }
}