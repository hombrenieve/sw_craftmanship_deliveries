$(function () {
    showShoppingLists();
});

function emptySideBar() {
    $("#shoppingLists").empty();
}

function showShoppingLists() {
    $.getJSON('shoppinglist', function(data) {
        emptySideBar();
        $.each(data, function(key, value) {
            let sideBarItem = getTemplate('#sidebarShoppingList');
            $('a', sideBarItem).click(() => showShoppingList(value.id));
            $('span', sideBarItem).text(value.name);
            $("#shoppingLists").append(sideBarItem);
        });
    });
}
