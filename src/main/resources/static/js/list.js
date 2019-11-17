$(function () {
    showShoppingLists();
});

function emptySideBar() {
    $("#shoppingLists").empty();
}

function showShoppingLists() {
    fetch('shoppinglist')
        .then(response => response.json())
        .then(function (data) {
            emptySideBar();
            $.each(data, function (key, value) {
                let sideBarItem = getTemplate('#sidebarShoppingList');
                $('a', sideBarItem).click(() => showShoppingList(value.id));
                $('span', sideBarItem).text(value.name);
                $("#shoppingLists").append(sideBarItem);
            });
        })
        .catch(error => console.error("Error getting shopping lists", error));
}
